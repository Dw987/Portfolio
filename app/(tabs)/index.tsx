import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Pressable,
} from "react-native";
import { Platform, StyleSheet, View } from "react-native";

import { Intro } from "@/components/intro";
import { HelloWave } from "@/components/hello-wave";
import { TextAnimator } from "@/components/type-animation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import React from "react";
import Footer, {
  useFooterScroll,
  styles as scrollStyles,
} from "../../components/footer";

type SocialLogoProps = {
  source: any;
  url: string;
};

function SocialLogo({ source, url }: SocialLogoProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[styles.socialsLogoContainer, hovered && styles.socialsLogoHover]}
    >
      <Image source={source} style={styles.socialsLogo} />
    </Pressable>
  );
}

export default function HomeScreen() {
  const IMAGES_DATA = [
    {
      id: "1",
      source: require("@/assets/images/logo/email.png"),
      url: "mailto:dickie.wongwh@gmail.com",
    },
    {
      id: "2",
      source: require("@/assets/images/logo/github.png"),
      url: "https://github.com/Dw987",
    },
    {
      id: "3",
      source: require("@/assets/images/logo/linkedin.png"),
      url: "https://www.linkedin.com/in/dickie-wong-9407831a8",
    },
  ];

  const renderImageItem = ({
    item,
  }: {
    item: { id: string; source: any; url: string };
  }) => <SocialLogo source={item.source} url={item.url} />;

  const { opacity, onScroll } = useFooterScroll();
  return (
    <ImageBackground
      source={require("@/assets/images/purple_space_stars.jpg")}
      style={{ flex: 1, width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <SafeAreaProvider>
        <ScrollView
          contentContainerStyle={[styles.scrollContainer]}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.parentContainer}>
            <View style={styles.childContainer}>
              <Intro type="subtitle">
                Hi There ! <HelloWave />
              </Intro>
              <Intro type="title">
                I'M <Intro type="highlighted">DICKIE WONG</Intro>
              </Intro>
              <TextAnimator
                content={[
                  "Frontend Developer",
                  "Backend Developer",
                  "Game Developer",
                  "Freelancer",
                ]}
              />
            </View>
            <Image
              source={require("@/assets/images/doggo.jpg")}
              style={styles.pfpImg}
            />
          </View>
          <View style={styles.parentContainer}>
            <View style={styles.childContainer}>
              <Intro type="title">About Me</Intro>
              <Intro type="description">
                As a{" "}
                <Intro type="highlighted_desc">
                  fresh Software Engineering graduate
                </Intro>
                , I am eager to start my career in technology. I am motivated to
                apply my skills, contribute to innovative projects, and grow
                professionally. I enjoy learning new technologies, collaborating
                with experienced mentors, and thriving in fast-paced
                environments that challenge me to improve.
                {"\n"}
                {"\n"}I am also passionate about{" "}
                <Intro type="highlighted_desc">Full-Stack Development</Intro>{" "}
                and <Intro type="highlighted_desc">Game Development</Intro>, and
                enjoy building engaging, interactive experiences from the ground
                up. I am eager to work on{" "}
                <Intro type="highlighted_desc">
                  Web and Mobile Applications.
                </Intro>{" "}
                Currently, I’m most familiar in{" "}
                <Intro type="highlighted_desc">JavaScript</Intro>,{" "}
                <Intro type="highlighted_desc">Java</Intro>,{" "}
                <Intro type="highlighted_desc">Python</Intro>,{" "}
                <Intro type="highlighted_desc">Angular</Intro>,{" "}
                <Intro type="highlighted_desc">Flutter</Intro>, and{" "}
                <Intro type="highlighted_desc">C++</Intro>, and I enjoy working
                across both backend and frontend stacks.
              </Intro>
            </View>

            <Image
              source={require("@/assets/images/developer.png")}
              style={styles.devImg}
            />
          </View>

          <View style={styles.socialsContainer}>
            <Intro type="title" style={{ fontFamily: "oswald" }}>
              Find me on
            </Intro>
            <View>
              <FlatList
                data={IMAGES_DATA}
                renderItem={renderImageItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Intro type="subtitle" style={{ fontFamily: "bubbler-one" }}>
              Feel free to <Intro type="highlighted_desc">connect </Intro>with
              me
            </Intro>
          </View>
          <Footer opacity={opacity} />
        </ScrollView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    paddingTop: Platform.OS === "web" ? 120 : 20,
    paddingBottom: Platform.OS === "web" ? 20 : 120,
  },
  parentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 80,
    marginBottom: 100,
  },
  childContainer: {
    maxWidth: Platform.OS === "web" ? 500 : "80%",
    flex: 1,
    flexDirection: "column",
  },
  pfpImg: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: "white",
  },
  devImg: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  socialsContainer: {
    alignItems: "center",
    alignContent: "center",
    marginTop: 150,
    marginBottom: 100,
  },
  socialsLogo: {
    width: 35,
    height: 35,
  },
  socialsLogoContainer: {
    marginHorizontal: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 5,
  },
  socialsLogoHover: {
    transform: [{ scale: 1.1 }],
  },
});
