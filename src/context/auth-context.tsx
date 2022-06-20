import React, { createContext, useContext, useReducer, useEffect } from 'react'

import * as AuthService from '../services/auth'

import authReducer from '../reducers/auth-reducer'

import { IUser, AuthState, AuthActionType } from '../types'

type AuthContext = {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}
type AuthDataContext = {
  user: IUser | null
}

const AuthContext = createContext<AuthContext>(null!)
const AuthDataContext = createContext<AuthDataContext>(null!)

export function useAuth() {
  return useContext(AuthContext)
}
export function useAuthData() {
  return useContext(AuthDataContext)
}

const initialState: AuthState = {
  user: null,
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [{ user }, dispatch] = useReducer(authReducer, initialState)

  const signIn = async (email: string, password: string) => {
    await AuthService.signUserIn(email, password)
  }
  const signOut = async () => {
    await AuthService.signUserOut()
    dispatch({ type: AuthActionType.SignOut })
  }

  useEffect(() => {
    const unsubscribe = AuthService.authUserStateChanged(user => {
      if (user === null) return
      dispatch({ type: AuthActionType.SignIn, payload: user })
    })

    return () => unsubscribe()
  }, [])

  const authContextValue = { signIn, signOut }
  const authDataContextValue = { user }

  return (
    <AuthDataContext.Provider value={authDataContextValue}>
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    </AuthDataContext.Provider>
  )
}
