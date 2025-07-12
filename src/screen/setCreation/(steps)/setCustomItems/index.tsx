import Accordion from "@/components/Accordion.component"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import NextButton from "../../components/NextButton.component"
import SetImageBackground from "../../components/SetImageBackground.component"
import SetManagerWrapper from "../../components/SetManagerWrapper.component"
import useSetCreationStore from "../../store/SetCreation.store"
import AddItem from "./components/AddItem.component"
import ViewAddedItems from "./components/ViewAddedItems.component"

const Button = () => {
    const itemsLength = useSetCreationStore(state => state.items.length)
    return <NextButton
        nextStepAllowed={itemsLength > 0}
        href={"/profile"}
        text="Finalizar" />
}

const Content = () => {

    return (
        <View className="flex-1 gap-3 justify-between">
            <Accordion defaultOpen>
                <AddItem />
                <ViewAddedItems />
            </Accordion>
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