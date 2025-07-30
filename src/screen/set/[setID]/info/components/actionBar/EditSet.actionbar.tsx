import AnimatedTap from "@/components/AnimatedTap.component"
import Button from "@/components/Button.component"
import Dropdown from "@/components/Dropdown.component"
import Input from "@/components/Input.component"
import SetColorPicker from "@/components/SetColorPicker.component"
import colorPalette from "@/constant/colorPalette.constant"
import useSetManagerStore from "@/store/useSetManagerStore.store"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Palette, Pencil, SmilePlus, Type } from "lucide-react-native"
import React, { useEffect, useRef, useState } from "react"
import { Modal, SafeAreaView, Text, TouchableNativeFeedback, View } from "react-native"
import { EmojiKeyboard } from "rn-emoji-keyboard"
import { useShallow } from "zustand/shallow"

type ModalMode = "detail" | "emoji" | "color"


const useSetModalMode = () => {

    const { setParams } = useRouter()

    const setModalParams = (mode?: ModalMode) => {
        setParams({
            modalMode: mode
        })
    }

    return setModalParams
}

interface DropdownAction {
    handleOpen: () => void
}

const DropdownAction = () => {

    const setMode = useSetModalMode()

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <View
                    className="flex-row gap-2 p-3 px-4 items-center bg-primary-100 rounded-[100px]">
                    <Pencil size={25} color={colorPalette.primary[800]} />
                    <Text className="text-[14px] text-primary-800">Editar</Text>
                </View>
            </Dropdown.Trigger>
            <Dropdown.Menu className="p-2 mt-2 gap-2 bg-white ">
                <Dropdown.Item
                    onPress={() => setMode("detail")}
                    className="flex-row items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary-100">
                    <Type
                        size={22}
                        color={colorPalette.primary[600]} />
                    <Text className="text-[16px] text-secondary-800">Texto</Text>
                </Dropdown.Item>
                <Dropdown.Item
                    onPress={() => setMode("emoji")}
                    className="flex-row items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary-100">
                    <SmilePlus size={22} color={colorPalette.primary[600]} />
                    <Text className="text-[16px] text-secondary-800">Emojis</Text>
                </Dropdown.Item>
                <Dropdown.Item
                    onPress={() => setMode("color")}
                    className="flex-row items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary-100">
                    <Palette size={22} color={colorPalette.primary[600]} />
                    <Text className="text-[16px] text-secondary-800">Colores</Text>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}


const EditDetailsModal = () => {

    const setMode = useSetModalMode()

    const storeValues = useSetManagerStore(useShallow(store => ({
        description: store.setConfig.description,
        name: store.setConfig.name
    })))

    const [values, setValues] = useState(storeValues)

    const { description, name } = values

    const hasValues = name

    const onChangeValues = (newValues: Partial<typeof values>) => {
        setValues(prev => ({ ...prev, ...newValues }))
    }

    const updateSet = useSetManagerStore((store) => store.updateSet)

    const applyChanges = () => {
        updateSet(values)
        setMode()
    }

    return (
        <SafeAreaView>
            <Modal
                visible={true}
                animationType="fade"
                transparent>
                <TouchableNativeFeedback onPress={() => setMode()} >
                    <View className="flex-1 justify-center items-center bg-black/40 px-6">
                        <View
                            onStartShouldSetResponder={() => true}
                            className="bg-white gap-4 rounded-2xl p-5 w-full">
                            <Text className="text-xl font-semibold text-primary-700">Editar Detalles</Text>
                            <Input
                                isActive={!!name}
                                inputProps={{
                                    placeholder: "Nombre",
                                    value: name,
                                    onChangeText: (name) => onChangeValues({ name })
                                }}
                            />
                            <Input
                                isActive={!!description}
                                className="!h-[150px] py-2 px-4"
                                inputProps={{
                                    value: description,
                                    multiline: true,
                                    textAlignVertical: 'top',
                                    numberOfLines: 4,
                                    maxLength: 255,
                                    placeholder: "Describe el set",
                                    className: "h-full",
                                    onChangeText: (description) => onChangeValues({ description })
                                }}
                            />
                            <Button
                                style={{
                                    opacity: hasValues ? 1 : 0.5
                                }}
                                disabled={!hasValues}
                                onPress={applyChanges}>
                                <Text className="text-white font-semibold">Guardar cambios</Text>
                            </Button>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </Modal>
        </SafeAreaView>
    )
}

