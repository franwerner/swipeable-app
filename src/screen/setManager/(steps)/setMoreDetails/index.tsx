import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { router } from "expo-router"
import { View } from "react-native"
import NextButton from "../../components/NextButton.component"
import SetImageBackground from "../../components/SetImageBackground.component"
import SetManagerWrapper from "../../components/SetManagerWrapper.component"
import useSetManagerMode from "../../hook/useSetManagerMode.hook"
import ColorInput from "./components/ColorInput.component"
import DescriptionInput from "./components/DescriptionInput.component"



const Content = () => {
    const { setManagerMode } = useSetManagerMode()
    return (
        <View className="gap-4 flex-1 justify-between">
            <ColorInput />
            <DescriptionInput />
            <NextButton
                nextStepAllowed
                onPress={() => router.navigate("/setManager/SetItems")}
                text={setManagerMode === "create" ? "Siguiente" : "Guardar cambios"}
            />
        </View>
    )
}

export default function setMoreDetails() {
    return (
        <BottomSheetModalProvider>
            <SetManagerWrapper>
                <SetImageBackground
                    className="h-[360px]"
                    source={require("@/assets/images/setName.png")} />
                <Content />
            </SetManagerWrapper>
        </BottomSheetModalProvider>
    )
}