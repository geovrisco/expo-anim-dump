import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

export default function App() {
  const rotation = useSharedValue(0);
  const shootPowerHorizontal = useSharedValue(0);
  const shootPowerVertical = useSharedValue(0);
  const time = useSharedValue(0);
  const [isPressing, setIsPressing] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const onPressOut = () => {
    stopInterval();
  };

  const startInterval = () => {
    const id = setInterval(() => {
      if (rotation.value > -75) rotation.value = rotation.value - 1;

      time.value += 1;
    }, 25);
    setIntervalId(id);
  };
  const onPressIn = () => {
    setIsPressing(true);
    time.value = 0;
    startInterval();
    shootPowerHorizontal.value = withSpring(0);
    shootPowerVertical.value = withSpring(0);
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    shootPowerHorizontal.value = withSpring(-rotation.value);
    console.log(time.value, "time");

    rotation.value = withTiming(0);
  };

  const volumeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value} deg`,
      },
    ],
  }));

  const firstInterval = () => {};

  const secondInterval = () => {
    const b = setInterval(
      () => {
        console.log(second);
      },
      (time.value * 25) / 2,
      () => clearInterval()
    );
  };

  const objectStyle = useAnimatedStyle(() => ({
    transform: [
      // {
      //   translateX: interpolate(shootPowerHorizontal.value, [0, 75], [0, 190], {
      //     extrapolateLeft: Extrapolation.CLAMP,
      //     extrapolateRight: Extrapolation.CLAMP,
      //   }),
      // },
      {
        translateY: interpolate(
          time.value,
          [0, shootPowerHorizontal.value / 2, shootPowerHorizontal.value],
          [0, -50, 0],
          {
            extrapolateLeft: Extrapolation.CLAMP,
            extrapolateRight: Extrapolation.CLAMP,
          }
        ),
      },
    ],
  }));
  /**
   * TODO:
   * do interpolate x =
   * do interpolate y =
   */

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
          <Animated.View style={volumeStyle}>
            <Ionicons name="volume-high" size={50} color="green" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            height: 5,
            width: 150,
            backgroundColor: "green",
            borderRadius: 10,
            marginLeft: 10,
          }}
        />
        <Animated.View
          style={[
            {
              height: 12,
              width: 12,
              backgroundColor: "green",
              borderRadius: 6,
              position: "absolute",
              bottom: 19.5,
              left: 50,
            },
            objectStyle,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