const EditColorModal = () => {

    const setMode = useSetModalMode()

    const {
        colors: storeColors,
        emojis,
        items_count,
        name,
        userBy
    } = useSetManagerStore(store => store.setConfig)

    const [colors, setColors] = useState(storeColors)

    const updateSet = useSetManagerStore(store => store.updateSet)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const applyChanges = () => {
        updateSet({ colors })
        setMode()
    }

    useEffect(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    return (
        <SetColorPicker
            snapPoints={["95%"]}
            onDismiss={() => {
                setMode()
            }}
            ref={bottomSheetModalRef}
            colors={colors}>
            <SetColorPicker.Body>
                <SetColorPicker.Toggle />
                <SetColorPicker.Preview cardProps={{
                    avatarUrl: userBy.avatarUrl,
                    nickname: userBy.nickname,
                    emojis,
                    items_count,
                    name
                }} />
                <SetColorPicker.Color onChangeColor={(colors) => setColors(colors)} />
                <Button
                    onPress={applyChanges}
                    className="w-full">
                    <Text className="text-white font-semibold">Guardar cambios</Text>
                </Button>
            </SetColorPicker.Body>
        </SetColorPicker>
    )
}

const EditEmojisModal = () => {


    const setMode = useSetModalMode()

    const emojisStore = useSetManagerStore(store => store.setConfig.emojis)

    const [emojis, setEmojis] = useState({
        list: emojisStore,
        selectedIndex: 0
    })

    const updateSet = useSetManagerStore(store => store.updateSet)

    const onEmojiSelected = ({ emoji }: { emoji: string }) => {
        setEmojis(prev => {
            const copied = [...prev.list]
            copied.splice(prev.selectedIndex, 1, emoji)
            return {
                ...prev,
                list: copied
            }
        })
    }

    const setSelectedIndex = (n: number) => {
        setEmojis(prev => ({ ...prev, selectedIndex: n }))
    }

    const applyChanges = () => {
        updateSet({
            emojis: emojis.list
        })
        setMode()
    }

    return (
        <SafeAreaView>
            <Modal
                visible={true}
                animationType="fade"
                transparent>
                <TouchableNativeFeedback onPress={() => setMode()} >
                    <View className="flex-1 justify-center items-center gap-6 bg-black/40 px-6">
                        <View onStartShouldSetResponder={() => true}>
                            <EmojiKeyboard
                                styles={{
                                    container: { maxHeight: 250 }
                                }}
                                disableSafeArea
                                hideHeader
                                onEmojiSelected={({ emoji }) => {
                                    onEmojiSelected({ emoji })
                                }}
                            />
                        </View>
                        <View
                            onStartShouldSetResponder={() => true}
                            className=" rounded-2xl w-full bg-white p-4 gap-6">
                            <View className="bg-white p-2 gap-6 rounded-2xl w-full">
                                <View className="flex-row gap-4 justify-center">
                                    {emojis.list.map((emoji, index) => (
                                        <AnimatedTap
                                            key={index}
                                            onPress={() => setSelectedIndex(index)}>
                                            <View
                                                className="rounded-full justify-center items-center border bg-white"
                                                style={{
                                                    width: 52,
                                                    height: 52,
                                                    transform: [{ scale: emojis.selectedIndex === index ? 1.3 : 0.9 }],
                                                    borderColor: emoji ? colorPalette.primary[500] : colorPalette.secondary[500]
                                                }}
                                            >
                                                <Text className="text-[24px]">{emoji}</Text>
                                            </View>
                                        </AnimatedTap>
                                    ))}
                                </View>
                                <Button onPress={applyChanges}>
                                    <Text className="text-white font-semibold">Guardar cambios</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </Modal>
        </SafeAreaView>
    )
}

const setModeComponent: Record<ModalMode, () => React.JSX.Element> = {
    color: () => <EditColorModal />,
    detail: () => <EditDetailsModal />,
    emoji: () => <EditEmojisModal />,
}

export default function EditSet() {
    const { modalMode } = useLocalSearchParams<{ modalMode: ModalMode }>()

    return (
        <View>
            {modalMode && setModeComponent[modalMode]()}
            <DropdownAction />
        </View>
    );
}