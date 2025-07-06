import BackButton from "@/components/BackHeader.component"
import { View } from "react-native"
import SetManagerBackgroundImage from "./components/SetBackgroundImage.component"
import SetInput from "./components/SetInput.component"



export default function SetManagerScreen() {

    return (
        <View className="gap-8">
            <BackButton />
            <SetManagerBackgroundImage />
            <SetInput />
        </View>
    )
}