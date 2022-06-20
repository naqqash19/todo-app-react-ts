import React, { useState } from 'react'

export default function useForm<T>(
  initialValues: T | (() => T)
): [
  T,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  (valuesToSet?: typeof initialValues) => void
] {
  const [values, setValues] = useState<T>(initialValues)

  return [
    values,
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setValues({ ...values, [event.target.name]: event.target.value }),
    (valuesToSet?: typeof initialValues) =>
      setValues(valuesToSet ? valuesToSet : initialValues),
  ]
}
