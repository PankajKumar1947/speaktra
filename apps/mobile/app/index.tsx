import { Redirect } from "expo-router";

/**
 * App Entry Point
 * Redirects to splash screen on launch
 */
export default function Index() {
  return <Redirect href="/splash" />;
}
