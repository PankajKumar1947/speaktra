import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Theme from "../constants/theme";

export interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  padding?: number;
  elevated?: boolean;
}

/**
 * Reusable Card Component
 * Following design system: 12px radius with subtle elevation
 */
export default function Card({
  children,
  style,
  padding = Theme.spacing.base,
  elevated = true,
}: CardProps) {
  return (
    <View
      style={[styles.card, { padding }, elevated && Theme.shadows.sm, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.components.card.borderRadius, // 12px from spec
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
  },
});
