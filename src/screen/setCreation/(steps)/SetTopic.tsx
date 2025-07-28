
import { router } from "expo-router";
import { View } from "react-native";
import useSetCreationStore from "../../../store/useSetManagerStore.store";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetInput from "../components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "../components/SetManagerWrapper.component";


const Content = () => {
    const topic = useSetCreationStore((store) => store.setConfig.topic)
    const setTopic = useSetCreationStore((store) => store.updateSet)

    return (
        <View className="justify-between flex-1">
            <SetInput
                inputProps={{
                    value: topic,
                    onChangeText: (e) => setTopic({ topic: e }),
                    placeholder: "¿De qué tópico quieres hablar?"
                }}
            />
            <NextButton
                onPress={() => router.navigate("./SetDetails")}
                text={"Empezar"}
                nextStepAllowed={topic.length > 0}
            />
        </View>
    )
}

export default function SetTopic() {

    return (
        <SetManagerWrapperWithSafeKeyboard>
            <SetImageBackground
                className="h-[360px]"
                source={require("@/assets/images/setTopic.png")} />
            <Content />
        </SetManagerWrapperWithSafeKeyboard>
    )
}