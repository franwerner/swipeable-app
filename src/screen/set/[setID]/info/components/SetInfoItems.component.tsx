import Button from "@/components/Button.component";
import Dropdown from "@/components/Dropdown.component";
import Input from "@/components/Input.component";
import colorPalette from "@/constant/colorPalette.constant";
import useSetManagerStore from "@/store/useSetManagerStore.store";
import SetItem from "@/types/SetItemInteface.type";
import { EllipsisVertical, Eye, EyeOff, GripHorizontal, LucideIcon, Pencil, Trash } from "lucide-react-native";
import { memo, ReactNode, useEffect, useState } from "react";
import { Modal, Pressable, SafeAreaView, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearTransition } from "react-native-reanimated";
import ReorderableList, { ReorderableListReorderEvent, reorderItems, useIsActive, useReorderableDrag } from "react-native-reorderable-list";
import { EmojiKeyboard } from "rn-emoji-keyboard";

const DropdownSetItem = ({ children }: { children: ReactNode }) => {
    return (
        <Dropdown>
            <Dropdown.Trigger className="pl-3 h-full justify-center">
                <EllipsisVertical
                    size={24}
                    color={colorPalette.primary[800]} />
            </Dropdown.Trigger>
            <Dropdown.Menu className="p-5 gap-5">
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}


interface DropdownItemAction {
    label: string
    Icon: LucideIcon
    action: VoidFunction
}

const DropdownItemAction = ({
    Icon,
    label,
    action
}: DropdownItemAction) => {
    return (
        <Dropdown.Item
            onPress={action}
            className="flex-row gap-16 justify-between">
            <Text className="text-[16px] font-medium color-primary-800">{label}</Text>
            <Icon size={24} color={colorPalette.primary[800]} />
        </Dropdown.Item>
    )
}


const Item = memo(({
    ...defaultItem
}: SetItem) => {

    const { emoji, title, itemID, visibility } = defaultItem

    const toggleItem = useSetManagerStore(state => state.toggleItem)
    const updateItem = useSetManagerStore(state => state.updateItem)
    const isItemInEdit = useSetManagerStore(state => state.itemInEdit?.itemID === itemID)
    const toggleItemEdit = useSetManagerStore(state => state.toggleItemEdit)

    const handleVisibility = () => {
        updateItem({
            itemID: itemID,
            visibility: defaultItem.visibility === "public" ? "private" : "public"
        })
    }

    const isPrivate = visibility == "public"
    const drag = useReorderableDrag()
    const isDrag = useIsActive()

    return (
        <Pressable onLongPress={drag}>
            <View
                style={{
                    backgroundColor: isDrag || isItemInEdit ? colorPalette.primary[50] : "transparent",
                    borderRadius: 16,
                    overflow: "hidden",
                }}
                className="flex-row gap-4  px-3 justify-between items-center">
                {isDrag && <GripHorizontal
                    size={28}
                    color={colorPalette.primary[800]} />}
                <View className="flex-row  flex-1 h-[64px] gap-4 items-center justify-between">
                    <Text
                        style={{
                            opacity: isPrivate ? 0.4 : 1,
                        }}
                        className="text-[16px]">{emoji}</Text>
                    <Text
                        style={{
                            opacity: isPrivate ? 0.4 : 1
                        }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        className="text-[16px] flex-shrink text-primary-800 font-medium">
                        {title}
                    </Text>
                    <DropdownSetItem>
                        <DropdownItemAction
                            action={() => toggleItemEdit(defaultItem)}
                            Icon={Pencil}
                            label="Editar" />
                        <DropdownItemAction
                            Icon={isPrivate ? EyeOff : Eye}
                            action={handleVisibility}
                            label={isPrivate ? "Mostrar" : "Ocultar"} />
                        <DropdownItemAction
                            action={() => toggleItem(defaultItem)}
                            Icon={Trash}
                            label="Eliminar" />
                    </DropdownSetItem>
                </View>
            </View>
        </Pressable>
    )
})

const ItemSeparator = () => {
    const isDrag = useIsActive()
    if (isDrag) return
    return <View className="h-[1px] my-1 bg-primary-100 w-full" />
}

const ModalItemEdit = () => {
    const itemInEdit = useSetManagerStore(state => state.itemInEdit)
    const toggleItemEdit = useSetManagerStore(state => state.toggleItemEdit)
    const updateItem = useSetManagerStore(state => state.updateItem)
    const [value, setValue] = useState({
        emoji: "",
        title: ""
    })

    const onChangeValue = (values: Partial<{ emoji: string, title: string }>) => {
        setValue(prev => ({ ...prev, ...values }))
    }

    const hasValues = !!(value.emoji && value.title)

    const applyChanges = () => {
        if (!itemInEdit || !hasValues) return
        updateItem({
            itemID: itemInEdit?.itemID,
            ...value
        })
    }

    useEffect(() => {
        if (itemInEdit) {
            setValue({
                emoji: itemInEdit.emoji,
                title: itemInEdit.title
            })
        }
    }, [itemInEdit])


    return (
        <SafeAreaView className="flex-1">
            <Modal
                visible={!!itemInEdit}
                animationType="fade"
                transparent>
                <TouchableWithoutFeedback
                    className="flex-1"
                    onPress={() => {
                        if (itemInEdit) toggleItemEdit(itemInEdit)
                    }}
                >
                    <View className="flex-1 justify-center items-center gap-6 bg-black/40 px-6">
                        <EmojiKeyboard
                            onEmojiSelected={({ emoji }) => onChangeValue({ emoji })}
                            styles={{
                                container: {
                                    maxHeight: 250
                                }
                            }}
                        />
                        <View className=" rounded-2xl w-full bg-white p-6 gap-6">

                            <View className="bg-white flex-row gap-3 items-center">
                                <Input
                                    isActive={hasValues}
                                    className="flex-1"
                                    inputProps={{
                                        onChangeText: (title) => onChangeValue({ title }),
                                        value: value.title,
                                    }}
                                    endComponent={
                                        <Text className="text-2xl">{value.emoji}</Text>
                                    }
                                />
                            </View>
                            <Button
                                style={{
                                    opacity: hasValues ? 1 : 0.5,
                                }}
                                disabled={!hasValues}
                                onPress={applyChanges}
                                className=" py-3"
                            >
                                <Text className="text-white text-center font-semibold text-base">
                                    Guardar cambios
                                </Text>
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>

    )
}

export default function SetInfoItems() {

    const items = useSetManagerStore(state => state.items)
    const loadItems = useSetManagerStore(state => state.loadItems)

    const onReorder = ({ from, to }: ReorderableListReorderEvent) => {
        loadItems(reorderItems(items, from, to))
    }

    return (
        <>
            <ReorderableList
                data={items}
                autoscrollSpeedScale={2}
                itemLayoutAnimation={LinearTransition}
                showsVerticalScrollIndicator={false}
                keyExtractor={i => i.itemID.toString()}
                onReorder={onReorder}
                cellAnimations={{
                    marginHorizontal: 6
                }}
                shouldUpdateActiveItem
                ItemSeparatorComponent={ItemSeparator}
                renderItem={(props) => {
                    return <Item
                        {...props.item}
                    />
                }

                }
            />
            <ModalItemEdit />
        </>
    )
}