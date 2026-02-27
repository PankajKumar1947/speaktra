import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";
import { useDailyChallengeSentences } from "@repo/query";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function SentencePracticeScreen() {
  const dailyChallengeId = useLocalSearchParams<{
    dailyChallengeId: string;
  }>();
  const { data: sentenceList, isLoading } = useDailyChallengeSentences(
    dailyChallengeId.dailyChallengeId,
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (sentenceList?.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No sentences available for today.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {sentenceList?.map((item, index) => (
          <Card key={item?._id} style={styles.sentenceCard}>
            <View style={styles.sentenceHeader}>
              <Ionicons
                name="chatbubbles"
                size={20}
                color={Theme.colors.primary}
              />
              <Text style={styles.sentenceLabel}>Sentence - {index + 1}</Text>
            </View>

            <Text style={styles.sentence}>{item.sentence}</Text>

            <View style={styles.explanationContainer}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="bulb-outline"
                  size={16}
                  color={Theme.colors.warning}
                />
                <Text style={styles.sectionLabel}>Explanation</Text>
              </View>
              <Text style={styles.explanationText}>{item.explanation}</Text>
            </View>

            {item.otherWays && item.otherWays.length > 0 && (
              <View style={styles.otherWaysContainer}>
                <View style={styles.sectionHeader}>
                  <Ionicons
                    name="shuffle-outline"
                    size={16}
                    color={Theme.colors.secondary}
                  />
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: Theme.colors.secondary },
                    ]}
                  >
                    Other ways to say it
                  </Text>
                </View>
                {item.otherWays.map((way, index) => (
                  <View key={index} style={styles.otherWayItem}>
                    <Ionicons
                      name="arrow-redo-outline"
                      size={14}
                      color={Theme.colors.textTertiary}
                    />
                    <Text style={styles.otherWayText}>{way}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.scenarioBanner}>
              <View style={styles.scenarioHeader}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={Theme.colors.success}
                />
                <Text style={styles.scenarioLabel}>Scenario</Text>
              </View>
              <Text style={styles.scenarioText}>{item.context}</Text>
            </View>

            <View style={styles.footer}>
              <View
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor:
                      item.difficulty === "easy"
                        ? Theme.colors.success + "20"
                        : item.difficulty === "medium"
                          ? Theme.colors.warning + "20"
                          : Theme.colors.error + "20",
                  },
                ]}
              >
                <View
                  style={[
                    styles.difficultyDot,
                    {
                      backgroundColor:
                        item.difficulty === "easy"
                          ? Theme.colors.success
                          : item.difficulty === "medium"
                            ? Theme.colors.warning
                            : Theme.colors.error,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.difficultyText,
                    {
                      color:
                        item.difficulty === "easy"
                          ? Theme.colors.success
                          : item.difficulty === "medium"
                            ? Theme.colors.warning
                            : Theme.colors.error,
                    },
                  ]}
                >
                  {item.difficulty}
                </Text>
              </View>

              <TouchableOpacity style={styles.pronounceBtn}>
                <Ionicons
                  name="volume-high-outline"
                  size={18}
                  color={Theme.colors.primary}
                />
                <Text style={styles.pronounceBtnText}>Pronounce</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  content: { padding: Theme.spacing.base },
  sentenceCard: { marginBottom: Theme.spacing.md },
  sentenceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.xs,
  },
  sentenceLabel: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sentence: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.lg,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  explanationContainer: {
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.warning,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
  },
  sectionLabel: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  explanationText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textPrimary,
    lineHeight: 22,
  },
  otherWaysContainer: {
    backgroundColor: Theme.colors.backgroundTertiary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.md,
  },
  otherWayItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
  },
  otherWayText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textPrimary,
    flex: 1,
    fontStyle: "italic",
  },
  scenarioBanner: {
    backgroundColor: Theme.colors.success + "10", // 10% opacity
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
  },
  scenarioHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.xs,
  },
  scenarioLabel: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.success,
    textTransform: "uppercase",
  },
  scenarioText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.typography.fontWeight.medium,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
    paddingTop: Theme.spacing.md,
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    gap: 4,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: Theme.typography.fontWeight.bold,
    textTransform: "capitalize",
  },
  pronounceBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
  },
  pronounceBtnText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  completed: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.success,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.xl,
  },
  emptyText: {
    textAlign: "center",
    color: Theme.colors.textSecondary,
    fontSize: Theme.typography.fontSize.base,
  },
});
