import Button from "@/components/Button.component"
import Input from "@/components/Input.component"
import colorPalette from "@/constant/colorPalette.constant"
import { SmilePlus } from "lucide-react-native"
import { useState } from "react"
import { Modal, SafeAreaView, Text, TouchableWithoutFeedback, View } from "react-native"
import { EmojiKeyboard } from "rn-emoji-keyboard"

interface SimpleItem {
    emoji: string
    title: string
}

type Mode = "edit" | "add"

const MessageForMode: Record<Mode, string> = {
    "edit": "Guardar Cambios",
    "add": "Agregar nuevo item"
}
interface ModalItemHandlerProps {
    handleItemChange: (p: SimpleItem) => void
    defaultItem?: SimpleItem
    mode: "edit" | "add"
    handleClose: () => void
}

export default function ModalItemHandler({
    handleItemChange,
    defaultItem = {
        emoji: "",
        title: ""
    },
    handleClose,
    mode
}: ModalItemHandlerProps) {

    const [value, setValue] = useState(defaultItem)

    const onChangeValue = (values: Partial<{ emoji: string, title: string }>) => {
        setValue(prev => ({ ...prev, ...values }))
    }

    const hasValues = !!(value.emoji && value.title)


    return (
        <SafeAreaView>
            <Modal
                visible={true}
                animationType="fade"
                transparent>
                <TouchableWithoutFeedback onPress={handleClose}>
                    <View className="flex-1 justify-center items-center gap-6 bg-black/40 px-6">
                        <View onStartShouldSetResponder={() => true}>
                            <EmojiKeyboard
                                hideHeader
                                onEmojiSelected={({ emoji }) => onChangeValue({ emoji })}
                                styles={{
                                    container: {
                                        maxHeight: 250
                                    }
                                }}
                            />
                        </View>
                        <View
                            onStartShouldSetResponder={() => true}
                            className=" rounded-2xl w-full bg-white p-6 gap-6">
                            <View className="bg-white flex-row gap-3 items-center">
                                <Input
                                    isActive={hasValues}
                                    className="flex-1"
                                    inputProps={{
                                        onChangeText: (title) => onChangeValue({ title }),
                                        value: value.title,
                                    }}
                                    endComponent={
                                        value.emoji ?
                                            <Text className="text-2xl">{value.emoji}</Text> :
                                            <SmilePlus size={24} color={colorPalette.primary[800]} />
                                    }
                                />
                            </View>
                            <Button
                                style={{
                                    opacity: hasValues ? 1 : 0.5,
                                }}
                                disabled={!hasValues}
                                onPress={() => {
                                    handleItemChange(value)
                                    if (mode == "add") {
                                        setValue({
                                            emoji: "",
                                            title: ""
                                        })
                                    }
                                }}
                                className=" py-3"
                            >
                                <Text className="text-white text-center font-semibold text-base">
                                    {MessageForMode[mode]}
                                </Text>
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    )
}