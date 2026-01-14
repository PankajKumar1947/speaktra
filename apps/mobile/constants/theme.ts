/**
 * Design System - Theme Constants
 * Professional design tokens for English speaking app
 * Following 8pt grid system with mobile-first approach
 */

export const Colors = {
  // Primary palette - Professional blues and purples
  primary: "#6366F1", // Indigo
  primaryDark: "#4F46E5",
  primaryLight: "#818CF8",

  // Secondary palette
  secondary: "#8B5CF6", // Purple
  secondaryDark: "#7C3AED",
  secondaryLight: "#A78BFA",

  // Accent
  accent: "#EC4899", // Pink
  accentLight: "#F9A8D4",

  // Neutrals
  background: "#FFFFFF",
  backgroundSecondary: "#F9FAFB",
  backgroundTertiary: "#F3F4F6",

  // Dark mode
  backgroundDark: "#111827",
  backgroundDarkSecondary: "#1F2937",

  // Text
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  textInverse: "#FFFFFF",

  // Borders
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderDark: "#D1D5DB",

  // Status colors
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",

  // Overlay
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",

  // Gradients
  gradientPrimary: ["#6366F1", "#8B5CF6"],
  gradientSecondary: ["#EC4899", "#8B5CF6"],
  gradientAccent: ["#F59E0B", "#EC4899"],
} as const;

export const Typography = {
  // Font families - Using system fonts for optimal performance
  fontFamily: {
    regular: "System",
    medium: "System",
    semiBold: "System",
    bold: "System",
  },

  // Font sizes - Based on design specs
  fontSize: {
    // Captions
    xs: 12,

    // Body
    sm: 14,
    base: 15,

    // Subheading
    md: 16,

    // Heading
    lg: 20,
    xl: 24,

    // Display
    "2xl": 28,
    "3xl": 32,
  },

  // Font weights
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semiBold: "600" as const,
    bold: "700" as const,
  },

  // Line heights - For better readability
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const Spacing = {
  // 8pt grid system
  xs: 4,
  sm: 8,
  md: 12,
  base: 16, // Horizontal padding
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,

  // Semantic spacing
  gutterHorizontal: 16, // Horizontal padding from design spec
  contentMaxWidth: 390, // Max content width
} as const;

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12, // Card radius from spec
  xl: 16,
  "2xl": 24,
  full: 9999,
} as const;

export const Shadows = {
  // Subtle elevation for cards
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
} as const;

export const ComponentStyles = {
  // Button styles from spec
  button: {
    height: {
      primary: 48, // From spec
      secondary: 44,
      small: 36,
    },
    borderRadius: BorderRadius.lg,
    disabledOpacity: 0.4, // 40% from spec
  },

  // Card styles from spec
  card: {
    borderRadius: BorderRadius.lg, // 12px from spec
    padding: Spacing.base,
    shadow: Shadows.sm,
  },

  // Input styles
  input: {
    height: 48,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    fontSize: Typography.fontSize.base,
  },
} as const;

export const Layout = {
  // Screen padding
  screenPadding: {
    horizontal: Spacing.gutterHorizontal,
    vertical: Spacing.lg,
  },

  // Container
  containerMaxWidth: Spacing.contentMaxWidth,

  // Grid
  gridBase: 8, // 8pt grid
} as const;

// Animation constants
export const Animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    default: "ease-in-out",
    accelerate: "ease-in",
    decelerate: "ease-out",
  },
} as const;

// Export theme object
export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  components: ComponentStyles,
  layout: Layout,
  animation: Animation,
} as const;

export default Theme;
