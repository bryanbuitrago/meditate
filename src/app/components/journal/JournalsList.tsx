'use client'

import { Box, LinkBox, LinkOverlay, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

function JournalsList({ journals }) {
  return (
    <Box as="ul">
      {journals.map(entry => (
        <LinkBox as="li" key={entry.id} mb={4} borderWidth="1px" borderRadius="md" padding={4} shadow="md">
          <Link href={`/journals/${entry.id}`} passHref>
            <LinkOverlay>
              <Heading as="h1" size="md">
                Title: {entry.title}
              </Heading>
              <Text mt={2}>
                Text: {entry.text}
              </Text>
            </LinkOverlay>
          </Link>
        </LinkBox>
      ))}
    </Box>
  );
}

export default JournalsList;
