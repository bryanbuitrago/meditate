import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

interface FormValues {
  title: string;
  text: string;
}

const JournalForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    text: ''
  });

  const { data: session, status } = useSession(); // Retrieve the session

  console.log('Session= ', session)
  console.log('Status', status)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Perform form submission logic here with formValues
    console.log('Form submitted');
    console.log('Title:', formValues.title);
    console.log('Text:', formValues.text);
    console.log('User Email:', session?.user?.email); // Access the user email from the session

    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formValues.title,
          text: formValues.text,
          email: session?.user?.email,
        }),
      });

      if (response.ok) {
        console.log('Journal entry created successfully!');
        // Reset the form values
        setFormValues({ title: '', text: '' });
      } else {
        console.error('Failed to create journal entry');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  };

  return (
    <Box maxWidth="md" mx="auto" mt={8} p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="Enter the title"
            value={formValues.title}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="text" mt={4}>
          <FormLabel>Text</FormLabel>
          <Textarea
            name="text"
            placeholder="Enter the text"
            value={formValues.text}
            onChange={handleChange}
            resize="vertical"
            h="10rem"
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default JournalForm;
