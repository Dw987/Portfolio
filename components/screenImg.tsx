import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import backgroundImg from "@/assets/images/purple_space_stars.jpg";

export default function ScreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
