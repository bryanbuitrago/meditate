import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';

const Timer: React.FC = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer === 0 && isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current as NodeJS.Timeout);
    }
  }, [timer, isRunning]);

  useEffect(() => {
    if (!isRunning && elapsedTime > 0) {
      console.log('Elapsed time:', elapsedTime);
    }
  }, [elapsedTime, isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    let totalSeconds = 0;
    if (hours) {
      totalSeconds += parseInt(hours) * 3600;
    }
    if (minutes) {
      totalSeconds += parseInt(minutes) * 60;
    }
    if (seconds) {
      totalSeconds += parseInt(seconds);
    }
    if (totalSeconds > 0) {
      setIsRunning(true);
      setTimer(totalSeconds);
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current as NodeJS.Timeout);
    const elapsedSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0) - timer;
    setElapsedTime(elapsedSeconds);
  };

  const handleSubmit = () => {
    const submittedTime = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0) - timer;
    console.log('Submitted time:', submittedTime);
    // Here you can submit the `submittedTime` value to the API route
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box maxWidth="md" mx="auto" mt={8} p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        Timer Component
      </Heading>

      <Flex direction="column" alignItems="center" mt={8}>
        <FormControl id="hours" mb={4}>
          <FormLabel>Hours</FormLabel>
          <Input
            type="number"
            placeholder="Enter hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </FormControl>

        <FormControl id="minutes" mb={4}>
          <FormLabel>Minutes</FormLabel>
          <Input
            type="number"
            placeholder="Enter minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </FormControl>

        <FormControl id="seconds" mb={4}>
          <FormLabel>Seconds</FormLabel>
          <Input
            type="number"
            placeholder="Enter seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
        </FormControl>

        <Button colorScheme={isRunning ? 'red' : 'green'} onClick={handleStartStop} mb={4}>
          {isRunning ? 'Stop' : 'Start'}
        </Button>

        {isRunning && (
          <Box p={4} border="1px solid" borderColor="gray.300" borderRadius="md" textAlign="center">
            <Text fontSize="2xl">{formatTime(timer)}</Text>
          </Box>
        )}

        {elapsedTime > 0 && (
          <Box p={4} border="1px solid" borderColor="gray.300" borderRadius="md" textAlign="center">
            <Text fontSize="2xl">Elapsed Time: {formatTime(elapsedTime)}</Text>
          </Box>
        )}

        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          mt={4}
          isDisabled={isRunning || timer === 0}
        >
          Submit Time
        </Button>
      </Flex>
    </Box>
  );
};

export default Timer;


