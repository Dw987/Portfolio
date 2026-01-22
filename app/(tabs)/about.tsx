import { StyleSheet, View } from "react-native";

import { Intro } from "@/components/intro";
import ScreenWrapper from "@/components/screenImg";
import Scroller from "@/components/scrollView";
import AnimatedFlipCard from "@/components/flipCard";

export default function TabTwoScreen() {
  return (
    <ScreenWrapper>
      <Scroller>
        <View style={styles.parentContainer}>
          <Intro type="title">
            My Recent <Intro type="highlighted">Works</Intro>
          </Intro>
          <Intro type="subtitle" style={{ fontFamily: "roboto-thin" }}>
            Here are a few projects I've work on recently
          </Intro>
          <AnimatedFlipCard />
        </View>
      </Scroller>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 100,
  },
});
