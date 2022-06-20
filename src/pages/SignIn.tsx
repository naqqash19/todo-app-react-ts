import React from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import { useAuth } from '../context/auth-context'

import useForm from '../hooks/use-form'

function SignIn(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  const [values, handleChange] = useForm<{ email: string; password: string }>({
    email: '',
    password: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await auth.signIn(values.email, values.password)
      navigate(from, { replace: true })
    } catch (error) {
      if (error instanceof Error) alert(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete='off' noValidate>
        <label>
          Email:{' '}
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
        </label>{' '}
        <label>
          Password:{' '}
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          />
        </label>{' '}
        <button type='submit'>Sign In</button>
      </form>
    </>
  )
}

export default SignIn
