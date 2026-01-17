import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRef } from "react";

export function useFooterScroll() {
  const opacity = useRef(new Animated.Value(0)).current;
  const visible = useRef(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

    const atBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (atBottom && !visible.current) {
      visible.current = true;
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    if (!atBottom && visible.current) {
      visible.current = false;
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return { opacity, onScroll };
}

export default function Footer({ opacity }: { opacity: Animated.Value }) {
  return (
    <Animated.View style={[styles.footer, { opacity }]}>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {" "}
          © Designed and Developed by Dickie Wong{" "}
        </Text>
        <Text style={[styles.footerText, styles.middleText]}>
          Copyright © 2026 DW
        </Text>
        <Text style={styles.footerText}>Build with React Native ❤️</Text>
      </View>
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  scrollStyles: {
    flex: 1,
    backgroundColor: "#d278f3",
    zIndex: 1000,
  },
  footer: {
    width: "100%",
    paddingTop: 15,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
    gap: "50%",
  },
  footerText: {
    flex: 1,
    textAlign: "center",
    flexWrap: "wrap",
    fontFamily: "roboto-mono",
    fontSize: 20,
    fontWeight: "600",
    color: "#fbedff",
  },
  middleText: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});
