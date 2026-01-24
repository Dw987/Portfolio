import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  FlatList,
  Linking,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { VideoView, useVideoPlayer } from "expo-video";
import { TabIcon } from "@/components/tab-icon";
import tapIcon from "../assets/images/logo/tap.png";

const projectsNo = [
  {
    id: "1",
    title: "PawSwipe",
    description:
      "This is a swipe app, users swipe cards to like or dislike cats, see a summary of their choices with hover previews, and can retry with a new number of cats \n\nIt is built in React Router with TypeScript styled with Tailwind CSS, and image is from CATAAS API.",
    githubUrl: "https://github.com/Dw987/PawSwipe",
    demoUrl: "https://dw987.github.io/PawSwipe/",
    color: "#b6cff7",
    video: require("../assets/vid/pawSwipeDemo.mp4"),
    techStack: ["React Router", "TypeScript", "Tailwind"],
  },
  {
    id: "2",
    title: "My Portfolio",
    description:
      "This is an interactive portfolio for myself which will be updated overtime to showcase my progress and project. \n\nIt is built in React Native with Expo and TypeScript, styled using React Native StyleSheet, with animated gestures and Reanimated for smooth flip animations.",
    githubUrl: "https://github.com/Dw987/Portfolio",
    demoUrl: "https://dw987.github.io/Portfolio/",
    color: "#baeee5",
    video: require("../assets/vid/portfolioDemo.mp4"),
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "React Native Reanimated",
      "CSS",
    ],
  },
];

type Project = {
  id: string;
  title: string;
  description: string;
  color: string;
  githubUrl: string;
  demoUrl: string;
  video: any;
  techStack: string[];
};

type DemoVideoProps = {
  source: any;
};

export function DemoVideo({ source }: DemoVideoProps) {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.muted = true;
  });
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    player.play();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Pressable onPress={togglePlay} style={styles.vidContainer}>
      <VideoView
        player={player}
        style={styles.screen}
        contentFit="contain"
        allowsFullscreen
      />
    </Pressable>
  );
}

const TechStackChips = ({ stack }: { stack: string[] }) => {
  return (
    <View style={chipStyles.container}>
      {stack.map((tech) => (
        <View key={tech} style={chipStyles.chip}>
          <Text style={chipStyles.text}>{tech}</Text>
        </View>
      ))}
    </View>
  );
};

const RegularContent = ({
  title,
  video,
  techStack,
}: {
  title: string;
  color: string;
  video: any;
  techStack: string[];
}) => {
  return (
    <View style={regularContentStyles.card}>
      <Text style={regularContentStyles.text}>{title}</Text>
      <View style={styles.laptopFrame}>
        <DemoVideo source={video} />
      </View>
      <TechStackChips stack={techStack} />
      <View style={regularContentStyles.hintContainer}>
        <Text style={regularContentStyles.hintText}>Tap to flip </Text>
        <TabIcon source={tapIcon} size={24} color="white" />
      </View>
    </View>
  );
};

export function useHover() {
  const [hover, setHover] = useState(false);
  const onHoverIn = useCallback(() => setHover(true), []);
  const onHoverOut = useCallback(() => setHover(false), []);
  const hoverAnim = useSharedValue(0);

  useEffect(() => {
    hoverAnim.value = withTiming(hover ? 1 : 0, { duration: 200 });
  }, [hover]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      hoverAnim.value,
      [0, 1],
      ["#be6cdc", "#a309db"],
    ),
    color: "white",
  }));

  return {
    hoverProps: {
      hover,
      onHoverIn,
      onHoverOut,
    },
    animatedStyle,
  };
}

const FlippedContent = ({
  description,
  githubUrl,
  demoUrl,
}: {
  description: string;
  githubUrl: string;
  demoUrl: string;
}) => {
  const openGithubUrl = async () => {
    const supported = await Linking.canOpenURL(githubUrl);

    if (supported) {
      await Linking.openURL(githubUrl);
    } else {
      console.warn("Can't open github URL:", githubUrl);
    }
  };

  const openDemoUrl = async () => {
    const supported = await Linking.canOpenURL(demoUrl);

    if (supported) {
      await Linking.openURL(demoUrl);
    } else {
      console.warn("Can't open demo URL:", demoUrl);
    }
  };

  const githubHover = useHover();
  const demoHover = useHover();

  return (
    <View style={flippedContentStyles.card}>
      <Text style={flippedContentStyles.textDesc}>{description}</Text>
      <View style={{ width: "100%" }}>
        <Pressable {...githubHover.hoverProps} onPress={openGithubUrl}>
          <Animated.Text
            style={[flippedContentStyles.linkButton, githubHover.animatedStyle]}
          >
            GitHub
          </Animated.Text>
        </Pressable>
        <Pressable {...demoHover.hoverProps} onPress={openDemoUrl}>
          <Animated.Text
            style={[flippedContentStyles.linkButton, demoHover.animatedStyle]}
          >
            Demo
          </Animated.Text>
        </Pressable>
      </View>
    </View>
  );
};

interface FlipCardProps {
  isFlipped: SharedValue<boolean>;
  cardStyle?: StyleProp<ViewStyle>;
  RegularContent: ReactNode;
  FlippedContent: ReactNode;
  direction?: "x" | "y";
  duration?: number;
}

const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = "y",
  duration = 500,
  RegularContent,
  FlippedContent,
}: FlipCardProps) => {
  const isDirectionX = direction === "x";

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle,
        ]}
      >
        {RegularContent}
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle,
        ]}
      >
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const isFlipped = useSharedValue(false);

  return (
    <Pressable
      onPress={() => (isFlipped.value = !isFlipped.value)}
      style={{ margin: 8 }}
    >
      <FlipCard
        isFlipped={isFlipped}
        cardStyle={styles.flipCard}
        RegularContent={
          <RegularContent
            title={project.title}
            color={project.color}
            video={project.video}
            techStack={project.techStack}
          />
        }
        FlippedContent={
          <FlippedContent
            description={project.description}
            githubUrl={project.githubUrl}
            demoUrl={project.demoUrl}
          />
        }
      />
    </Pressable>
  );
};

export default function AnimatedFlipCardGrid() {
  return (
    <FlatList
      data={projectsNo}
      keyExtractor={(item) => item.id}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => <ProjectCard project={item} />}
      contentContainerStyle={{ paddingVertical: 16 }}
    />
  );
}

const flippedContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#be6cdc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  textDesc: {
    color: "white",
    fontSize: 20,
    padding: 20,
    textAlign: "justify",
  },
  linkButton: {
    margin: 5,
    padding: 10,
    fontSize: 16,
    borderRadius: 15,
    fontFamily: "Monospace",
    textAlign: "center",
  },
});

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: "absolute",
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
});

const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#4f3d78",
    borderRadius: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 45,
  },
  hintContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  hintText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
});

const chipStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
    paddingHorizontal: 10,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(180,150,255,0.4)",
    margin: 4,
  },
  text: {
    color: "white",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#b58df1",
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  flipCard: {
    width: 300,
    height: 500,
    backfaceVisibility: "hidden",
  },
  vidContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  laptopFrame: {
    width: "80%",
    height: 200,
    backgroundColor: "rgba(10, 6, 20, 0.75)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    width: "100%",
    height: "90%",
  },
});
