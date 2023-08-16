// === Version 2.0 ===

import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  LinkOverlay,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const MotionLink = motion(Link);

const HomePageGreeting: React.FC = () => {
  const backgroundImg = '/background.jpg';

  const MotionLinkVariants = {
    hover: {
      y: -5,
    },
  };

  return (
    <Box
      h="100vh"
      backgroundImage={`url(${backgroundImg})`}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Flex
        direction="column"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="md"
        p={8}
        shadow="md"
        marginTop="-15px"  // Move the card upwards by 15px
      >
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Welcome To The Best Meditation App
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={8}>
          Thank you for using our platform. Login or register to continue.
        </Text>
        <Flex direction="row" alignItems="center">
          <NextLink href="/login" passHref>
            <MotionLink
              as={Button}
              variant="outline"
              whileHover="hover"
              variants={MotionLinkVariants}
              p={4}
              m={2} // Add margin for spacing
            >
              <LinkOverlay>Login</LinkOverlay>
            </MotionLink>
          </NextLink>
          <NextLink href="/register" passHref>
            <MotionLink
              as={Button}
              variant="outline"
              whileHover="hover"
              variants={MotionLinkVariants}
              p={4}
              m={2} // Add margin for spacing
            >
              <LinkOverlay>Register</LinkOverlay>
            </MotionLink>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomePageGreeting;


// === Version 1.0 ===
// import React from 'react';
// import {
//   Box,
//   Flex,
//   Heading,
//   Text,
//   Link,
//   LinkOverlay,
//   Image,
//   Button,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import NextLink from 'next/link';

// const MotionLink = motion(Link);

// const HomePageGreeting: React.FC = () => {
//   const backgroundImg = '/background.jpg';

//   const MotionLinkVariants = {
//     hover: {
//       y: -5,
//     },
//   };

//   return (
//     <Box
//       h="100vh"
//       backgroundImage={`url(${backgroundImg})`}
//       backgroundSize="cover"
//       backgroundPosition="center"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       px={4}
//     >
//       <Flex
//         direction="column"
//         alignItems="center"
//         bg={useColorModeValue('white', 'gray.800')}
//         borderRadius="md"
//         p={8}
//         shadow="md"
//       >
//         <Heading as="h1" size="xl" textAlign="center" mb={4}>
//           Welcome To The Best Meditation App
//         </Heading>
//         <Text fontSize="lg" textAlign="center" mb={8}>
//           Thank you for using our platform. Login or register to continue.
//         </Text>
//         <Flex direction="column" alignItems="center">
//           <NextLink href="/login" passHref>
//             <MotionLink
//               as={Button}
//               variant="outline"
//               whileHover="hover"
//               variants={MotionLinkVariants}
//               p={4}
//               m={2} // Add margin for spacing
//             >
//               <LinkOverlay>Login</LinkOverlay>
//             </MotionLink>
//           </NextLink>
//           <NextLink href="/register" passHref>
//             <MotionLink
//               as={Button}
//               variant="outline"
//               whileHover="hover"
//               variants={MotionLinkVariants}
//               p={4}
//               m={2} // Add margin for spacing
//             >
//               <LinkOverlay>Register</LinkOverlay>
//             </MotionLink>
//           </NextLink>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default HomePageGreeting;
