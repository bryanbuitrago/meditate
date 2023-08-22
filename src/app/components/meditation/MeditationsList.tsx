'use client'
import { Box, LinkBox, LinkOverlay, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { _formatDate, _formatDuration } from "@/utils/dateTimeUtils";

type Meditation = {
  id: number
  time: number
  startDateTime: string
  createdAt: string
}

type MeditationsList = {
  meditations: Meditation[]
}

function MeditationsList( { meditations }: MeditationsList ) {
    return (
      <Box as="ul">
        {meditations.map(meditation => (
          <LinkBox as="li" key={meditation.id} mb={4} borderWidth="1px" borderRadius="md" padding={4} shadow="md">
            <Link href={`/meditations/${meditation.id}`} passHref>
              <LinkOverlay>
              <Text fontSize="lg" color="gray.600" marginBottom="4">
                  Created: {_formatDate(meditation.createdAt)}
                </Text>
                <Heading as="h3" size="md">
                  Meditated for: {_formatDuration(meditation.time)}
                </Heading>
                <Heading as="h5" size="sm" mt={2}>
                On this date & Time: {_formatDate(meditation.startDateTime)}
                </Heading>

              </LinkOverlay>
            </Link>
          </LinkBox>
        ))}
      </Box>
    );
  }

  export default MeditationsList