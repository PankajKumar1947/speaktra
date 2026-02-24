import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { useFormContext, useController } from "react-hook-form";
import Theme from "../constants/theme";

export interface InputProps extends TextInputProps {
  name?: string;
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

/**
 * Reusable Input Component
 * Supports labels, error states, icons, and password visibility toggle.
 * Integrated with react-hook-form via name prop.
 */
export default function Input({
  name,
  label,
  error: manualError,
  helperText,
  containerStyle,
  leftIcon,
  rightIcon,
  showPasswordToggle,
  secureTextEntry,
  ...textInputProps
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const formContext = useFormContext();
  const isHookForm = !!(name && formContext);

  const { field, fieldState } = isHookForm
    ? useController({ name, control: formContext.control })
    : { field: null, fieldState: null };

  const error = manualError || fieldState?.error?.message;
  const hasError = !!error;
  const isPassword = secureTextEntry || showPasswordToggle;

  const value = field ? field.value : textInputProps.value;
  const onChangeText = (text: string) => {
    field?.onChange(text);
    textInputProps.onChangeText?.(text);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          hasError && styles.inputContainerError,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          {...textInputProps}
          value={value}
          onChangeText={onChangeText}
          onBlur={(e) => {
            field?.onBlur();
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
          secureTextEntry={isPassword && !isPasswordVisible}
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon || showPasswordToggle ? styles.inputWithRightIcon : null,
            textInputProps.style,
          ]}
          placeholderTextColor={Theme.colors.textTertiary}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
        />

        {showPasswordToggle && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.rightIconContainer}
          >
            <Text style={styles.passwordToggleText}>
              {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && !showPasswordToggle && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>

      {hasError && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !hasError && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: Theme.components.input.height,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.components.input.borderRadius,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  inputContainerFocused: {
    borderColor: Theme.colors.primary,
    borderWidth: 1.5,
  },
  inputContainerError: {
    borderColor: Theme.colors.error,
  },
  input: {
    flex: 1,
    fontSize: Theme.components.input.fontSize,
    color: Theme.colors.textPrimary,
    paddingHorizontal: Theme.components.input.paddingHorizontal,
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  leftIconContainer: {
    paddingLeft: Theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIconContainer: {
    paddingRight: Theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordToggleText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.error,
    marginTop: Theme.spacing.xs,
  },
  helperText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
});
