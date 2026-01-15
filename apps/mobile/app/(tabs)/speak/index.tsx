import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Button } from "../../../components";
import Theme from "../../../constants/theme";
import { SPEAKING_SCENARIOS } from "../../../data/speaking";

export default function SpeakHomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={Theme.colors.gradientSecondary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="mic" size={64} color={Theme.colors.textInverse} />
        <Text style={styles.headerTitle}>Start Speaking</Text>
        <Text style={styles.headerSubtitle}>
          Choose a scenario and practice speaking
        </Text>
      </LinearGradient>

      {/* Scenarios */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Speaking Scenarios</Text>
        {SPEAKING_SCENARIOS.map((scenario) => (
          <Card key={scenario.id} style={styles.scenarioCard}>
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>{scenario.title}</Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      scenario.difficulty === "Easy"
                        ? Theme.colors.success
                        : scenario.difficulty === "Medium"
                          ? Theme.colors.warning
                          : Theme.colors.error,
                  },
                ]}
              >
                <Text style={styles.badgeText}>{scenario.difficulty}</Text>
              </View>
            </View>
            <Text style={styles.description}>{scenario.description}</Text>
            <Text style={styles.prompt}>{scenario.prompt}</Text>
            <View style={styles.footer}>
              <Text style={styles.durationText}>
                <Ionicons
                  name="time"
                  size={14}
                  color={Theme.colors.textSecondary}
                />{" "}
                {Math.floor(scenario.suggestedDuration / 60)} min suggested
              </Text>
              <Button
                title="Start"
                size="small"
                fullWidth={false}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/speak/recording",
                    params: { scenarioId: scenario.id },
                  })
                }
                style={styles.startButton}
              />
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  header: { padding: Theme.spacing["3xl"], alignItems: "center" },
  headerTitle: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginTop: Theme.spacing.md,
  },
  headerSubtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textInverse,
    opacity: 0.9,
    marginTop: Theme.spacing.xs,
    textAlign: "center",
  },
  content: { padding: Theme.spacing.base },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  scenarioCard: { marginBottom: Theme.spacing.md },
  scenarioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Theme.spacing.sm,
  },
  scenarioTitle: {
    flex: 1,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  badge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.sm,
    marginLeft: Theme.spacing.sm,
  },
  badgeText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  description: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  prompt: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundTertiary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    fontStyle: "italic",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  durationText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  startButton: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    minWidth: 70,
  },
});
