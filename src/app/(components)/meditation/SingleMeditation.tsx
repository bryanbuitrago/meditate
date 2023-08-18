'use client'
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import formatDuration from "@/utils/timerUtils";

function SingleMeditation({ meditation }) {
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
                    time: {formatDuration(meditation?.time)}
                </Heading>
                <Text fontSize="md">
                    Started at: {meditation?.startDateTime.toISOString()}
                </Text>
            </Box>
        </Flex>
    );
}

export default SingleMeditation;
