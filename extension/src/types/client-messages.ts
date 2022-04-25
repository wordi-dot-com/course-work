export enum ClientMessageType {
    GetWords = "GET_WORDS",
    GetUser = "GET_USER",
    UpdateFirebaseAuth = "UPDATE_FIREBASE_AUTH"
}

export interface ClientMessageGetWords {
    type: ClientMessageType.GetWords
}

export interface ClientMessageGetUser {
    type: ClientMessageType.GetUser
}

export interface ClientMessageUpdateFirebaseAuth {
    type: ClientMessageType.UpdateFirebaseAuth
    key: string
    value: string
}

export type ClientMessage = ClientMessageGetWords | ClientMessageGetUser | ClientMessageUpdateFirebaseAuth