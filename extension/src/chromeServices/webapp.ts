import { ClientMessageType, ClientMessageUpdateFirebaseAuth } from "../types"

function updateFirebaseAuth() {
    const [key, value] = Object.entries(localStorage).find(([key]) => key.startsWith("firebase:authUser:")) || ["", ""]
    

    chrome.runtime.sendMessage<ClientMessageUpdateFirebaseAuth>({ type: ClientMessageType.UpdateFirebaseAuth, key, value })
}

if(window.location.host === "localhost:3000")  {
    console.log("localStorage 1", localStorage)

    // TODO: wait for updates
    //window.addEventListener("storage", event => console.log("localStorage 2", event, localStorage));

    updateFirebaseAuth()
}

export {}