import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [water, setWater] = useState('');
  const [steps, setSteps] = useState('');
  const [sleep, setSleep] = useState('');
  const [logs, setLogs] = useState([]);

  // 🔁 Load stored logs on app start
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const stored = await AsyncStorage.getItem('logs');
        if (stored) {
          setLogs(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load logs', e);
      }
    };
    loadLogs();
  }, []);

  // 💾 Save logs whenever logs state changes
  useEffect(() => {
    const saveLogs = async () => {
      try {
        await AsyncStorage.setItem('logs', JSON.stringify(logs));
      } catch (e) {
        console.error('Failed to save logs', e);
      }
    };
    saveLogs();
  }, [logs]);

  const handleLog = () => {
    if (!water || !steps || !sleep) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const entry = {
      water: parseInt(water) || 0,
      steps: parseInt(steps) || 0,
      sleep: parseFloat(sleep) || 0,
      time: new Date().toLocaleString(),
    };

    setLogs([entry, ...logs]);
    setWater('');
    setSteps('');
    setSleep('');
  };

  const deleteLog = (indexToRemove) => {
    const updatedLogs = logs.filter((_, i) => i !== indexToRemove);
    setLogs(updatedLogs);
  };

  const chartData = {
    labels: logs.slice(0, 7).map((_, i) => `#${logs.length - i}`),
    datasets: [
      {
        data: logs.slice(0, 7).map((l) => l.steps),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 12,
    },
  };

  const getSummary = () => {
    const today = new Date().toDateString();
    const todayLogs = logs.filter(
      (log) => new Date(log.time).toDateString() === today
    );
    const totalWater = todayLogs.reduce((sum, l) => sum + l.water, 0);
    const totalSteps = todayLogs.reduce((sum, l) => sum + l.steps, 0);
    const totalSleep = todayLogs.reduce((sum, l) => sum + l.sleep, 0);
    return { totalWater, totalSteps, totalSleep };
  };

  const { totalWater, totalSteps, totalSleep } = getSummary();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>🌿 Health Tracker</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>💧 Water: {totalWater}ml</Text>
          <Text style={styles.summaryText}>👣 Steps: {totalSteps}</Text>
          <Text style={styles.summaryText}>😴 Sleep: {totalSleep.toFixed(1)} hrs</Text>
        </View>

        <Text style={styles.subHeader}>➕ Add Daily Log</Text>

        <TextInput
          placeholder="Water Intake (ml)"
          keyboardType="numeric"
          style={styles.input}
          value={water}
          onChangeText={setWater}
        />
        <TextInput
          placeholder="Steps"
          keyboardType="numeric"
          style={styles.input}
          value={steps}
          onChangeText={setSteps}
        />
        <TextInput
          placeholder="Sleep (hours)"
          keyboardType="numeric"
          style={styles.input}
          value={sleep}
          onChangeText={setSleep}
        />

        <View style={styles.buttonContainer}>
          <Button title="Log Entry" onPress={handleLog} color="#6c63ff" />
        </View>

        {logs.length >= 3 && (
          <>
            <Text style={styles.subHeader}>📊 Step Trends</Text>
            <BarChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={{ marginVertical: 10, borderRadius: 16 }}
            />
          </>
        )}

        <Text style={styles.subHeader}>📋 Your Logs</Text>
        {logs.map((entry, index) => (
          <View key={index} style={styles.log}>
            <Text style={styles.timeText}>🕒 {entry.time}</Text>
            <Text>💧 Water: {entry.water}ml</Text>
            <Text>👣 Steps: {entry.steps}</Text>
            <Text>😴 Sleep: {entry.sleep} hrs</Text>
            <TouchableOpacity onPress={() => deleteLog(index)}>
              <Text style={styles.delete}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4fa' },
  scroll: { padding: 20 },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#4b3f72',
  },
  summaryBox: {
    backgroundColor: '#d1c4e9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  log: {
    backgroundColor: '#e6ecff',
    padding: 14,
    marginVertical: 8,
    borderRadius: 10,
  },
  timeText: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#444',
  },
  delete: {
    marginTop: 6,
    color: '#b00020',
    fontWeight: 'bold',
  },
});

// 👇 Hide default "index" header from top nav bar
export const options = {
  headerShown: false,
};
