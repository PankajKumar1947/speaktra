import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 839;
const LOGO_HEIGHT = 230;

interface LogoProps {
  className?: string;
  /**
   * "auto" follows the app theme, "on-dark" always uses the light
   * wordmark for surfaces that stay dark in both themes.
   */
  variant?: "auto" | "on-dark";
}

export function Logo({ className, variant = "auto" }: LogoProps) {
  const classes = cn("w-auto object-contain", className);

  if (variant === "on-dark") {
    return (
      <Image
        src="/logo-text-dark.png"
        alt="Speaktra"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={classes}
      />
    );
  }

  return (
    <>
      <Image
        src="/logo-text.png"
        alt="Speaktra"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={cn(classes, "dark:hidden")}
      />
      <Image
        src="/logo-text-dark.png"
        alt=""
        aria-hidden
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={cn(classes, "hidden dark:block")}
      />
    </>
  );
}
