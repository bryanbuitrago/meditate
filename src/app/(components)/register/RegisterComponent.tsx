import { Box, Flex, FormControl, FormLabel, Input, Button, Link, useColorModeValue, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

function RegisterComponentCard({onSubmit, onChange, name, email, password}) {
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
                        onChange={onChange} 
                        value={name} 
                    />
                </FormControl>

                <FormControl id="email" mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        placeholder="Email" 
                        name="email" 
                        type="email" 
                        onChange={onChange} 
                        value={email} 
                    />
                </FormControl>

                <FormControl id="password" mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input 
                        placeholder="Password" 
                        name="password" 
                        type="password" 
                        onChange={onChange} 
                        value={password} 
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