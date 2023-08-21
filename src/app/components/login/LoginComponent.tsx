'use client'

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Box, Flex, FormControl, FormLabel, Input, Button, Link, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';


type InitialStateProps = {
    email: string
    password: string
}

const initialState: InitialStateProps = {
    email: '',
    password: ''
}

function LoginComponentCard() {
    
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
                 <Heading textAlign="center" mb={6}>Login</Heading>

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

                <Text textAlign="center">
                    Don&apos;t have an account ?
                    <NextLink href="/register" passHref>
                        <Link ml={2} color={useColorModeValue('blue.600', 'blue.300')}>Sign up</Link>
                    </NextLink>
                </Text>
            </Box>
        </Flex>
    )
}

export default LoginComponentCard;