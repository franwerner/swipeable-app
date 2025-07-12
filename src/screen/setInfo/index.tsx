import AnimatedTap from "@/components/AnimatedTap.component";
import BackHeader from "@/components/BackHeader.component";
import colorPalette from "@/constant/colorPalette.constant";
import CircleDecoration from "@/ui-components/CircleDecoration.ui-component";
import { Heart } from "lucide-react-native";
import { View } from "react-native";



export default function SetInfo() {

    return (
        <View className="">
            <BackHeader
                endComponent={
                    <AnimatedTap>
                        <CircleDecoration>
                            <Heart size={24} color={colorPalette.primary["800"]} />
                        </CircleDecoration>
                    </AnimatedTap>
                }
            />
        </View>
    )
}