import Checkbox from "@/components/Checkbox.component";
import { router } from "expo-router";
import { memo } from "react";
import { Modal, SafeAreaView, Text, View } from "react-native";
import EmojiModal from "react-native-emoji-modal";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetInput from "../components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "../components/SetManagerWrapper.component";
import useSetCreationStore from "../store/useSetManagerStore.store";

const NameInput = () => {

    const name = useSetCreationStore((store) => store.setDraft.name)
    const updateSet = useSetCreationStore((store) => store.updateSet)

    return (
        <SetInput
            inputProps={{
                value: name,
                onChangeText: (e) => updateSet({ name: e }),
                placeholder: "Ingresa un nombre"
            }}
        />
    )
}

type EmojiOutput = string | null

interface EmojiSelectorProps {
    idx: number
    onEmojiSelect: (e: EmojiOutput, idx: number) => void
    emoji: EmojiOutput
}


const EmojiSelector = memo(({
    emoji,
    idx
}: EmojiSelectorProps) => {

    const onEmojiSelectWithIdx = useSetCreationStore(state => state.updateSet)

    return (
        <SafeAreaView>
            <Modal
                visible={true}
                animationType="slide"
                transparent={true}>
                <EmojiModal
                    containerStyle={{
                        width: "100%",
                        alignItems: "center",
                        margin: "auto",
                        gap: "8px",
                        borderRadius: 0,
                    }}
                    scrollStyle={{
                        width: "100%",
                    }}
                    searchStyle={{
                        display: "none"
                    }}

                    modalStyle={{
                        position: "absolute",
                        bottom: "0%",
                        width: "100%",
                    }}
                    emojiSize={35}
                    columns={8}
                    onEmojiSelected={(e) => {
                    }}
                />
            </Modal>
        </SafeAreaView>
    )
})

const EmojiSelectors = () => {

    const emojis = useSetCreationStore(state => state.setDraft.emojis)

    return (
        <View className="gap-2">
            <View className="flex-row gap-4">
                {/* {
                    emojis.map((i, idx) =>
                        <EmojiSelector
                            key={idx}
                            idx={idx}
                            emoji={i}
                        />
                    )
                } */}
            </View>
        </View>
    )
}


const SetVisilibity = () => {

    const visibility = useSetCreationStore((store) => store.setDraft.visibility)
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

    const name = useSetCreationStore((store) => store.setDraft.name)
    const nextStepAllowed = !!name

    return <NextButton
        nextStepAllowed={nextStepAllowed}
        onPress={() => router.navigate("./setMoreDetails")}
    />
}

const Content = () => {
    return (
        <View className="flex-1 justify-between ">
            <View className="gap-3">
                <NameInput />
                <EmojiSelectors />
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