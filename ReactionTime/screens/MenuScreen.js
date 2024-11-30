import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.menuTitle}>Select a Reaction Test:</Text>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('SimpleReactionTest')}>
        <Text style={styles.menuButtonText}>Simple Reaction Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ColorChangeReactionTest')}>
        <Text style={styles.menuButtonText}>Color Change Reaction Test (Coming Soon)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('SoundReactionTest')}>
        <Text style={styles.menuButtonText}>Sound Reaction Test (Coming Soon)</Text>
      </TouchableOpacity>
    </View>
  );
}