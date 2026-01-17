import { Stack, Tabs } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Platform, Pressable, View, StyleSheet } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { useIsFocused } from "@react-navigation/native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import homeIcon from "@/assets/images/logo/home.png";
import { TabIcon } from "@/components/tab-icon";

const color = "#fbedff";

function RoundedTabButton({ children, onPress, accessibilityState }: any) {
  const isFocused = useIsFocused();
  const [hovered, setHovered] = useState(false);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.08 : 1, {
      damping: 12,
      stiffness: 180,
      mass: 0.5,
    });

    translateY.value = withSpring(isFocused ? -2 : 0, {
      damping: 10,
      stiffness: 100,
    });
  }, [isFocused]);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={({ pressed }) => [styles.tabWrapper, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.tabInner,
          isFocused && styles.selected,
          hovered && !isFocused && styles.hovered,
        ]}
      >
        {children}
      </View>
    </Pressable>
  );
}

/* ---------- Tab Layout ---------- */
export default function TabLayout() {
  const isWeb = Platform.OS === "web";
  const logoSize = 25;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: isWeb ? "top" : "bottom",
        tabBarButton: Platform.OS === "web" ? RoundedTabButton : HapticTab,

        tabBarActiveTintColor: color,
        tabBarInactiveTintColor: "white",

        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",

        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          marginTop: 2,
        },

        tabBarStyle: Platform.select({
          web: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            position: "absolute",
            top: 20,
            left: "50%",
            transform: [{ translateX: "-50%" }],
            maxWidth: 350,
            height: 70,
            borderRadius: 70,
            zIndex: 1000,
          },
          default: {
            height: 70,
            backgroundColor: "#130e1480",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabIcon source={homeIcon} size={logoSize} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  tabWrapper: {
    borderRadius: 200,
    overflow: "hidden",
  },
  tabInner: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  selected: {
    backgroundColor: color + "20",
  },
  hovered: {
    backgroundColor: color + "42",
  },
  pressed: {
    opacity: 1,
  },
});
