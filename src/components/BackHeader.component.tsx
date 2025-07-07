import AnimatedTap from "@/components/AnimatedTap.component";
import { useRouter } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import CircleDecoration from "../ui-components/CircleDecoration.ui-component";


export default function BackHeader() {

    const { back } = useRouter()

    return (
        <View className="mx-6 pt-6 flex-row items-center">
            <AnimatedTap onPress={() => back()}>
                <CircleDecoration>
                    <ChevronLeftIcon color={"#443976"} />
                </CircleDecoration>
            </AnimatedTap>
            <Text className="text-center text-2xl flex-1 font-bold mr-[60px]">Swipeable</Text>
        </View>
    )
}
