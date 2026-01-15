import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "../../../constants/theme";
import { SPEAKING_SCENARIOS } from "../../../data/speaking";

export default function SpeakingRecordingScreen() {
  const router = useRouter();
  const { scenarioId } = useLocalSearchParams<{ scenarioId: string }>();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  const scenario = SPEAKING_SCENARIOS.find((s) => s.id === scenarioId);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      // Navigate to feedback screen
      router.push("/(tabs)/speak/feedback");
    }
  };

  return (
    <LinearGradient
      colors={
        isRecording
          ? Theme.colors.gradientSecondary
          : Theme.colors.gradientPrimary
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.scenarioTitle}>{scenario?.title}</Text>
        <Text style={styles.prompt}>{scenario?.prompt}</Text>

        {/* Recording Indicator */}
        <View style={styles.recordingContainer}>
          <View style={[styles.micContainer, isRecording && styles.recording]}>
            <Ionicons name="mic" size={80} color={Theme.colors.textInverse} />
          </View>
          {isRecording && (
            <View style={styles.pulseContainer}>
              <View style={styles.pulse} />
              <View style={[styles.pulse, styles.pulse2]} />
            </View>
          )}
        </View>

        {/* Timer */}
        <Text style={styles.timer}>{formatTime(duration)}</Text>
        <Text style={styles.status}>
          {isRecording ? "Recording..." : "Tap to start recording"}
        </Text>

        {/* Record Button */}
        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording && styles.recordButtonActive,
          ]}
          onPress={handleRecording}
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={32}
            color={Theme.colors.textInverse}
          />
        </TouchableOpacity>

        {isRecording && (
          <Text style={styles.hint}>Tap the button again to stop</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: Theme.spacing.base,
    justifyContent: "center",
    alignItems: "center",
  },
  scenarioTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    textAlign: "center",
    marginBottom: Theme.spacing.sm,
  },
  prompt: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textInverse,
    opacity: 0.9,
    textAlign: "center",
    marginBottom: Theme.spacing["4xl"],
  },
  recordingContainer: {
    position: "relative",
    marginBottom: Theme.spacing["3xl"],
  },
  micContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  recording: { backgroundColor: Theme.colors.error },
  pulseContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  pulse: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    opacity: 0,
  },
  pulse2: { animationDelay: "1s" },
  timer: {
    fontSize: Theme.typography.fontSize["3xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginBottom: Theme.spacing.sm,
  },
  status: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textInverse,
    marginBottom: Theme.spacing["3xl"],
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.colors.error,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.lg,
  },
  recordButtonActive: { backgroundColor: Theme.colors.textInverse },
  hint: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textInverse,
    opacity: 0.8,
    marginTop: Theme.spacing.lg,
  },
});
