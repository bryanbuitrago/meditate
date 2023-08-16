// === SECOND VERSION ===
'use client'

import Input from "../(components)/input/Input"
import { FormEvent, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import RegisterComponentCard from "../(components)/register/RegisterComponent"

type InitialStateProps = {
    name: string,
    email: string,
    password: string
}

const initialState = {
    name: '',
    email: '',
    password: ''
}

function RegisterPage() {
    const [state, setState] = useState(initialState)

    const router = useRouter()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState({...state, [e.target.name]: e.target.value })
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault()
        axios.post('/api/register', state)
        .then(() => {
            router.refresh()
        })
        .then(() => {
            setTimeout(() => {
                router.push('/login')
            }, 2500)
        })
        .catch((error: any) =>{
            console.log('Error during registration: ', error)
        })
    }

    return (

        <RegisterComponentCard 
            onSubmit={onSubmit} 
            onChange={handleChange} 
            name={state.name} 
            email={state.email} 
            password={state.password} 
        />

        // === Version 1.0 ===
        // <form onSubmit={onSubmit}>
        //     <div>
        //         <Input placeholder="Name" name="name" id="name" type="text" onChange={handleChange} value={state.name} />
        //         <Input placeholder="Email" name="email" id="email" type="email" onChange={handleChange} value={state.email} />
        //         <Input placeholder="password" name="password" id="password" type="password" onChange={handleChange} value={state.password} />
        //         <button type="submit">Submit</button>
        //     </div>

        //     <div>Do you have an account ? <Link href='/login'>Sign in</Link></div>
        // </form>
    )
}

export default RegisterPage

// === FIRST VERSION ===
// 'use client'

// import RegisterForm from '../components/RegisterForm';
// function RegisterPage() {
//     return (
//         <div>
//             <h1>
//                 This is the register Page
//             </h1>
//             <RegisterForm />
//         </div>
//     );
// }

// export default RegisterPage;