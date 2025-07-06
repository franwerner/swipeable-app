import AnimatedTap from "@/components/AnimatedTap.component";
import { Href, useRouter } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import CircleDecoration from "../ui-components/CircleDecoration.ui-component";

interface BackHeaderProps {
    path?: Href
}

export default function BackHeader({ path = "/home" }: BackHeaderProps) {

    const { navigate } = useRouter()

    return (
        <View className="mt-6 mx-6 flex-row items-center">
            <AnimatedTap onPress={() => navigate(path)}>
                <CircleDecoration>
                    <ChevronLeftIcon color={"#443976"} />
                </CircleDecoration>
            </AnimatedTap>
            <Text className="text-center text-2xl flex-1 font-bold mr-[60px]">Swipeable</Text>
        </View>
    )
}