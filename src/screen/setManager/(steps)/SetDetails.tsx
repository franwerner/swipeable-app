import Checkbox from "@/components/Checkbox.component";
import { router } from "expo-router";
import { Text, View } from "react-native";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetInput from "../components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "../components/SetManagerWrapper.component";
import useSetCreationStore from "../store/useSetManagerStore.store";


const NameInput = () => {

    const name = useSetCreationStore((store) => store.name)
    const addName = useSetCreationStore((store) => store.addName)

    return (
        <SetInput
            inputProps={{
                value: name,
                onChangeText: addName,
                placeholder: "Ingresa un nombre"
            }}
        />
    )
}


const SetVisilibity = () => {

    const visibility = useSetCreationStore((store) => store.visibility)
    const toggleVisibility = useSetCreationStore((store) => store.toggleVisibility)
    const isPublic = visibility == "public"

    return (
        <View className="flex-row items-center gap-2">
            <Checkbox
                onPress={toggleVisibility}
                isActive={isPublic} />
            <Text className="text-primary-800 text-[16px] font-semibold">Lista pública</Text>
        </View>
    )
}

const Button = () => {

    const name = useSetCreationStore((store) => store.name)
    const nextStepAllowed = !!name

    return <NextButton
        nextStepAllowed={nextStepAllowed}
        onPress={() => router.navigate("/setManager/setMoreDetails")}
    />
}

const Content = () => {
    return (
        <View className="flex-1 justify-between ">
            <View className="gap-6 ">
                <NameInput />
                <SetVisilibity />
            </View>
            <Button />
        </View>
    )
}

export default function SetDetails() {
    return (
        <SetManagerWrapperWithSafeKeyboard>
            <SetImageBackground
                className="h-[360px]"
                source={require("@/assets/images/setName.png")} />
            <Content />
        </SetManagerWrapperWithSafeKeyboard>
    )
}