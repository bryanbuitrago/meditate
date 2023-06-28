import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

interface FormValues {
  title: string;
  text: string;
}

const JournalForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    text: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Perform form submission logic here with formValues
    console.log('Form submitted');
    console.log('Title:', formValues.title);
    console.log('Text:', formValues.text);
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
