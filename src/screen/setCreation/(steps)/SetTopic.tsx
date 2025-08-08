
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import useSetCreationStore from "../../../store/useSetManagerStore.store";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetInput from "../components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "../components/SetManagerWrapper.component";


const Content = () => {
    const topic = useSetCreationStore((store) => store.setConfig.topic)
    const setTopic = useSetCreationStore((store) => store.updateSet)

    return (
        <KeyboardAwareScrollView
            bottomOffset={22}
            className="pt-[360px]"
            contentContainerClassName="flex-grow justify-between">
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
        </KeyboardAwareScrollView>
    )
}

export default function SetTopic() {

    return (
        <SetManagerWrapperWithSafeKeyboard>
            <SetImageBackground
                className="h-[360px] absolute"
                source={require("@/assets/images/setCreation.jpg")} />
            <Content />
        </SetManagerWrapperWithSafeKeyboard>
    )
}