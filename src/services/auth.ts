import {
  UserCredential,
  Unsubscribe,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import { auth } from './firebase'

import { IUser } from '../types'

export function signUserIn(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password)
}
export function signUserOut(): Promise<void> {
  return signOut(auth)
}
export function authUserStateChanged(
  callback: (user: IUser | null) => void
): Unsubscribe {
  return onAuthStateChanged(auth, callback)
}
