import { Box, Heading, Text } from "@chakra-ui/react";
import { _formatDuration, _formatDate } from "@/utils/dateTimeUtils";

function MeditationLatest({ meditation }: any) {
  console.log('[Meditation from Components]= ', meditation);
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      marginBottom="4"
      boxShadow="base"
      textAlign="center"
    >
      <Heading as="h2" size="lg" marginBottom="4">
        Last Meditation Session
      </Heading>
      <Heading as="h1" size="lg" my={4}>
        Time: {_formatDuration(meditation.time)}
      </Heading>
      <Text fontSize="md">
        Started at: {_formatDate(meditation.startDateTime)}
      </Text>
      <Text fontSize="lg" color="gray.600" marginBottom="4">
        Created: {_formatDate(meditation.createdAt)}
      </Text>
    </Box>
  );
}

export default MeditationLatest;
