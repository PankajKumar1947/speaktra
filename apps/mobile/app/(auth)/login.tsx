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
import { useLogin } from "@repo/query";
import { LoginBody, LoginSchema } from "@repo/schema";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const methods = useForm<LoginBody>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleContinue = (data: LoginBody) => {
    login(data, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "You have successfully logged in.",
        });
        router.push("/(auth)/domain-selection");
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error.message || "An unexpected error occurred.",
        });
      },
    });
  };

  // TODO: Implement Google OAuth
  // const handleGoogleLogin = () => {
  //   // Placeholder for Google OAuth
  //   router.push("/(auth)/domain-selection");
  // };

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

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Continue your English learning journey
          </Text>

          {/* Google Login Button */}
          {/* <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleLogin}
          >
            <Ionicons name="logo-google" size={20} color={Theme.colors.error} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View> */}

          <FormProvider {...methods}>
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

          {/* Continue Button */}
          <Button
            title={isPending ? "Loading..." : "Continue"}
            onPress={methods.handleSubmit(handleContinue)}
            disabled={isPending}
            style={styles.continueButton}
          />

          {/* Register Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/register")}
            style={styles.registerLinkContainer}
          >
            <Text style={styles.registerLinkText}>
              Don't have an account?{" "}
              <Text style={styles.registerLinkHighlight}>Register</Text>
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
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.background,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.lg,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.base,
    gap: Theme.spacing.sm,
  },
  socialButtonText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  dividerText: {
    marginHorizontal: Theme.spacing.md,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  continueButton: {
    marginTop: Theme.spacing.base,
  },
  registerLinkContainer: {
    marginTop: Theme.spacing.lg,
    alignItems: "center",
  },
  registerLinkText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  registerLinkHighlight: {
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
