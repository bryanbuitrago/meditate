'use client'
import { Box, LinkBox, LinkOverlay, Heading } from "@chakra-ui/react";
import Link from "next/link";
// import formatDuration from "@/utils/timerUtils";
// import formatDate from "@/utils/dateTimeUtils";
import { _formatDate, _formatDuration } from "@/utils/dateTimeUtils";



function MeditationSessionList({ meditations }) {
    return (
      <Box as="ul">
        {meditations.map(meditation => (
          <LinkBox as="li" key={meditation.id} mb={4} borderWidth="1px" borderRadius="md" padding={4} shadow="md">
            <Link href={`/meditations/${meditation.id}`} passHref>
              <LinkOverlay>
                <Heading as="h3" size="md">
                  Meditated for: {_formatDuration(meditation.time)}
                </Heading>
                <Heading as="h5" size="sm" mt={2}>
                On this date: {_formatDate(meditation.createdAt)}
                  {/* On this date: {new Date(meditation.createdAt).toLocaleDateString()} */}
                </Heading>
              </LinkOverlay>
            </Link>
          </LinkBox>
        ))}
      </Box>
    );
  }

  export default MeditationSessionList