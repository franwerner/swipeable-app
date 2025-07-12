
import { router } from "expo-router";
import { View } from "react-native";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetInput from "../components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "../components/SetManagerWrapper.component";
import useSetCreationStore from "../store/SetCreation.store";


const Content = () => {
    const topic = useSetCreationStore((store) => store.topic)
    const setTopic = useSetCreationStore((store) => store.addTopic)

    return (
        <View className="justify-between flex-1">
            <SetInput
                inputProps={{
                    value: topic,
                    onChangeText: setTopic,
                    placeholder: "¿De qué tópico quieres hablar?"
                }}
            />
            <NextButton
                onPress={() => router.navigate("/setCreation/SetDetails")}
                text={"Empezar"}
                nextStepAllowed={topic.length > 0}
            />
        </View>
    )
}

export default function SetTopic() {
    return (
        <SetManagerWrapperWithSafeKeyboard
            contentContainerClassName="flex-1"
        >
            <SetImageBackground
                className="h-[360px]"
                source={require("@/assets/images/setTopic.png")} />
            <Content />
        </SetManagerWrapperWithSafeKeyboard>
    )
}