import React, { useState, ChangeEvent, FormEvent } from 'react';
import GithubIcon from '../../../public/github-icon.svg'
import GoogleIcon from '../../../public/google-icon.svg'
import Image from 'next/image';
import { Box, Button, FormControl, FormLabel, Input, Stack, Center, Text, Divider } from '@chakra-ui/react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Perform login logic here with username and password
    console.log('Login form submitted');
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login');
  };

  const handleGitHubLogin = () => {
    // Handle GitHub login
    console.log('GitHub login');
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
              onChange={handleUsernameChange}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Log In
          </Button>

          <Center>
            <Text fontSize="sm">Or sign in with</Text>
          </Center>

          <Divider />

          <Center>
            <Button
              leftIcon={<Image src={GoogleIcon} alt="Google Logo" />}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>
          </Center>

          <Center>
            <Button
              leftIcon={<Image src={GithubIcon} alt="GitHub Logo" />}
              onClick={handleGitHubLogin}
            >
              Sign in with GitHub
            </Button>
          </Center>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
