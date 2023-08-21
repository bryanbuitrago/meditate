import { Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Spinner size="xl" color="blue.500" />
    </motion.div>
  );
};

export default LoadingSpinner;
