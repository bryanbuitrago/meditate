'use client'

import { Box, Center} from '@chakra-ui/react';
import JournalRectangleCard from '../components/JournalRectCard';

const cards = [
  {
    title: 'Card 1',
    text: 'Lorem ipsum dolor sit amet.',
    date: '2023-06-30',
  },
  {
    title: 'Card 2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2023-07-01',
  },
  {
    title: 'Card 3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    date: '2023-07-02',
  },
];

const ExamplePage: React.FC = () => {
  return (
      <Center h="100vh">
        <Box>
          <JournalRectangleCard cards={cards} />
        </Box>
      </Center>
  );
};

export default ExamplePage;