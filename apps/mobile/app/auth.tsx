import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Input } from "../components";
import Theme from "../constants/theme";

/**
 * Authentication Screen
 * Supports Google, Email, and Phone/OTP authentication
 * Follows design specifications with proper layout and states
 */
export default function AuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState<"initial" | "email" | "phone">(
    "initial",
  );

  const handleGoogleAuth = () => {
    setIsLoading(true);
    // TODO: Implement Google authentication
    console.log("Google auth clicked");
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleEmailAuth = () => {
    if (authMode === "initial") {
      setAuthMode("email");
    } else {
      setIsLoading(true);
      // TODO: Implement email authentication
      console.log("Email auth:", email, password);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handlePhoneAuth = () => {
    if (authMode === "initial") {
      setAuthMode("phone");
    } else {
      if (!phoneNumber) {
        setError("Please enter a valid phone number");
        return;
      }
      setIsLoading(true);
      setError("");
      // TODO: Implement phone/OTP authentication
      console.log("Phone auth:", phoneNumber);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleBack = () => {
    setAuthMode("initial");
    setError("");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <LinearGradient
        colors={[Theme.colors.background, Theme.colors.backgroundSecondary]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>S</Text>
              </View>
              <Text style={styles.appName}>Speaktra</Text>
              <Text style={styles.tagline}>Master English Speaking</Text>
            </View>

            {/* Auth Section */}
            <View style={styles.authSection}>
              {authMode === "initial" ? (
                <>
                  {/* Primary Auth Options */}
                  <Button
                    title="Continue with Google"
                    onPress={handleGoogleAuth}
                    variant="primary"
                    loading={isLoading}
                    icon={<Text style={styles.googleIcon}>G</Text>}
                  />

                  <Button
                    title="Continue with Email"
                    onPress={handleEmailAuth}
                    variant="secondary"
                  />

                  {/* Divider */}
                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Phone Auth */}
                  <Button
                    title="Continue with Phone"
                    onPress={handlePhoneAuth}
                    variant="outline"
                  />
                </>
              ) : authMode === "email" ? (
                <>
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />

                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    showPasswordToggle
                    secureTextEntry
                    autoCapitalize="none"
                  />

                  {error && <Text style={styles.errorText}>{error}</Text>}

                  <Button
                    title="Sign In"
                    onPress={handleEmailAuth}
                    loading={isLoading}
                  />

                  <Button title="Back" onPress={handleBack} variant="text" />
                </>
              ) : (
                <>
                  <Input
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    error={error}
                  />

                  <Button
                    title="Send OTP"
                    onPress={handlePhoneAuth}
                    loading={isLoading}
                  />

                  <Button title="Back" onPress={handleBack} variant="text" />
                </>
              )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By continuing, you agree to our{" "}
                <Text style={styles.footerLink}>Terms of Service</Text> and{" "}
                <Text style={styles.footerLink}>Privacy Policy</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Theme.layout.screenPadding.horizontal,
    paddingVertical: Theme.layout.screenPadding.vertical,
  },
  logoSection: {
    alignItems: "center",
    marginTop: Theme.spacing["3xl"],
    marginBottom: Theme.spacing["4xl"],
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  logoText: {
    fontSize: 40,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  appName: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  tagline: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textSecondary,
    textAlign: "center",
  },
  authSection: {
    flex: 1,
    gap: Theme.spacing.base,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: Theme.typography.fontWeight.bold,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Theme.spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  dividerText: {
    marginHorizontal: Theme.spacing.md,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textTertiary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  errorText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.error,
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.md,
  },
  footerText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.textSecondary,
    textAlign: "center",
    lineHeight:
      Theme.typography.lineHeight.relaxed * Theme.typography.fontSize.xs,
  },
  footerLink: {
    color: Theme.colors.primary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
});
