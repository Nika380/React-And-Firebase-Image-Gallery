import { Button, Stack, TextField } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import {updateProfile } from 'firebase/auth'
import {v4} from 'uuid';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const provider = new GoogleAuthProvider();


    const schema = yup.object().shape({
        fullName: yup.string().required("*Full Name is Required"),
        Email: yup.string().email().required("*Email is Required"),
        password: yup.string().min(8).required(),
        confirmPassword: yup.string()
        .oneOf([yup.ref("password")])
        .required("*Passwords does not Match")
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data, e) => {

        e.preventDefault();
        const uid = v4();
        const { fullName, Email, password } = data;
        
        try {
            const  userCredential  = await createUserWithEmailAndPassword(auth, Email, password);
            const user = userCredential.user;
            await updateProfile(auth.currentUser, {
                displayName: fullName
            });
            await setDoc(doc(db, 'users', uid), {
                displayName: fullName,
                email: Email });
            console.log(data);
            navigate('/');
        } catch (error) {
            console.error(error);
            // Handle error - e.g. show error message to user
        }
    }

    

  return (
    <div className="register">

        <form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
            <p>Register</p>


            <TextField type='text' className="input" label="Full Name" {...register("fullName")} onChange={(e) => setFullName(e.target.value)}/>
            {errors.fullName && <span className='registerError'>{errors.fullName.message}</span>}
            <TextField label="Email" type='email' className="input" {...register("Email")} onChange={(e) => setEmail(e.target.value)}/>
            {errors.Email && <span className='registerError'>{errors.Email.message}</span>}
            <TextField label='Password' type='password' className="input" {...register("password")} onChange={(e) => setPassword(e.target.value)}/>
            {errors.password && <span className='registerError'>{errors.password.message}</span>}
            <TextField label='Confirm Password' type='password'  className="input" {...register("confirmPassword")}/>
            {errors.confirmPassword && <span className='registerError'>{errors.confirmPassword.message}</span>}
            <Stack direction="row" spacing={3}>
            <Button className='button' variant="outlined" onClick={() => {navigate('/login')}}> Sign In </Button>
            <Button className='button' variant="outlined" type='submit'>Register</Button>
            </Stack>
            <Button className='signWithGoogle'
            endIcon={<GoogleIcon />}
            onClick={signInWithGoogle}
            >Sign in With Google</Button>
            
        </form>

    </div>
  )
    
}

export default Register