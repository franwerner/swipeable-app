import { Heart, LucideProps } from "lucide-react-native"
import { useState } from "react"
import { Pressable, PressableProps } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from "react-native-reanimated"

interface SetHeartProps extends PressableProps {
    likeStatus: boolean
    hearthProps?: {
        active?: LucideProps
        inactive?: LucideProps
    }
    onChangeStatus?: (status: boolean) => void

}
const AnimatedHeart = Animated.createAnimatedComponent(Heart)

export default function SetHeart({
    likeStatus: defaultLikeStatus,
    hearthProps = {},
    onChangeStatus,
    ...props
}: SetHeartProps) {

    const [liked, setLiked] = useState(defaultLikeStatus)
    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    //El manejo de la peticion para cambiar el estado del like se debe hacer aca dentro.
    //Deberia recibir el user id y el set id

    const { active, inactive } = hearthProps

    const handlePress = () => {
        const newValue = !liked
        setLiked(newValue)
        onChangeStatus && onChangeStatus(newValue)
        scale.value = 1

        if (newValue) {
            scale.value = withSequence(
                withSpring(1.5, { stiffness: 300, damping: 20 }),
                withSpring(1.3, { stiffness: 300, damping: 20 }),
                withSpring(1, { stiffness: 300, damping: 20 })
            )
        } else {
            scale.value = withSequence(
                withSpring(0.7, { stiffness: 300, damping: 20 }),
                withSpring(0.9, { stiffness: 300, damping: 20 }),
                withSpring(1, { stiffness: 300, damping: 20 })
            )
        }
    }

    return (
        <Pressable
            onPress={handlePress}
            {...props}
        >
            {liked ?
                <AnimatedHeart
                    style={animatedStyle}
                    strokeWidth={1}
                    size={30}
                    {...active}
                />
                :
                <AnimatedHeart
                    style={animatedStyle}
                    strokeWidth={1}
                    size={30}
                    {...inactive}
                />
            }
        </Pressable>
    )
}
