import { Pressable, PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig } from "react-native-reanimated";

const animateConfig: WithSpringConfig = {
    damping: 10,
    stiffness: 150,
    mass: 0.8
}

export default function AnimatedTap(props: PressableProps) {
    const scale = useSharedValue(1)
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))
    return (
        <Animated.View style={animatedStyle} >
            <Pressable
                {...props}
                onPressIn={() =>
                    (scale.value = withSpring(0.95, animateConfig))
                }
                onPressOut={() =>
                    (scale.value = withSpring(1, animateConfig))
                }
            />
        </Animated.View>
    )
}