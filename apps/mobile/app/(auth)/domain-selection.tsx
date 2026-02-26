import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../../components";
import Theme from "../../constants/theme";
import { useDomains } from "@repo/query";
import type { DomainEntity } from "@repo/schema";

export default function DomainSelectionScreen() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const { data: domains, isLoading, isError } = useDomains();

  const handleContinue = () => {
    if (selectedDomain) {
      router.push({
        pathname: "/(auth)/level-selection",
        params: { domainId: selectedDomain },
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={Theme.colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Choose Your Domain</Text>
          <Text style={styles.headerSubtitle}>Loading domains...</Text>
        </LinearGradient>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={Theme.colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Choose Your Domain</Text>
          <Text style={styles.headerSubtitle}>
            Failed to load domains. Please try again later.
          </Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={Theme.colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Choose Your Domain</Text>
        <Text style={styles.headerSubtitle}>
          We'll personalize your learning experience
        </Text>
      </LinearGradient>

      {/* Domain Cards */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {domains?.map((domain: DomainEntity) => (
          <TouchableOpacity
            key={domain._id}
            style={[
              styles.card,
              selectedDomain === domain._id && styles.cardSelected,
            ]}
            onPress={() => setSelectedDomain(domain._id)}
          >
            <Text
              style={[
                styles.cardTitle,
                selectedDomain === domain._id && styles.cardTitleSelected,
              ]}
            >
              {domain.name}
            </Text>
            {domain.description ? (
              <Text
                style={[
                  styles.cardDescription,
                  selectedDomain === domain._id &&
                    styles.cardDescriptionSelected,
                ]}
              >
                {domain.description}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedDomain}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingTop: Theme.spacing["5xl"],
    paddingBottom: Theme.spacing["2xl"],
    paddingHorizontal: Theme.spacing.base,
  },
  headerTitle: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.base,
    paddingVertical: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  card: {
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.xl,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    ...Theme.shadows.md,
  },
  cardSelected: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primaryLight,
  },
  cardTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  cardTitleSelected: {
    color: Theme.colors.textInverse,
  },
  cardDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  cardDescriptionSelected: {
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  footer: {
    paddingHorizontal: Theme.spacing.base,
    paddingBottom: Theme.spacing.xl,
  },
});
