import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  useEffect(() => {
  if (!isRunning) return;
  
  const interval = setInterval(() => {
    setSecondsLeft(prev => {
      if (prev <= 0) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attune</Text> 
      <Text style={styles.timer}>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setIsRunning(!isRunning)}><Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#ffffff',
  marginBottom: 40,
},
timer: {
  fontSize: 72,
  fontWeight: '200',
  color: '#ffffff',
  marginBottom: 60,
},
button: {
  backgroundColor: '#ffffff',
  paddingHorizontal: 50,
  paddingVertical: 15,
  borderRadius: 30,
},

buttonText: {
  color: '#520000',
  fontWeight: 'bold',
}
});
