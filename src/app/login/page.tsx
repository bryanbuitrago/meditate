// === SECOND VERSION ===
'use client'

import { FormEvent, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import LoginComponentCard from "../components/login/LoginComponent"

type InitialStateProps = {
    email: string,
    password: string
}

const initialState = {
    email: '',
    password: ''
}

export default function LoginPage() {

    const [state, setState] = useState(initialState)
    const router = useRouter()

    function handleChange(event: any) {
        setState({...state, [event.target.name]: event.target.value })
        console.log(event.target.value)
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault()

        signIn('credentials', {
            ...state,
            redirect: false,
        })
        .then((callback) => {

            if(callback?.ok) {
                router.refresh()
            }

            if(callback?.error) {
                throw new Error('Wrong Credentials')
            }
            router.push('/dashboard')
        })
    }

    return (
        <LoginComponentCard 
            onSubmit={onSubmit} 
            onChange={handleChange}
            email={state.email}
            password={state.password}
        />
        
        // === Version 1.0 ===
        // <form onSubmit={onSubmit}>
        //     <div>
        //         <Input placeholder="Email" name="email" id="email" type="email" onChange={handleChange} value={state.email} />
        //         <Input placeholder="password" name="password" id="password" type="password" onChange={handleChange} value={state.password} />
        //         <button type="submit">Submit</button>
        //     </div>

        //     <div>Dont have an account ?<Link href='/register'>Sign up</Link></div>
        // </form>
    )
}


// === FIRST VERSION ===
// 'use client'
// import LoginForm from '../components/LoginForm';
// import { useSession } from 'next-auth/react';
// import { redirect, useRouter } from 'next/navigation';
// import Router from 'next/router';

// function LoginPage() {

//     const { data: session, status } = useSession();
//     const router = useRouter();

//     if(session) {
//         // router.push('/dashboard')
//        return redirect('/dashboard')

//     }
//     return (
//         <div>
//             <h1>This is the login page</h1>
//             <LoginForm />
//         </div>
//     );
// }

// export default LoginPage;