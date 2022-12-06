/* eslint-disable linebreak-style */
import { useState } from 'react'
import stylesSignIn from './styles.module.scss'

/* eslint-disable linebreak-style */
export function SignIn() {
  const [input, setInput] = useState({})
  console.log(input)
  const logIn = async () => {
    const response = await fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
    return response.json()
  }
  const signInHandler = (e) => {
    e.preventDefault()
    logIn()
      .then((result) => alert(result.message))
  }

  return (
    <div>
      <form onSubmit={signInHandler} name="login" className={stylesSignIn.login}>
        <input onChange={(e) => setInput({ ...input, email: e.target.value })} type="email" required value={input.email} placeholder="email" />
        <input
          type="password"
          required
          placeholder="password"
          onChange={(e) => setInput({
            ...input,
            password: e.target.value,
          })}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}
