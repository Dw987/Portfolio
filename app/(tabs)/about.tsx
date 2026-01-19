import { StyleSheet } from "react-native";

import { Intro } from "@/components/intro";
import ScreenWrapper from "@/components/screenImg";

export default function TabTwoScreen() {
  return (
    <ScreenWrapper>
      <Intro type="title">
        I'M <Intro type="highlighted">DICKIE WONG</Intro>
      </Intro>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
