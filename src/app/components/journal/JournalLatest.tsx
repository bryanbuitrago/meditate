import { Box, Heading, Text } from "@chakra-ui/react";
import { _formatDate } from "@/utils/dateTimeUtils";

function JournalLatest({ journal }: any) {
  console.log('[Journal from Components]= ', journal);
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
        Latest Journal Entry
      </Heading>
      <Heading as="h1" size="2xl" marginBottom="2">
        Title: {journal.title}
      </Heading>
      <Text fontSize="xl" marginBottom="4">
        Text: {journal.text}
      </Text>
      <Text fontSize="lg" color="gray.600" marginBottom="2">
        Created: {_formatDate(journal.createdAt)}
      </Text>
    </Box>
  );
}

export default JournalLatest;
