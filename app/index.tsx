import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

export default function Home() {
  const [sleepTime, setSleepTime] = useState("");
  const [fallAsleepTime, setFallAsleepTime] = useState("");
  const [results, setResults] = useState([]);

  const calculateSleepCycles = () => {
    if (!sleepTime || !fallAsleepTime) return;
    
    const [hours, minutes] = sleepTime.split(":").map(Number);
    const fallAsleepMinutes = parseInt(fallAsleepTime, 10) || 0;
    let sleepStart = new Date();
    sleepStart.setHours(hours, minutes + fallAsleepMinutes, 0);
    
    const cycleDuration = 90; // 90 minutos por ciclo
    const cycles = 4;
    let newResults = [];

    for (let i = 1; i <= cycles; i++) {
      let wakeUpTime = new Date(sleepStart.getTime() + cycleDuration * i * 60000);
      let formattedTime = wakeUpTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      newResults.push({ time: formattedTime, cycle: i });
    }
    
    setResults(newResults);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Que horas você vai dormir?</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a hora (ex: 23:30)"
        value={sleepTime}
        onChangeText={setSleepTime}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.title}>Você adormece em quantos minutos?</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o tempo (ex: 15 minutos)"
        value={fallAsleepTime}
        onChangeText={setFallAsleepTime}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <Pressable style={styles.button} onPress={calculateSleepCycles}>
        <Text style={styles.buttonText}>Calcular</Text>
      </Pressable>
      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Horários recomendados para acordar:</Text>
          {results.map((item, index) => (
            <Text key={index} style={styles.resultText}>
              {item.time} ({item.cycle} ciclo{item.cycle > 1 ? 's' : ''})
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: "#6200ea",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  resultsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#ddd",
  },
});
