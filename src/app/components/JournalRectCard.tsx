import { Box, Text, VStack } from '@chakra-ui/react';

interface Card {
  title: string;
  text: string;
  date: string;
}

interface RectangleCardProps {
  cards: Card[];
}

const RectangleCard: React.FC<RectangleCardProps> = ({ cards }) => {
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
