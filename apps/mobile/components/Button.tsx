import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
  DimensionValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "../constants/theme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text";
export type ButtonSize = "large" | "medium" | "small";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Reusable Button Component
 * Follows design system specifications with variants and states
 */
export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "large",
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const getButtonHeight = () => {
    switch (size) {
      case "large":
        return Theme.components.button.height.primary;
      case "medium":
        return Theme.components.button.height.secondary;
      case "small":
        return Theme.components.button.height.small;
      default:
        return Theme.components.button.height.primary;
    }
  };

  const buttonContainerStyle = [
    styles.buttonBase,
    {
      height: getButtonHeight(),
      width: (fullWidth ? "100%" : "auto") as DimensionValue,
      opacity: isDisabled ? Theme.components.button.disabledOpacity : 1,
    },
    style,
  ];

  const buttonTextStyle = [
    styles.buttonText,
    variant === "primary" && styles.primaryText,
    variant === "secondary" && styles.secondaryText,
    variant === "outline" && styles.outlineText,
    variant === "text" && styles.textButtonText,
    size === "small" && styles.smallText,
    textStyle,
  ];

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary"
              ? Theme.colors.textInverse
              : Theme.colors.primary
          }
          size="small"
        />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={buttonTextStyle}>{title}</Text>
        </>
      )}
    </View>
  );

  if (variant === "primary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={buttonContainerStyle}
      >
        <LinearGradient
          colors={Theme.colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        buttonContainerStyle,
        variant === "secondary" && styles.secondaryButton,
        variant === "outline" && styles.outlineButton,
        variant === "text" && styles.textButton,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: Theme.components.button.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  gradientButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
  },
  textButton: {
    backgroundColor: "transparent",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Theme.spacing.sm,
  },
  iconContainer: {
    marginRight: Theme.spacing.xs,
  },
  buttonText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  primaryText: {
    color: Theme.colors.textInverse,
  },
  secondaryText: {
    color: Theme.colors.textPrimary,
  },
  outlineText: {
    color: Theme.colors.primary,
  },
  textButtonText: {
    color: Theme.colors.primary,
  },
  smallText: {
    fontSize: Theme.typography.fontSize.sm,
  },
});
