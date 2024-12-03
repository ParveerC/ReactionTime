import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [targetColor, setTargetColor] = useState(null);
  const timeoutRef = useRef(null);

  const startTest = () => {
    setMessage('Wait for it...');
    setReactionTime(null);

    // Random delay between 2 to 5 seconds
    const delay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      setMessage('Tap now!');
      setStartTime(Date.now());
      setTargetColor('green');
    }, delay);
  };

  const handleSimplePress = () => {
    if (message === 'Tap now!') {
      const endTime = Date.now();
      const currentReactionTime = endTime - startTime;
      setReactionTime(currentReactionTime);
      setReactionTimes((prevTimes) => [...prevTimes, currentReactionTime]);
      setMessage('Press to start the reaction test again');
      setTargetColor(null);
      clearTimeout(timeoutRef.current);
    } else if (message === 'Wait for it...') {
      setMessage('Too soon! Press to try again.');
      setTargetColor(null);
      clearTimeout(timeoutRef.current);
    } else {
      startTest();
    }
  };

  const startColorTest = () => {
    setMessage('Wait for the correct color to appear...');
    setReactionTime(null);
    setTargetColor(null);

    // Random delay between 2 to 5 seconds
    const delay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      const colors = ['red', 'blue', 'green', 'yellow'];
      const correctColor = colors[Math.floor(Math.random() * colors.length)];
      setMessage(`Tap the ${correctColor} box!`);
      setTargetColor(correctColor);
      setStartTime(Date.now());
    }, delay);
  };

  const handleColorPress = (color) => {
    if (message.includes('Tap the') && color === targetColor) {
      const endTime = Date.now();
      const currentReactionTime = endTime - startTime;
      setReactionTime(currentReactionTime);
      setReactionTimes((prevTimes) => [...prevTimes, currentReactionTime]);
      setMessage('Press to start the reaction test again');
      setTargetColor(null);
      clearTimeout(timeoutRef.current);
    } else if (message === 'Wait for the correct color to appear...') {
      setMessage('Too soon! Press to try again.');
      setTargetColor(null);
      clearTimeout(timeoutRef.current);
    } else {
      startColorTest();
    }
  };

  const handleTestSelection = (testType) => {
    setSelectedTest(testType);
    setMessage('Press to start the reaction test');
    setReactionTime(null);
    setReactionTimes([]);
    setTargetColor(null);
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
            <Text style={styles.menuButtonText}>Color Change Reaction Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleTestSelection('Sound Reaction Test')}>
            <Text style={styles.menuButtonText}>Sound Reaction Test (Coming Soon)</Text>
          </TouchableOpacity>
        </View>
      ) : selectedTest === 'Color Change Reaction Test' ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.mainMenuButton} onPress={() => setSelectedTest(null)}>
            <Text style={styles.mainMenuButtonText}>Main Menu</Text>
          </TouchableOpacity>
          
          <View style={styles.boxContainer}>
            {['red', 'blue', 'green', 'yellow'].map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorBox, { backgroundColor: color }]}
                onPress={() => handleColorPress(color)}
              />
            ))}
          </View>
          {reactionTime !== null && (
            <Text style={styles.reactionTime}>Reaction Time: {reactionTime} ms</Text>
          )}
          {reactionTimes.length > 0 && reactionTimes.length % 5 === 0 && (
            <Text style={styles.averageTime}>
              Average Reaction Time: {calculateAverage(reactionTimes)} ms
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.mainMenuButton} onPress={() => setSelectedTest(null)}>
            <Text style={styles.mainMenuButtonText}>Main Menu</Text>
          </TouchableOpacity>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={[styles.testBox, { backgroundColor: targetColor || '#e0474c' }]} onPress={handleSimplePress}>
            <Text style={styles.message}>{message}</Text>
          </TouchableOpacity>
          {reactionTime !== null && (
            <Text style={styles.reactionTime}>Reaction Time: {reactionTime} ms</Text>
          )}
          {reactionTimes.length > 0 && reactionTimes.length % 5 === 0 && (
            <Text style={styles.averageTime}>
              Average Reaction Time: {calculateAverage(reactionTimes)} ms
            </Text>
          )}
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
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  colorBox: {
    width: 150,
    height: 150,
    margin: 5,
    borderWidth: 3,
    borderColor: '#000',
  },
  testBox: {
    width: 600,
    height: 600,
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
