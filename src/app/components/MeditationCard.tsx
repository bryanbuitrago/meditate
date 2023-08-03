'use client'

import { Box, Text, VStack } from '@chakra-ui/react';

type Card = {
  date: string;
  time: string;
  text: string;
  duration: number; // duration in seconds
}

type CardProps = {
  cards: Card[];
}

const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

const MeditationCard: React.FC<CardProps> = ({ cards }) => {
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
          <Text fontSize="xl" fontWeight="bold">{card.date}</Text>
          <Text fontSize="lg">{card.time}</Text>
          <Text>{card.text}</Text>
          <Text mt={2}>{formatDuration(card.duration)}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default MeditationCard;
