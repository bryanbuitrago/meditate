'use client'
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import {_formatDuration, _formatDate } from "@/utils/dateTimeUtils";

type Meditation = {
    time: number
    startDateTime: string
    createdAt: string
}

function SingleMeditation({ time, startDateTime, createdAt }: Meditation) {
    return (
        <Flex 
            width="100vw" 
            height="100vh" 
            alignItems="center" 
            justifyContent="center"
        >
            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="xl"
                bg="white"
            >
                <Text fontSize="xl" fontWeight="bold">
                    Single Meditation Page
                </Text>
                <Heading as="h1" size="lg" my={4}>
                    time: {_formatDuration(time)}
                </Heading>
                <Text fontSize="md">
                    Started at: {_formatDate(startDateTime)}
                </Text>
                <Text fontSize="lg" color="gray.600" marginBottom="4">
                  Created: {_formatDate(createdAt)}
                </Text>
            </Box>
        </Flex>
    );
}

export default SingleMeditation;
