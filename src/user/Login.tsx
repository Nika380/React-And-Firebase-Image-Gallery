import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { getRedirectResult, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from 'firebase/app';



const Login = () => {
    const provider = new GoogleAuthProvider();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            navigate('/');
        } catch (error: any) {
            console.log(error);
        }
    }

  return (
    <div className='login'>
        <form onSubmit={handleSubmit} className="loginForm">
            <p>Login</p>
            <TextField label="Email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="input"/>
            <TextField label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="input"/>
            <Stack direction="row" spacing={3}>
            <Button className='button' variant="outlined" type='submit'> Sign In </Button>
            <Button className='button' variant="outlined" onClick={() => {navigate('/register')}}>Register</Button>
            </Stack>
            <Button className='signWithGoogle'
            endIcon={<GoogleIcon />}
            onClick={signInWithGoogle}
            >Sign in With Google</Button>
        </form>
    </div>
  )
}

export default Login