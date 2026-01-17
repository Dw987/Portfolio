import {
  StyleSheet,
  Text,
  type TextProps,
  useWindowDimensions,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

const defaultColor = "#fbedff";
const highlightColor = "#d278f3";

export type IntroProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "highlighted"
    | "subtitle"
    | "description"
    | "highlighted_desc";
};

export function Intro({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: IntroProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title"
          ? isMobile
            ? styles.titleMobile
            : styles.title
          : undefined,
        type === "highlighted"
          ? isMobile
            ? styles.highlightedMobile
            : styles.highlighted
          : undefined,
        type === "subtitle"
          ? isMobile
            ? styles.subtitleMobile
            : styles.subtitle
          : undefined,
        type === "description"
          ? isMobile
            ? styles.descriptionMobile
            : styles.description
          : undefined,
        type === "highlighted_desc" ? styles.highlighted_desc : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: defaultColor,
  },
  highlighted: {
    fontSize: 35,
    fontWeight: "bold",
    color: highlightColor,
  },
  highlightedMobile: {
    fontSize: 24,
    fontWeight: "bold",
    color: highlightColor,
  },
  highlighted_desc: {
    fontWeight: "bold",
    color: highlightColor,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 20,
    color: defaultColor,
  },
  titleMobile: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 32,
    marginTop: 15,
    marginBottom: 15,
    color: defaultColor,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: defaultColor,
  },
  subtitleMobile: {
    fontSize: 20,
    fontWeight: "bold",
    color: defaultColor,
  },
  description: {
    textAlign: "justify",
    lineHeight: 40,
    fontSize: 25,
    flexDirection: "row",
    color: defaultColor,
  },
  descriptionMobile: {
    textAlign: "justify",
    lineHeight: 28,
    fontSize: 16,
    flexDirection: "row",
    color: defaultColor,
  },
});
