'use client'

import { FormEvent, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Box, Flex, FormControl, FormLabel, Input, Button, Link, useColorModeValue, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

type InitialStateTypes = {
    name: string,
    email: string,
    password: string
}

const initialState: InitialStateTypes = {
    name: '',
    email: '',
    password: ''
}

function RegisterComponentCard() {
    
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
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Box 
                as="form" 
                width="400px" 
                bg={useColorModeValue('white', 'gray.800')} 
                p={8} 
                borderRadius="md" 
                shadow="md"
                onSubmit={onSubmit}
            >
                <Heading textAlign="center" mb={6}>Register</Heading>

                <FormControl id="name" mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input 
                        placeholder="Name" 
                        name="name" 
                        type="text" 
                        onChange={handleChange} 
                        value={state.name} 
                    />
                </FormControl>

                <FormControl id="email" mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        placeholder="Email" 
                        name="email" 
                        type="email" 
                        onChange={handleChange} 
                        value={state.email} 
                    />
                </FormControl>

                <FormControl id="password" mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input 
                        placeholder="Password" 
                        name="password" 
                        type="password" 
                        onChange={handleChange} 
                        value={state.password} 
                    />
                </FormControl>

                <Button width="full" type="submit" mb={4}>
                    Submit
                </Button>

                <Box textAlign="center">
                    Do you have an account ? 
                    <NextLink href="/login" passHref>
                        <Link ml={2} color={useColorModeValue('blue.600', 'blue.300')}>Sign in</Link>
                    </NextLink>
                </Box>
            </Box>
        </Flex>
    )
}

export default RegisterComponentCard;