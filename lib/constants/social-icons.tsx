import { ImageSourcePropType } from "react-native";

type SocialIcon = {
  light: ImageSourcePropType;
  dark?: ImageSourcePropType;
};

const socialIconMap: Record<string, SocialIcon> = {
  youtube: { light: require("@/assets/images/youtube.png") },
  tiktok: { light: require("@/assets/images/tiktok.png") },
  instagram: { light: require("@/assets/images/instagram.png") },
  twitter: {
    light: require("@/assets/images/twitter.png"),
    dark: require("@/assets/images/twitter_dark.png"),
  },
  facebook: { light: require("@/assets/images/facebook.png") },
  reddit: { light: require("@/assets/images/reddit.png") },
  linkedin: { light: require("@/assets/images/linkedin.png") },
  medium: {
    light: require("@/assets/images/medium.png"),
    dark: require("@/assets/images/medium_dark.png"),
  },
  quora: { light: require("@/assets/images/quora.png") },
  bluesky: { light: require("@/assets/images/bluesky.png") },
  threads: {
    light: require("@/assets/images/threads.png"),
    dark: require("@/assets/images/threads_white.png"),
  },
  pinterest: { light: require("@/assets/images/pinterest.png") },
};

export const socialMediaIcons: Record<string, ImageSourcePropType> =
  Object.fromEntries(
    Object.entries(socialIconMap).map(([key, value]) => [key, value.light])
  );

export const socialSources = Object.keys(socialIconMap);

export function getSocialIcon(
  source: string | null | undefined,
  isDarkTheme?: boolean
): ImageSourcePropType | undefined {
  if (!source) return undefined;
  const icon = socialIconMap[source.toLowerCase()];
  if (!icon) return undefined;
  if (isDarkTheme && icon.dark) return icon.dark;
  return icon.light;
}
