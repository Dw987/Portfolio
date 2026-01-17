import React from "react";
import { Image, ImageSourcePropType } from "react-native";

interface TabIconProps {
  source: ImageSourcePropType;
  size: number;
  color: string;
}

export function TabIcon({ source, size, color }: TabIconProps) {
  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        tintColor: color,
      }}
      resizeMode="contain"
    />
  );
}
