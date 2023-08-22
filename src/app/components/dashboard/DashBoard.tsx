'use client'
import { Box, SimpleGrid } from "@chakra-ui/react";
import JournalLatest from '../journal/JournalLatest';
import MeditationLatest from '../meditation/MeditationLatest';

function DashBoard({ journal, meditation }: any) {
  console.log('[Meditation from DashBoard]= ', meditation);
  return (
    <Box p="4" boxShadow="md" borderRadius="md">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <JournalLatest journal={journal} />
        <MeditationLatest meditation={meditation} />
      </SimpleGrid>
    </Box>
  );
}

export default DashBoard;
