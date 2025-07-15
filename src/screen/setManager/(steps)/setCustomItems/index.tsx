
import { router } from "expo-router"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import NextButton from "../../components/NextButton.component"
import SetImageBackground from "../../components/SetImageBackground.component"
import SetManagerWrapper from "../../components/SetManagerWrapper.component"
import useSetManagerMode from "../../hook/useSetManagerMode.hook"
import useSetManagerStore from "../../store/useSetManagerStore.store"
import AddItem from "./components/AddItem.component"
import ViewAddedItems from "./components/ViewAddedItems.component"

const Button = () => {
    const itemsLength = useSetManagerStore(state => state.items.length)
    const { setManagerMode } = useSetManagerMode()
    return <NextButton
        nextStepAllowed={itemsLength > 0}
        onPress={() => router.dismissTo("/user/1/setInfo/1")}
        text={setManagerMode == "create" ? "Finalizar" : "Guardar cambios"} />
}

const Content = () => {

    return (
        <View className="flex-1 gap-3 justify-between">
            <AddItem />
            <ViewAddedItems />
        </View>
    )
}

export default function SetCustomItem() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SetManagerWrapper >
                <SetImageBackground
                    className="h-[100px]"
                    source={require("@/assets/images/itemCustom.png")} />
                <Content />
                <Button />
            </SetManagerWrapper>
        </TouchableWithoutFeedback>
    )
}