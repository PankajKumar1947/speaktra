import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "../../components";
import Theme from "../../constants/theme";
import { useAuth } from "@repo/query";
import { RegisterBody, RegisterSchema } from "@repo/schema";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const router = useRouter();
  const { registerMutation } = useAuth();
  const { mutate: register, isPending } = registerMutation;

  const methods = useForm<RegisterBody>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleContinue = (data: RegisterBody) => {
    register(data, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Registration Successful",
          text2: "Your account has been created.",
        });
        router.push("/(auth)/domain-selection");
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: error.message || "An unexpected error occurred.",
        });
      },
    });
  };

  return (
    <LinearGradient
      colors={Theme.colors.gradientPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.appName}>Speaktra</Text>
          <Text style={styles.tagline}>Master English Speaking</Text>
        </View>

        {/* Register Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Join Us</Text>
          <Text style={styles.subtitle}>
            Start your English learning journey today
          </Text>

          <FormProvider {...methods}>
            {/* Name Input */}
            <Input
              name="name"
              placeholder="Full Name"
              autoCapitalize="words"
              leftIcon={
                <Ionicons
                  name="person"
                  size={20}
                  color={Theme.colors.textSecondary}
                />
              }
            />

            {/* Email Input */}
            <Input
              name="email"
              placeholder="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={
                <Ionicons
                  name="mail"
                  size={20}
                  color={Theme.colors.textSecondary}
                />
              }
            />

            {/* Password Input */}
            <Input
              name="password"
              placeholder="Password"
              secureTextEntry
              showPasswordToggle
              leftIcon={
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color={Theme.colors.textSecondary}
                />
              }
            />
          </FormProvider>

          {/* Create Account Button */}
          <Button
            title={isPending ? "Creating Account..." : "Create Account"}
            onPress={methods.handleSubmit(handleContinue)}
            disabled={isPending}
            style={styles.continueButton}
          />

          {/* Login Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            style={styles.loginLinkContainer}
          >
            <Text style={styles.loginLinkText}>
              Already have an account?{" "}
              <Text style={styles.loginLinkHighlight}>Login</Text>
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            By continuing, you agree to our{" "}
            <Text style={styles.link}>Terms</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Theme.spacing.base,
    paddingVertical: Theme.spacing["4xl"],
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Theme.spacing["3xl"],
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.colors.textInverse,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.lg,
    marginBottom: Theme.spacing.md,
  },
  logoText: {
    fontSize: 40,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
  },
  appName: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginBottom: Theme.spacing.xs,
  },
  tagline: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  card: {
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.xl,
    ...Theme.shadows.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
  },
  continueButton: {
    marginTop: Theme.spacing.base,
  },
  loginLinkContainer: {
    marginTop: Theme.spacing.lg,
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  loginLinkHighlight: {
    color: Theme.colors.primary,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  footer: {
    marginTop: Theme.spacing.xl,
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.textSecondary,
    textAlign: "center",
  },
  link: {
    color: Theme.colors.primary,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
});
