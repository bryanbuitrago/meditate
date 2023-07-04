'use client'

import { Box, Center} from '@chakra-ui/react';
import JourneyRectangleCard from '../components/JourneyRectCard';

function JourneyPage() {

    const cards = [
        {
          date: '2023-06-30',
          time: '10:30 AM',
          text: 'Lorem ipsum dolor sit amet.',
          duration: 3600, // 1 hour
        },
        {
          date: '2023-07-01',
          time: '2:45 PM',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          duration: 1800, // 30 minutes
        },
        {
          date: '2023-07-02',
          time: '8:15 AM',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          duration: 120, // 2 minutes
        },
      ];

      
    return (
        <div>

            <h1>Meditation Journey Page/History </h1>
            <Center h="100vh">
        <Box>
          <JourneyRectangleCard cards={cards} />
        </Box>
      </Center>

        </div>
    );
}

export default JourneyPage;



