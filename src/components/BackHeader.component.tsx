import AnimatedTap from "@/components/AnimatedTap.component";
import clsx from "clsx";
import { useRouter } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { Platform, Text, View } from "react-native";
import CircleDecoration from "../ui-components/CircleDecoration.ui-component";

export default function BackHeader() {

    const { back } = useRouter()

    return (
        <View
            className={clsx(
                "mx-6 flex-row items-center",
                Platform.OS === "android" && "pt-6"
            )}>
            <AnimatedTap onPress={() => back()}>
                <CircleDecoration>
                    <ChevronLeftIcon color={"#443976"} />
                </CircleDecoration>
            </AnimatedTap>
            <Text className="text-center text-2xl flex-1 font-bold mr-[60px]">Swipeable</Text>
        </View>
    )
}
