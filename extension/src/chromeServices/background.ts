import { browserLocalPersistence, inMemoryPersistence, onAuthStateChanged, setPersistence, Unsubscribe, User } from "firebase/auth"
import { firestore, auth } from "../firebase"
import { getDocs, collection, CollectionReference, addDoc, onSnapshot } from "firebase/firestore"
import { BackgroundMessage, BackgroundMessageType, BackgroundMessageUpdateUser, BackgroundMessageUpdateWords, ClientMessage, ClientMessageType, Word } from "../types"
import EventEmitter from "events"

/* eslint-disable import/first */
(global.window as any) = { }
require('mock-local-storage')


class FirebaseBackground extends EventEmitter {
    static findStorage(localStorage: { [key: string]: string }) {
        const [key, value] = Object.entries(localStorage).find(([key]) => key.startsWith("firebase:authUser:")) || ["", ""]
        return { key, value }
    }

    constructor() {
        super()

        this.on("localStorageChanged", this._subscribeFirebaseUser)
        this.on("authStateChanged", this._subscribeWords)

        this._subscribeLocalStorage()
        this.checkLocalStorage()
    }

    user: User | null = null
    wordsCollection: CollectionReference<Word> | null = null

    async getWords() {
        if(!this.wordsCollection) return []

        const wordsSnapshot = await getDocs(this.wordsCollection)
        return wordsSnapshot.docs.map(doc => doc.data())
    }

    async addWord(word: Word) {
        if(!this.wordsCollection) return

        await addDoc(this.wordsCollection, word) 
    }

    _removeWordsListener  = () => {}
    _subscribeWords() {
        if(!this.wordsCollection) return 

        this._removeWordsListener()

        this._removeWordsListener = onSnapshot(this.wordsCollection, (doc) => {
            const words = doc.docs.map(w => w.data())
            this.emit("wordsChanged", words)
        });
    }

    _removeAuthListener = () => {}
    _subscribeFirebaseUser = async (newLocalStorage: { [key: string]: string }) => {
        const { key, value } = FirebaseBackground.findStorage(newLocalStorage)
        //const { key: storedKey, value: storedValue } = FirebaseBackground.findStorage(global.window.localStorage)

        //if(storedKey === key && storedValue === value) return

        key && global.window.localStorage.setItem(key, value)

        this._removeAuthListener()

        this._removeAuthListener = onAuthStateChanged(auth, user => {
            this.user = user
            this.wordsCollection = user && collection(firestore, `user-data/${user.uid}/words`) as CollectionReference<Word>

            this.emit("authStateChanged", { user, key, value })
        })
    }

    async checkLocalStorage() {
        const { localStorage } = await chrome.storage.local.get("localStorage")
        this.emit("localStorageChanged", localStorage)
    }

    _subscribeLocalStorage() {
        chrome.storage.onChanged.addListener(({ localStorage: { newValue } }) => chrome.runtime.reload()/*this.emit("localStorageChanged", newValue)*/)
    }
}

const firebaseBackground = new FirebaseBackground()

firebaseBackground.on("authStateChanged", ({ user, key, value }) => {
    console.log("authStateChanged", { user, key, value })
    chrome.runtime.sendMessage<BackgroundMessageUpdateUser>({
        type: BackgroundMessageType.UpdateUser,
        user,
        key,
        value
    })
})

firebaseBackground.on("wordsChanged", words => {
    console.log("wordsChanged", words)
    chrome.tabs.query({ }, 
        tabs => tabs.forEach(tab => 
            chrome.tabs.sendMessage<BackgroundMessageUpdateWords>(tab?.id || 0,  {
                type: BackgroundMessageType.UpdateWords,
                words
            })
        )
    )
    /*chrome.runtime.sendMessage<BackgroundMessageUpdateWords>({
        type: BackgroundMessageType.UpdateWords,
        words
    })*/
})

chrome.runtime.onInstalled.addListener((details) => {
    console.log('[background.js] onInstalled', details);

    chrome.contextMenus.create({
        id: "wordi-add-word",
        title: "Add word: %s", 
        contexts:["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log('[background.js] contextMenus.onClicked', info, tab)

    //const user = firebaseBackground.user

    const { selectionText } = info

    if(!selectionText || !/\b[a-z]+\b/ig.exec(selectionText)) return

    await firebaseBackground.addWord({ 
        word: selectionText.toLowerCase(),
        score: 0,
        dateAdded: new Date().toDateString(),
        translations: ["перевод 1", "перевод 2"],
        source: {
            image: tab?.favIconUrl || "",
            title: tab?.title || "",
            subtitle: tab?.url || ""
        }
     })
})

chrome.runtime.onMessage.addListener((message: ClientMessage, sender, sendResponse) => {
    console.log('[background.js] onMessage', message, sender)

    sendResponse()

    ;(async () => {
        const user = firebaseBackground.user

        console.log("user", auth, user)

        let response: BackgroundMessage | undefined

        switch(message.type) {
            case ClientMessageType.GetUser:
                const { key, value } = FirebaseBackground.findStorage(global.window.localStorage)

                response = {
                    type: BackgroundMessageType.UpdateUser,
                    user: firebaseBackground.user || undefined,
                    key,
                    value
                } as BackgroundMessageUpdateUser

                break
            case ClientMessageType.GetWords:
                response = {
                    type: BackgroundMessageType.UpdateWords,
                    words: await firebaseBackground.getWords()
                } as BackgroundMessageUpdateWords

                break
            case ClientMessageType.UpdateFirebaseAuth:
                const { key: storedKey, value: storedValue } = FirebaseBackground.findStorage(global.window.localStorage)
                if(message.key === storedKey && message.value === storedValue) return

                await chrome.storage.local.set({localStorage: { [message.key]: message.value }})
                break
        }

        if(!response) return

        sender.tab && chrome.tabs.sendMessage(sender.tab?.id || 0, response)
        chrome.runtime.sendMessage(response)

        
    })()
});

chrome.runtime.onConnect.addListener((port) => {
    console.log('[background.js] onConnect', port)
});

chrome.runtime.onStartup.addListener(async () => {
    console.log('[background.js] onStartup')
});

chrome.runtime.onSuspend.addListener(() => {
    console.log('[background.js] onSuspend')
});
  

export {}