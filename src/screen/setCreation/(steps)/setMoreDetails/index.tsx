import { router } from "expo-router"
import { View } from "react-native"
import NextButton from "../../components/NextButton.component"
import SetImageBackground from "../../components/SetImageBackground.component"
import { SetManagerWrapperWithSafeKeyboard } from "../../components/SetManagerWrapper.component"
import ColorInput from "./components/ColorInput.component"



const Content = () => {
    return (
        <View className="gap-4 flex-1 justify-between">
            <ColorInput />
            {/* <DescriptionInput /> */}
            <NextButton
                nextStepAllowed
                onPress={() => router.navigate("./SetItems")}
                text={"Siguiente"}
            />
        </View>
    )
}

export default function setMoreDetails() {
    return (
        <SetManagerWrapperWithSafeKeyboard>
            <SetImageBackground
                className="h-[360px]"
                source={require("@/assets/images/setDetails.jpg")} />
            <Content />
        </SetManagerWrapperWithSafeKeyboard>
    )
}