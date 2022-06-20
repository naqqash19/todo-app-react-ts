import { User } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'

export interface IUser extends User {}
export interface ITodo {
  todoId: string
  text: string
  completed: boolean
  userId: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type NavItem = {
  name: string
  path: string
}
export type AuthState = {
  user: IUser | null
}

export enum AuthActionType {
  SignIn = 'sign-in',
  SignOut = 'sign-out',
}
