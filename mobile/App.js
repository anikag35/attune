import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  //intended duration of the current sesh in secs
  const [sessionDuration, setSessionDuration] = useState(25 * 60);
  //stores the current remaining time and decreases every sec while the timer is running
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  //boolean to keep track of when timer is running/paused
  const [isRunning, setIsRunning] = useState(false);
  //adds a session time every time user pauses timer
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
      const elapsed = sessionDuration - secondsLeft;
      setSessions(prev => [...prev, elapsed]);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setSecondsLeft(sessionDuration);
    setIsRunning(false);
  };

  const handleDurationChange = (durationInMinutes) => {
    if (isRunning) return;

    const newDurationInSeconds = durationInMinutes * 60;
    setSessionDuration(newDurationInSeconds);
    setSecondsLeft(newDurationInSeconds);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attune</Text>

      <Text style={styles.timer}>
        {minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </Text>

      <View style={styles.presetsContainer}>
        <TouchableOpacity
          style={[
            styles.presetButton,
            sessionDuration === 15 * 60 && styles.activePresetButton,
          ]}
          onPress={() => handleDurationChange(15)}
        >
          <Text
            style={[
              styles.presetButtonText,
              sessionDuration === 15 * 60 && styles.activePresetButtonText,
            ]}
          >
            15 min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.presetButton,
            sessionDuration === 25 * 60 && styles.activePresetButton,
          ]}
          onPress={() => handleDurationChange(25)}
        >
          <Text
            style={[
              styles.presetButtonText,
              sessionDuration === 25 * 60 && styles.activePresetButtonText,
            ]}
          >
            25 min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.presetButton,
            sessionDuration === 45 * 60 && styles.activePresetButton,
          ]}
          onPress={() => handleDurationChange(45)}
        >
          <Text
            style={[
              styles.presetButtonText,
              sessionDuration === 45 * 60 && styles.activePresetButtonText,
            ]}
          >
            45 min
          </Text>
        </TouchableOpacity>
      </View>

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
    marginBottom: 30,
  },
  presetsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 10,
  },
  presetButton: {
    backgroundColor: '#7a1a1a',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  presetButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activePresetButton: {
    backgroundColor: '#ffffff',
  },
  activePresetButtonText: {
    color: '#520000',
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