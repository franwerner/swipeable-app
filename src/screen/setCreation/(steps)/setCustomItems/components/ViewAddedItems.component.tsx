import Accordion from "@/components/Accordion.component"
import Checkbox from "@/components/Checkbox.component"
import colorPalette from "@/constant/colorPalette.constant"
import useSetCreationStore from "@/screen/setCreation/store/SetCreation.store"
import { SetItem } from "@/types/SetItemInteface.type"
import clsx from "clsx"
import { ChevronDown } from "lucide-react-native"
import { Text, View } from "react-native"
import { FlatList, Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { LinearTransition, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"


const SetItemCard = (item: SetItem) => {

    const {
        emoji,
        title,
        id
    } = item

    const removeItem = useSetCreationStore(store => store.removeItem)
    const offset = useSharedValue<number>(0)

    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .failOffsetY([-10, 10])
        .onChange(({ translationX }) => {
            offset.value = translationX
        })
        .onFinalize(() => {
            if (Math.abs(offset.value) > 50) {
                runOnJS(removeItem)(id)
            } else {
                offset.value = withSpring(0)
            }
        })

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value },
            { scale: withSpring(Math.abs(offset.value) >= 50 ? 0.9 : 1) }
        ],
    }))

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                layout={LinearTransition.duration(300)}
                style={animatedStyles}
                className={clsx(
                    "h-[64px] gap-x-2 flex-row justify-between px-6 items-center"
                )}>
                <Text className="text-[16px]">{emoji}</Text>
                <Text className="text-secondary-300 font-semibold text-center text-[16px] flex-auto" numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                <Checkbox
                    className="!bg-secondary-300 !border-secondary-300"
                    pointerEvents="none"
                    isActive />
            </Animated.View>
        </GestureDetector>
    )
}


export default function ViewAddedItems() {

    const items = useSetCreationStore(store => store.items)
    const reverseItems = [...items].reverse()
    return (
        <View>
            <Accordion.Header
                className="flex-row  py-2 justify-between border-b  pb-5 border-b-primary-200"
                endComponent={
                    <ChevronDown
                        color={colorPalette.primary["800"]}
                        size={24} />
                } >
                <Text className="text-[16px] font-semibold">
                    Ver items agregados
                </Text>
            </Accordion.Header>
            <Accordion.Body>
                <FlatList
                    data={reverseItems}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View className="bg-secondary-200 h-[1px] w-full" />}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: 255 }}
                    renderItem={({ item }) => (
                        <SetItemCard
                            {...item}
                        />
                    )}
                />
            </Accordion.Body>
        </View>
    )
}
