'use client'
import { Box, LinkBox, LinkOverlay, Heading } from "@chakra-ui/react";
import Link from "next/link";


function MeditationSessionList({ meditations }) {
    return (
      <Box as="ul">
        {meditations.map(meditation => (
          <LinkBox as="li" key={meditation.id} mb={4} borderWidth="1px" borderRadius="md" padding={4} shadow="md">
            <Link href={`/meditations/${meditation.id}`} passHref>
              <LinkOverlay>
                <Heading as="h3" size="md">
                  Meditated for: {meditation.time}
                </Heading>
                <Heading as="h5" size="sm" mt={2}>
                  On this date: {new Date(meditation.createdAt).toLocaleDateString()}
                </Heading>
              </LinkOverlay>
            </Link>
          </LinkBox>
        ))}
      </Box>
    );
  }

  export default MeditationSessionList