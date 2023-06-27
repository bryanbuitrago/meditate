import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here with username and password
    console.log('Login form submitted');
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Box maxWidth="md" mx="auto" mt={8} p={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Log In
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
