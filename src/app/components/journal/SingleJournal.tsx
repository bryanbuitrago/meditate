'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { _formatDate } from '@/utils/dateTimeUtils';
import {
    Box,
    Button,
    Input,
    Textarea,
    Heading,
    Text,
    Flex,
    Alert,
    AlertIcon
  } from "@chakra-ui/react";

type Journal = {
    title: string
    text: string
    createdAt: string
    id: string
}

function SingleJournal({ title, text, createdAt, id }: Journal) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentText, setCurrentText] = useState(text);
    const [message, setMessage] = useState('') // For displaying success or error messages

    const router = useRouter()


    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSubmitClick = async (e) => {
        e.preventDefault()
        setIsEditing(false)

        const updatedJournal = {
            title: currentTitle,
            text: currentText
        }
        try {
           const response = await axios.put(`/api/journal/${id}`, updatedJournal) 
           setMessage('Journal updated successfully!')
           console.log('Response data :', response.data) 
            
        } catch (error: any) {
            console.error('Error updating the journal: ', error)
            setMessage('Failed to update the journal. Please try again!')
        }

    }

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`/api/journal/${id}`)
            setMessage('Journal deleted successfuly!')
            // redirect user
            router.refresh()
            router.push('/journals')
            
        } catch (error: any) {
            console.log('Error deleting the journal: ', error)
            setMessage('Failed to delete the journal. Please try again!')
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentText(e.target.value);
    }

    return (
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            borderWidth="1px"
            borderRadius="md"
            padding={20}
            shadow="xl"
            maxWidth="2500px"
          >
          <Heading as="h2" size="xl" textAlign="center" marginBottom="8"> {/* Added textAlign */}
              Journal
          </Heading>

            {message && (
              <Alert status="info" marginBottom="8">
                <AlertIcon />
                {message}
              </Alert>
            )}

            {isEditing ? (
              <>
                <Input
                  placeholder="Title"
                  value={currentTitle}
                  onChange={handleTitleChange}
                  size="lg" // Larger input
                  marginBottom="8"
                />
                <Textarea
                  placeholder="Text"
                  value={currentText}
                  onChange={handleTextChange}
                  size="lg" // Larger textarea
                  marginBottom="8"
                />
                <Button
                  colorScheme="blue"
                  onClick={handleSubmitClick}
                  size="lg" // Larger button
                  marginBottom="8"
                >
                  Submit
                </Button>
              </>
            ) : (
              <>
                <Heading as="h1" size="2xl" marginBottom="8">
                  Title: {currentTitle}
                </Heading>
                <Text fontSize="2xl" marginBottom="8">
                  Text: {currentText}
                </Text>
                  {/* Display Date and Time */}
                <Text fontSize="lg" color="gray.600" marginBottom="4">
                  Created: {_formatDate(createdAt)}
                </Text>
                <Button
                  colorScheme="teal"
                  onClick={handleEditClick}
                  size="lg" // Larger button
                  marginRight="4"
                >
                  Update
                </Button>
                <Button colorScheme="red" onClick={handleDeleteClick} size="lg">
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Flex>
      );
}

export default SingleJournal;
