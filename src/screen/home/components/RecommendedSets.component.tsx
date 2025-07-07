import Button from "@/components/Button.component";
import SetCard from "@/components/SetCard.component";
import { Heart } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from "react-native-reanimated";
import setList from "../mocks/setList.mock";

interface SetCardHeartProps {
    likeStatus: boolean
}
const AnimatedHeart = Animated.createAnimatedComponent(Heart)

const SetCardHeart = ({ likeStatus }: SetCardHeartProps) => {

    const [liked, setLiked] = useState(likeStatus)
    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    const handlePress = () => {
        const newValue = !liked
        setLiked(newValue)

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
            className="items-end p-3 absolute right-3 top-3 "
            onPress={handlePress}
        >
            {liked ?
                <AnimatedHeart
                    style={animatedStyle}
                    fill="#EC5047"
                    stroke="#EC5047"
                    strokeWidth={1}
                    size={30} />
                :
                <AnimatedHeart
                    style={animatedStyle}
                    strokeWidth={1}
                    size={30} />
            }
        </Pressable>
    )
}


export default function RecommendedSets() {

    const slice = setList.slice(0, 20)
    return (
        <View className="gap-8 mx-6   ">
            <Text className="text-2xl font-semibold ">
                En base a tus sets
            </Text>
            <View className="items-center  gap-6">
                {
                    slice.map(({ likeStatus, ...props }) =>
                        <SetCard
                            key={props.id}
                            {...props}
                            bodyProps={{
                                className: "h-full p-6 justify-center",
                                style: {
                                    marginTop: 20
                                }
                            }}
                            style={{
                                maxHeight: 200,
                                height: 140
                            }}
                            className="min-w-full "
                            title={<SetCardHeart likeStatus={!!likeStatus} />}
                        />
                    )
                }
            </View>
            <Button className="" >
                <Text className="text-xl  text-white font-semibold">Cargar más</Text>
            </Button>
        </View>
    )
}
