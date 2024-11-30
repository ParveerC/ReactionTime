import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function SimpleReactionTestScreen() {
  const [message, setMessage] = useState('Press to start the reaction test');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const timeoutRef = useRef(null);

  const startTest = () => {
    setMessage('Wait for it...');
    setReactionTime(null);

    // Random delay between 2 to 5 seconds
    const delay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      setMessage('Tap now!');
      setStartTime(Date.now());
    }, delay);
  };

  const handlePress = () => {
    if (message === 'Tap now!') {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setMessage('Press to start the reaction test');
      clearTimeout(timeoutRef.current);
    } else if (message === 'Wait for it...') {
      setMessage('Too soon! Press to try again.');
      clearTimeout(timeoutRef.current);
    } else {
      startTest();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.message}>{message}</Text>
      {reactionTime !== null && (
        <Text style={styles.reactionTime}>Reaction Time: {reactionTime} ms</Text>
      )}
    </TouchableOpacity>
  );
}