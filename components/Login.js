import React from 'react'
import '../css/Login.css'
import login__bkg from '../images/login__bkg.png'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'

function Login() {
  const signIn = (e) => {
    auth.signInWithPopup(provider)
    .catch(error => alert(error))
  }
  return (
    <div className='login'>
      <div className="login__container">
        <img src={login__bkg} alt=""/>
        <div className="login__text">
          <h1>Sign In To Whats Happennin</h1>
        </div>
        <Button className='google' onClick={signIn}>
          Sign In With Google
        </Button>
        <h1 className='or'>Or</h1>
        <div className="demo">
        <Button >
          Demo
        </Button>
        </div>
      </div>
    </div>
  )
}


export default Login
