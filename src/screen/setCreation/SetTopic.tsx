
import { useLocalSearchParams, useRouter } from "expo-router";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import NextButton from "./components/NextButton.component";
import SetImageBackground from "./components/SetImageBackground.component";
import SetInput from "./components/SetInput.component";
import SetManagerWrapper from "./components/SetManagerWrapper.component";
import normalizeQueryParam from "./utils/normalizeQueryParam.util";


const Content = () => {

    const {
        topic,
    } = useLocalSearchParams()

    const navigation = useRouter()

    const setValue = (topic: string) => {
        navigation.setParams({ topic: topic })
    }

    const normalizedTopic = normalizeQueryParam(topic)
    return (
        <View className="justify-between flex-1">
            <SetInput
                inputProps={{
                    value: normalizedTopic,
                    onChangeText: setValue,
                    placeholder: "¿De qué tópico quieres hablar?"
                }}
            />
            <NextButton
                href={"/setCreation/SetName"}
                text={"Empezar"}
                nextStepAllowed={normalizedTopic.length > 0}
            />
        </View>
    )
}

export default function SetTopic() {
    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}>
            <SetManagerWrapper>
                <SetImageBackground
                    className="h-[360px]"
                    source={require("@/assets/images/setTopic.png")} />
                <Content />
            </SetManagerWrapper>
        </TouchableWithoutFeedback>
    )
}