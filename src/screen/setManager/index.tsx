import BackButton from "@/components/BackHeader.component"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SetManagerBackgroundImage from "./components/SetBackgroundImage.component"
import SetInput from "./components/SetInput.component"



export default function SetManagerScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View className="gap-8" style={{ marginTop: insets.top }}>
            <BackButton />
            <SetManagerBackgroundImage />
            <SetInput />
        </View>
    )
}