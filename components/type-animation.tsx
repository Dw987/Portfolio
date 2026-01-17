import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { View, Text, StyleSheet } from "react-native";

const defaultColor = "#fbedff";

type TextAnimatorProps = {
  content: string | string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
};

export function TextAnimator({
  content,
  typingSpeed = 200,
  deletingSpeed = 50,
  pauseAfterTyping = 3000,
  pauseAfterDeleting = 500,
}: TextAnimatorProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cursorOpacity = useSharedValue(1);

  const textArray = Array.isArray(content) ? content : [content];
  const currentText = textArray[currentIndex];

  useEffect(() => {
    cursorOpacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing phase
          if (displayedText.length < currentText.length) {
            setDisplayedText(
              currentText.substring(0, displayedText.length + 1)
            );
          } else {
            // Finished typing, pause then start deleting
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, pauseAfterTyping);
          }
        } else {
          // Deleting phase
          if (displayedText.length > 0) {
            setDisplayedText(
              displayedText.substring(0, displayedText.length - 1)
            );
          } else {
            // Finished deleting, pause then start typing again
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(false);
              setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % textArray.length
              );
            }, pauseAfterDeleting);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, isPaused, content]);

  const cursorStyle = useAnimatedStyle(() => {
    return {
      opacity: cursorOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.defaultText}>{displayedText}</Text>
      <Animated.Text style={[styles.cursor, cursorStyle]}>|</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  defaultText: {
    fontSize: 35,
    fontWeight: "600",
    fontFamily: "Orbitron",
    color: defaultColor,
  },
  cursor: {
    fontSize: 35,
    fontWeight: "600",
    color: defaultColor,
    marginLeft: 2,
  },
});
