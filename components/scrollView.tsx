import { PropsWithChildren, useRef } from "react";
import {
  Platform,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Footer from "./footer";

export default function Scroller({ children }: PropsWithChildren) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { opacity, onScroll } = useFooterScroll();
  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          isMobile && styles.scrollContainerMobile,
        ]}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {" "}
        {children}
        <Footer opacity={opacity} />
      </ScrollView>
    </>
  );
}

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

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    paddingTop: Platform.OS === "web" ? 120 : 20,
    paddingBottom: Platform.OS === "web" ? 20 : 120,
  },
  scrollContainerMobile: {
    paddingHorizontal: 20,
    paddingTop: 100,
  },
});
