import React, { useState } from 'react'
import { TextField, Button } from '@mui/material/'
import client from './apollo' // Adjust the import path as necessary

const LoginForm = ({ onSubmit, token, setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ email, password })
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{ m: 1 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{ m: 1 }}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={() => {
          sessionStorage.removeItem('token')
          setToken(null)
          client.resetStore()
        }}
      >
        Logout
      </Button>
    </form>
  )
}

export default LoginForm
