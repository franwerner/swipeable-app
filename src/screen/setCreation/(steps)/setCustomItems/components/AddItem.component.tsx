import AnimatedTap from "@/components/AnimatedTap.component"
import Container from "@/components/Container.component"
import Input from "@/components/Input.component"
import colorPalette from "@/constant/colorPalette.constant"
import useSetCreationStore from "@/screen/setCreation/store/SetCreation.store"
import { Plus } from "lucide-react-native"
import { nanoid } from "nanoid/non-secure"
import { memo, useState } from "react"
import { Keyboard, Text, TextInput, View } from "react-native"

const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

const AddItemButton = memo(() => {
    return (
        <Container>
            <Text className="color-primary-800 font-semibold text-[16px]">
                Añadir item personalizado
            </Text>
            <Plus
                color={colorPalette.primary["800"]}
                size={24} />
        </Container>
    )
})

export default function AddItem() {

    const addItem = useSetCreationStore(store => store.addItem)

    const [title, setTitle] = useState("")
    const [emoji, setEmoji] = useState("")

    const hasValues = !!(emoji && title)

    const handleInputChange = (value: string) => {
        const emojiMatch = value.match(emojiRegex)
        if (emojiMatch) {
            setEmoji(emojiMatch[0])
        }
        setTitle(value.replace(emojiRegex, ""))
    }

    const hadleInputEmojiChange = (value: string) => {
        const emojiMatch = value.match(emojiRegex)
        if (emojiMatch) {
            setEmoji(emojiMatch[emojiMatch.length - 1])
        } else if (value.length == 0) {
            setEmoji("")
        }
    }

    const handleAddItem = () => {
        if (!hasValues) return
        addItem({ title, emoji, id: nanoid() })
        setTitle("")
        setEmoji("")
        Keyboard.dismiss()
    }

    return (
        <View className="gap-3">
            <AnimatedTap
                onPress={handleAddItem}>
                <AddItemButton />
            </AnimatedTap>
            <Input
                className="pr-3"
                isActive={hasValues}
                inputProps={{
                    value: title,
                    onChangeText: handleInputChange,
                    placeholder: "¡Prueba con texto y un emoji!",
                }}
                endComponent={
                    <TextInput
                        className="px-3 text-2xl"
                        placeholder="❓"
                        value={emoji}
                        onChangeText={hadleInputEmojiChange}
                    />
                }
            />
        </View>
    )
}
