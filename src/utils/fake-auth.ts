interface IUser {
  id: number
  displayName: string
  email: string
}

export function signIn(email: string, password: string) {
  return new Promise<IUser>(resolve => {
    setTimeout(
      () =>
        resolve({ id: 9, displayName: 'John Doe', email: 'john@gmail.com' }),
      700
    )
  })
}
