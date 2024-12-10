import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Typography from '@mui/material/Typography'
import LoginForm from './LoginForm'
import LOGIN_MUTATION from './queries/loginMutation'
import { Button } from '@mui/material/'
import client from './apollo' // Adjust the import path as necessary

const LoginPage = ({ token, setToken }) => {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION)

  const handleLogin = ({ email, password }) => {
    sessionStorage.removeItem('token')

    login({
      variables: {
        email,
        password,
      },
    })
      .then((res) => {
        let token = res.data.signIn.token
        sessionStorage.setItem('token', token)
        setToken(token)
        client.resetStore()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
        Login
      </Typography>
      <LoginForm onSubmit={handleLogin} token={token} setToken={setToken} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default LoginPage
