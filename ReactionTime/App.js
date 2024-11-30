import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [boxColor, setBoxColor] = useState('#fff');
  const timeoutRef = useRef(null);

  const startTest = () => {
    setMessage('Wait for it...');
    setReactionTime(null);
    setBoxColor('red');

    // Random delay between 2 to 5 seconds
    const delay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      setMessage('Tap now!');
      setStartTime(Date.now());
      setBoxColor('green');
    }, delay);
  };

  const handlePress = () => {
    if (message === 'Tap now!') {
      const endTime = Date.now();
      const currentReactionTime = endTime - startTime;
      setReactionTime(currentReactionTime);
      setReactionTimes((prevTimes) => [...prevTimes, currentReactionTime]);
      setMessage('Press to start the reaction test again');
      setBoxColor('#fff');
      clearTimeout(timeoutRef.current);
    } else if (message === 'Wait for it...') {
      setMessage('Too soon! Press to try again.');
      setBoxColor('#fff');
      clearTimeout(timeoutRef.current);
    } else {
      startTest();
    }
  };

  const handleTestSelection = (testType) => {
    setSelectedTest(testType);
    setMessage('Press to start the reaction test');
    setReactionTime(null);
    setReactionTimes([]);
    setBoxColor('#fff');
  };

  const calculateAverage = (times) => {
    if (times.length === 0) return 0;
    const sum = times.reduce((a, b) => a + b, 0);
    return (sum / times.length).toFixed(2);
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
        <View style={styles.container}>
          <TouchableOpacity style={styles.mainMenuButton} onPress={() => setSelectedTest(null)}>
            <Text style={styles.mainMenuButtonText}>Main Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.testBox, { backgroundColor: boxColor }]} onPress={handlePress}>
            <Text style={styles.message}>{message}</Text>
            {reactionTime !== null && (
              <Text style={styles.reactionTime}>Reaction Time: {reactionTime} ms</Text>
            )}
            {reactionTimes.length > 0 && reactionTimes.length % 5 === 0 && (
              <Text style={styles.averageTime}>
                Average Reaction Time: {calculateAverage(reactionTimes)} ms
              </Text>
            )}
          </TouchableOpacity>
        </View>
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
  mainMenuButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 50,
    
  },
  mainMenuButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  testBox: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
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
  averageTime: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 20,
  },
});
