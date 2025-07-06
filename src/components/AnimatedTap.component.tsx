import { Pressable, PressableProps } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


const AnimatedPresseable = Animated.createAnimatedComponent(Pressable)

export default function AnimatedTap(props: PressableProps) {
    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    const animateIn = () => {
        scale.value = withTiming(0.96, {
            duration: 100,
            easing: Easing.out(Easing.ease),
        })
    }

    const animateOut = () => {
        scale.value = withTiming(1, {
            duration: 150,
            easing: Easing.out(Easing.exp),
        })
    }

    return (
        <AnimatedPresseable
            {...props}
            style={[animatedStyle, props.style]}
            onPressIn={() => animateIn()}
            onPressOut={() => animateOut()}
        />
    )
}