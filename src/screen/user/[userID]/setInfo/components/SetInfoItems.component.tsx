import Dropdown from "@/components/Dropdown.component";
import colorPalette from "@/constant/colorPalette.constant";
import setItemsMock from "@/mocks/itemList.mock";
import SetItem from "@/types/SetItemInteface.type";
import { router } from "expo-router";
import { EllipsisVertical, Eye, EyeOff, GripHorizontal, LucideIcon, Pencil, Trash } from "lucide-react-native";
import { memo, ReactNode, useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { LinearTransition } from "react-native-reanimated";
import ReorderableList, { ReorderableListReorderEvent, reorderItems, useIsActive, useReorderableDrag } from "react-native-reorderable-list";

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

interface ItemProps extends SetItem {
    removeItem: (id: string) => void
}

const Item = memo(({
    removeItem,
    ...defaultItem
}: ItemProps) => {

    const { emoji, title, id } = defaultItem

    const [visibility, setVisibility] = useState(defaultItem.visibility)

    const handleVisibility = () => {
        setVisibility(prev => prev === "public" ? "private" : "public")
    }

    const isPrivate = visibility == "public"
    const drag = useReorderableDrag()
    const isDrag = useIsActive()

    return (
        <Pressable onLongPress={drag}>
            <View
                style={{
                    backgroundColor: isDrag ? colorPalette.primary[50] : "transparent",
                    borderRadius: 16,
                    overflow: "hidden",
                }}
                className="flex-row gap-4 px-3 justify-between items-center">
                {isDrag &&
                    <GripHorizontal size={28} color={colorPalette.primary[800]}
                    />
                }
                <View className="flex-row flex-1 h-[64px] gap-4 items-center justify-between">
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
                            action={() => router.navigate({
                                pathname: "/setManager/setCustomItems",
                                params: {
                                    customItemMode: "edit",
                                }
                            })}
                            Icon={Pencil}
                            label="Editar" />
                        <DropdownItemAction
                            Icon={isPrivate ? EyeOff : Eye}
                            action={handleVisibility}
                            label={isPrivate ? "Mostrar" : "Ocultar"} />
                        <DropdownItemAction
                            action={() => removeItem(id)}
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
    return <View className="h-[1px] bg-primary-100 w-full" />
}

export default function SetInfoItems() {

    const [items, setItems] = useState(setItemsMock)

    const onReorder = ({ from, to }: ReorderableListReorderEvent) => {
        setItems(prev => reorderItems(prev, from, to))
    }

    const removeItem = useCallback((id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }, [])

    return (
        <ReorderableList
            data={items}
            autoscrollSpeedScale={2}
            itemLayoutAnimation={LinearTransition}
            showsVerticalScrollIndicator={false}
            keyExtractor={i => i.id}
            onReorder={onReorder}
            cellAnimations={{
                marginHorizontal: 6
            }}
            shouldUpdateActiveItem
            ItemSeparatorComponent={ItemSeparator}
            renderItem={(props) => {
                return <Item
                    removeItem={removeItem}
                    {...props.item}
                />
            }

            }
        />
    )
}