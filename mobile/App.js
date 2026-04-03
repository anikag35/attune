import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState([]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPause = () => {
    if (isRunning) {
      const elapsed = 25 * 60 - secondsLeft;
      setSessions(prev => [...prev, elapsed]);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setSecondsLeft(25 * 60);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attune</Text>
      <Text style={styles.timer}>
        {minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleStartPause}>
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>

      <View style={styles.sessionsContainer}>
        {sessions.map((session, index) => {
          const sessionMins = Math.floor(session / 60);
          const sessionSecs = session % 60;

          return (
            <Text key={index} style={styles.sessionText}>
              Session {index + 1}: {sessionMins} mins {sessionSecs} secs
            </Text>
          );
        })}
      </View>

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
    paddingHorizontal: 20,
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
    marginBottom: 15,
  },
  buttonText: {
    color: '#520000',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#d9d9d9',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 30,
  },
  resetButtonText: {
    color: '#520000',
    fontWeight: 'bold',
  },
  sessionsContainer: {
    alignItems: 'center',
  },
  sessionText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 8,
  },
});