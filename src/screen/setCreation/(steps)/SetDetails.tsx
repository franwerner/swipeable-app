import AnimatedTap from "@/components/AnimatedTap.component";
import Checkbox from "@/components/Checkbox.component";
import colorPalette from "@/constant/colorPalette.constant";
import { router } from "expo-router";
import { SmilePlus } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import EmojiPicker from 'rn-emoji-keyboard';
import useSetManagerStore from "../../../store/useSetManagerStore.store";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetInput from "../components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "../components/SetManagerWrapper.component";

const NameInput = () => {

    const name = useSetManagerStore((store) => store.setConfig.name)
    const updateSet = useSetManagerStore((store) => store.updateSet)

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

const EmojiSelectors = () => {
    const emojis = useSetManagerStore(state => state.setConfig.emojis)
    const updateSet = useSetManagerStore(state => state.updateSet)

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const onEmojiSelected = ({ emoji }: { emoji: string }) => {
        if (selectedIndex === null) return
        const copied = [...emojis]
        copied.splice(selectedIndex, 1, emoji)
        updateSet({ emojis: copied })
        setSelectedIndex(null)
    }

    return (
        <View>
            <SafeAreaView>
                <EmojiPicker
                    onEmojiSelected={onEmojiSelected}
                    hideHeader
                    open={selectedIndex !== null}
                    onClose={() => setSelectedIndex(null)}
                    selectedEmojis={emojis}
                    emojiSize={28}
                />
            </SafeAreaView>
            <View className="flex-row gap-4">
                {emojis.map((emoji, index) => (
                    <AnimatedTap
                        key={index}
                        onPress={() => setSelectedIndex(index)}>
                        <View
                            className={`rounded-full justify-center items-center border-1  bg-white border`}
                            style={{
                                width: 48,
                                height: 48,
                                borderColor: emoji ? colorPalette.primary[500] : colorPalette.secondary[500]
                            }}
                        >
                            {emoji ?
                                <Text className="text-[24px]">{emoji}</Text> :
                                <SmilePlus size={24} color={colorPalette.secondary[600]} />
                            }
                        </View>
                    </AnimatedTap>
                ))}
            </View>
        </View>
    )
}

const SetVisilibity = () => {

    const visibility = useSetManagerStore((store) => store.setConfig.visibility)
    const toggleVisibility = useSetManagerStore((store) => store.toggleVisibility)
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

    const name = useSetManagerStore((store) => store.setConfig.name)
    const emojis = useSetManagerStore((store) => store.setConfig.emojis.every(Boolean))

    const nextStepAllowed = !!name && emojis

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
                source={require("@/assets/images/setDetails.jpg")} />
            <Content />
        </SetManagerWrapperWithSafeKeyboard>
    )
}