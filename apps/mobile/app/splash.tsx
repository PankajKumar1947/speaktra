import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "../constants/theme";

/**
 * Splash Screen
 * Auto-transitions to auth screen after 2 seconds
 * Features centered logo, tagline, and loading indicator
 */
export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-transition after 2 seconds
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[Theme.colors.primary, Theme.colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo placeholder - replace with actual logo image */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Master English Speaking</Text>
        <Text style={styles.subtitle}>For Working Professionals</Text>
      </Animated.View>

      {/* Loading indicator at bottom */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Theme.colors.textInverse} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  logoContainer: {
    marginBottom: Theme.spacing.xl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.textInverse,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.lg,
  },
  logoText: {
    fontSize: 48,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
  },
  tagline: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.textInverse,
    opacity: 0.9,
    textAlign: "center",
  },
  loadingContainer: {
    position: "absolute",
    bottom: Theme.spacing["5xl"],
  },
});
