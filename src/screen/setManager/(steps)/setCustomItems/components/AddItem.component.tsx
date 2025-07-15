import AnimatedTap from "@/components/AnimatedTap.component"
import Container from "@/components/Container.component"
import Input from "@/components/Input.component"
import colorPalette from "@/constant/colorPalette.constant"
import useSetCreationStore from "@/screen/setManager/store/useSetManagerStore.store"
import SetItem from "@/types/SetItemInteface.type"
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


function useSetItem(defaultSetItem: Omit<SetItem, "id" | "visibility"> = { emoji: "", title: "" }) {

    const [item, setItem] = useState(defaultSetItem)

    const onChangeTitle = (value: string) => {
        const emojiMatch = value.match(emojiRegex)
        if (emojiMatch) {
            setItem(prev => ({ ...prev, emoji: emojiMatch[0] }))
        }
        setItem(prev => ({ ...prev, title: value.replace(emojiRegex, "") }))
    }

    const onChangeEmoji = (value: string) => {
        const emojiMatch = value.length == 0 ? value : (value.match(emojiRegex)?.[0])
        if (emojiMatch !== undefined) {
            setItem(prev => ({ ...prev, emoji: emojiMatch }))
        }
    }
    return {
        item,
        onChangeEmoji,
        onChangeTitle
    }
}


export default function AddItem() {

    const addItem = useSetCreationStore(store => store.addItem)

    const { item, onChangeEmoji, onChangeTitle } = useSetItem()
    const { emoji, title } = item

    const hasValues = !!(emoji && title)

    const handleAddItem = () => {
        if (!hasValues) return
        addItem({ title, emoji, id: nanoid(), visibility: "public" })
        onChangeEmoji("")
        onChangeTitle("")
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
                    onChangeText: onChangeTitle,
                    placeholder: "¡Prueba con texto y un emoji!",
                }}
                endComponent={
                    <TextInput
                        className="px-3 text-2xl"
                        placeholder="❓"
                        value={emoji}
                        onChangeText={onChangeEmoji}
                    />
                }
            />
        </View>
    )
}
