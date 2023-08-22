// === Version 2 ===
'use client'
import { SafeUser } from "@/app/types";
import { Box, Flex, Button, Link as ChakraLink, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import NextLink from "next/link";

type CurrentUser = {
    currentUser:SafeUser | null
}

function Navbar({ currentUser }: CurrentUser) {
    return (
        <Box as="header" bg="teal.500" p={4} color="white">
            <Flex align="center" justify="space-between">
                <Box>
                    <Text fontSize="lg">{currentUser?.name}</Text>
                </Box>

                <Box d="flex" alignItems="center">
                    <NextLink href="/journal" passHref>
                        <ChakraLink px={14}>Journal</ChakraLink>
                    </NextLink>
                    <NextLink href="/journals" passHref>
                        <ChakraLink px={14}>Journals</ChakraLink>
                    </NextLink>
                    <NextLink href="/timer" passHref>
                        <ChakraLink px={14}>Timer</ChakraLink>
                    </NextLink>
                    <NextLink href="/meditations" passHref>
                        <ChakraLink px={14}>Meditations</ChakraLink>
                    </NextLink>
                    <NextLink href="/dashboard" passHref>
                        <ChakraLink px={14}>Dashboard</ChakraLink>
                    </NextLink>
                    {
                        currentUser ? 
                            <Button ml={4} colorScheme="teal" variant="outline" onClick={() => signOut()}>Sign out</Button>
                        :
                            <NextLink href="/register" passHref>
                                <ChakraLink px={2}>Register</ChakraLink>
                            </NextLink>
                    }
                </Box>
            </Flex>
        </Box>
    );
}

export default Navbar;