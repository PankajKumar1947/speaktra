import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, Button } from "../../../components";
import Theme from "../../../constants/theme";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "forever",
    features: [
      "Basic speaking practice",
      "Limited vocabulary",
      "5 articles/month",
      "Basic progress tracking",
    ],
    current: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹499",
    period: "/month",
    features: [
      "Unlimited speaking practice",
      "Full vocabulary access",
      "Unlimited articles",
      "Advanced AI feedback",
      "Detailed analytics",
      "Priority support",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹2999",
    period: "/year",
    features: [
      "Everything in Premium",
      "Team management",
      "Custom domains",
      "Dedicated support",
      "Advanced reporting",
      "Custom content",
    ],
  },
];

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>
          Upgrade to unlock all features and accelerate your learning
        </Text>

        {PLANS.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            onPress={() => setSelectedPlan(plan.id)}
          >
            <Card
              style={{
                ...styles.planCard,
                ...(selectedPlan === plan.id && styles.planCardSelected),
                ...(plan.current && styles.currentPlan),
              }}
            >
              {plan.recommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>RECOMMENDED</Text>
                </View>
              )}
              {plan.current && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentText}>CURRENT PLAN</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{plan.price}</Text>
                    <Text style={styles.period}>{plan.period}</Text>
                  </View>
                </View>
                {selectedPlan === plan.id && !plan.current && (
                  <Ionicons
                    name="checkmark-circle"
                    size={32}
                    color={Theme.colors.success}
                  />
                )}
              </View>

              <View style={styles.features}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={Theme.colors.success}
                    />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {!plan.current && selectedPlan === plan.id && (
                <Button
                  title={`Upgrade to ${plan.name}`}
                  onPress={() => {
                    /* Upgrade logic */
                  }}
                  style={styles.upgradeButton}
                />
              )}
            </Card>
          </TouchableOpacity>
        ))}

        <Text style={styles.footer}>
          All plans include a 7-day free trial. Cancel anytime.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  content: { padding: Theme.spacing.base },
  title: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
  },
  planCard: { marginBottom: Theme.spacing.md, position: "relative" },
  planCardSelected: { borderColor: Theme.colors.primary, borderWidth: 2 },
  currentPlan: { borderColor: Theme.colors.success, borderWidth: 2 },
  recommendedBadge: {
    position: "absolute",
    top: -8,
    left: Theme.spacing.md,
    backgroundColor: Theme.colors.warning,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    zIndex: 1,
  },
  recommendedText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  currentBadge: {
    position: "absolute",
    top: -8,
    left: Theme.spacing.md,
    backgroundColor: Theme.colors.success,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    zIndex: 1,
  },
  currentText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  planName: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  priceContainer: { flexDirection: "row", alignItems: "baseline" },
  price: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
  },
  period: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  features: { marginBottom: Theme.spacing.md },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  featureText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textPrimary,
    flex: 1,
  },
  upgradeButton: { marginTop: Theme.spacing.sm },
  footer: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    textAlign: "center",
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
});
