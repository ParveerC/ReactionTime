import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [message, setMessage] = useState('');
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
      setMessage('Select a test to start again');
      clearTimeout(timeoutRef.current);
    } else if (message === 'Wait for it...') {
      setMessage('Too soon! Press to try again.');
      clearTimeout(timeoutRef.current);
    }
  };

  const handleTestSelection = (testType) => {
    setSelectedTest(testType);
    setMessage('Press to start the reaction test');
    setReactionTime(null);
  };

  return (
    <View style={styles.container}>
      {selectedTest === null ? (
        <View>
          <Text style={styles.menuTitle}>Select a Reaction Test:</Text>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleTestSelection('Simple Reaction Test')}>
            <Text style={styles.menuButtonText}>Simple Reaction Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleTestSelection('Color Change Reaction Test')}>
            <Text style={styles.menuButtonText}>Color Change Reaction Test (Coming Soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleTestSelection('Sound Reaction Test')}>
            <Text style={styles.menuButtonText}>Sound Reaction Test (Coming Soon)</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
          <Text style={styles.message}>{message}</Text>
          {reactionTime !== null && (
            <Text style={styles.reactionTime}>Reaction Time: {reactionTime} ms</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  reactionTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
  },
});
