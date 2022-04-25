import { User } from "firebase/auth"
import { Word } from "./word"

export enum BackgroundMessageType {
    UpdateWords = "UPDATE_WORDS",
    UpdateUser = "UPDATE_USER"
}

export interface BackgroundMessageUpdateWords {
    type: BackgroundMessageType.UpdateWords
    words?: Word[]
}

export interface BackgroundMessageUpdateUser {
    type: BackgroundMessageType.UpdateUser
    user?: User
    key: string
    value: string
}

export type BackgroundMessage = BackgroundMessageUpdateWords | BackgroundMessageUpdateUser

