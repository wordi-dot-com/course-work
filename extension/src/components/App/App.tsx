import {useEffect, useMemo, useState} from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { BackgroundMessage, BackgroundMessageType, ClientMessageGetUser, ClientMessageType, Word } from '../../types';
import {collection, CollectionReference} from 'firebase/firestore';
import {firestore, auth, } from '../../firebase'
import {useCollection} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import DayCard from './components/DayCard';
import groupBy from '../../util/groupBy';

const wordiHost = "localhost:3000"

export default function App() {
  //const [checkedSite, setCheckedSite] = useState(false)
  //const [tab, setTab] = useState<chrome.tabs.Tab>()

  const [user] = useAuthState(auth)
  const wordsCollectionRef = useMemo(() => collection(firestore, `user-data/${user?.uid}/words`) as CollectionReference<Word>, [user]);
  const [snapshot, loading, err] = useCollection(wordsCollectionRef)

  useEffect(() => {
    console.log('Now user = ', user)
  }, [user])

  useEffect(() => {
    console.log('Now words len = ', snapshot?.docs.length)
  }, [snapshot])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: BackgroundMessage, sender, sendResponse) => {
      sendResponse()
  
        console.log("[popup] onMessage", message, sender)
        switch(message.type) {
          case BackgroundMessageType.UpdateUser:
            localStorage.clear()
            message.key && localStorage.setItem(message.key, message.value)
            break
        }
    })

    chrome.runtime.sendMessage<ClientMessageGetUser>({ type: ClientMessageType.GetUser })
  }, [])

  const groupedWords = useMemo(() => {
    return groupBy(
        snapshot?.docs.map(doc => doc.data()) || [],
            x => x.dateAdded
        )
}, [snapshot])

  return (
    <Container sx={{ minHeight: 400, minWidth: 600 }}>
      {user ? (<Box>
        {groupedWords.map((group) => (
                <DayCard date={group.key} words={group.elements}/>
            ))}
      </Box>) :
      ( <Stack justifyContent="space-between" alignItems="center" height="100vh">
        <Box></Box> 
        <Box>
          <Button variant="contained" href={`http://${wordiHost}/`}>Login</Button>
        </Box>
        <Box></Box>
      </Stack>)}
    </Container>
  );
}