import { IUser, AuthState, AuthActionType } from '../types'

type SignInAction = {
  type: AuthActionType.SignIn
  payload: IUser
}
type SignOutAction = {
  type: AuthActionType.SignOut
}

type AuthAction = SignInAction | SignOutAction

export default function authReducer(
  state: AuthState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionType.SignIn:
      return { ...state, user: action.payload }
    case AuthActionType.SignOut:
      return { ...state, user: null }
    default:
      return state
  }
}
