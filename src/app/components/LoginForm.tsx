import { signIn, SignInResponse } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import GithubIcon from '../../../public/github-icon.svg'
import GoogleIcon from '../../../public/google-icon.svg'
import Image from 'next/image';
import { Box, Button, FormControl, FormLabel, Input, Stack, Center, Text, Divider } from '@chakra-ui/react';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      }) as SignInResponse;

      if (result.error) {
        console.error('Login failed:', result.error);
        // Handle login failure
      } else {
        console.log('Login successful');
        // Handle successful login
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login');
  };

  const handleGitHubLogin = () => {
    // Handle GitHub login
    console.log('GitHub login');
  };

  return (
    <Box maxWidth="md" mx="auto" mt={8} p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
            />
            {errors.email && <span>Email is required</span>}
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: true })}
            />
            {errors.password && <span>Password is required</span>}
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