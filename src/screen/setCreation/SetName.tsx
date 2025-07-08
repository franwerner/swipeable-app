import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import Checkbox from "./components/Checkbox.component";
import NextButton from "./components/NextButton.component";
import SetImageBackground from "./components/SetImageBackground.component";
import SetInput from "./components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "./components/SetManagerWrapper.component";
import normalizeQueryParam from "./utils/normalizeQueryParam.util";


const NameInput = () => {

    const {
        name
    } = useLocalSearchParams()
    const router = useRouter()

    const setValue = (name: string) => {
        router.setParams({ name: name })
    }

    return (
        <SetInput
            inputProps={{
                value: normalizeQueryParam(name),
                onChangeText: setValue,
                placeholder: "Ingresa un nombre"
            }}
        />
    )
}

const PublicList = () => {

    const {
        visibility
    } = useLocalSearchParams()

    const router = useRouter()

    const isPublic = visibility == "public"

    const setValue = () => {
        router.setParams({ visibility: isPublic ? undefined : "public" })
    }

    return (
        <View className="flex-row items-center gap-2">
            <Checkbox
                onPress={setValue}
                isActive={isPublic} />
            <Text className="text-primary-800 text-[16px] font-semibold">Lista pública</Text>
        </View>
    )
}

const Button = () => {
    const {
        name
    } = useLocalSearchParams()

    return <NextButton
        nextStepAllowed={normalizeQueryParam(name)?.length > 0}
        href={"/setCreation/SetItemList"} />
}

const Content = () => {
    return (
        <View className="flex-1 justify-between ">
            <View className="gap-6">
                <NameInput />
                <PublicList />
            </View>
            <Button />
        </View>
    )
}

export default function SetName() {


    return (
        <SetManagerWrapperWithSafeKeyboard>
            <SetImageBackground
                className="h-[360px]"
                source={require("@/assets/images/setName.png")} />
            <Content />
        </SetManagerWrapperWithSafeKeyboard>
    )
}