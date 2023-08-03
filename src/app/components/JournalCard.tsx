import { Box, Text, VStack } from '@chakra-ui/react';
import { type } from 'os';

type Card = {
  title: string;
  text: string;
  date: string;
}

type JournalCard = {
  cards: Card[];
}

const RectangleCard: React.FC<JournalCard> = ({ cards }) => {
  return (
    <VStack spacing={4} align="center">
      {cards.map((card, index) => (
        <Box
          key={index}
          w="300px"
          h="200px"
          borderWidth="1px"
          borderRadius="md"
          p={4}
          boxShadow="md"
        >
          <Text fontSize="xl" fontWeight="bold">{card.title}</Text>
          <Text>{card.text}</Text>
          <Text fontSize="sm" mt={2}>{card.date}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default RectangleCard;
