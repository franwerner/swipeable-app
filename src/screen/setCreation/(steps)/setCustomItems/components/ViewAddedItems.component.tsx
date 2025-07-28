import Accordion from "@/components/Accordion.component"
import AnimatedTap from "@/components/AnimatedTap.component"
import Checkbox from "@/components/Checkbox.component"
import colorPalette from "@/constant/colorPalette.constant"
import useSetCreationStore from "@/store/useSetManagerStore.store"
import SetItem from "@/types/SetItemInteface.type"
import clsx from "clsx"
import { ChevronDown } from "lucide-react-native"
import { Dimensions, Text, View } from "react-native"
import { FlatList, Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { FadeOut, interpolate, interpolateColor, LinearTransition, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

const THRESHOLD = 100

const SetItemCard = (item: SetItem) => {

    const {
        emoji,
        title,
        itemID,
        source
    } = item

    const width = Dimensions.get("window").width

    const removeItem = useSetCreationStore(store => store.removeItem)
    const toggleItemEdit = useSetCreationStore(store => store.toggleItemEdit)
    const isInEdit = useSetCreationStore(store => store.itemInEdit?.itemID === itemID)
    const offset = useSharedValue<number>(0)

    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .failOffsetY([-10, 10])
        .onChange(({ translationX }) => {
            offset.value = translationX
        })
        .onFinalize((_evt) => {
            const distance = Math.abs(offset.value)
            if (distance > THRESHOLD) {
                const OUT = offset.value < 0 ? -width : width
                offset.value = withSpring(OUT, { duration: 150 }, () => runOnJS(removeItem)(itemID))
            } else {
                offset.value = withSpring(0)
            }
        })

    const animatedStyles = useAnimatedStyle(() => {
        const progress = Math.min(Math.abs(offset.value) / THRESHOLD, 1)
        const progressBg = Math.abs(offset.value) >= THRESHOLD ? Math.abs(offset.value) / THRESHOLD : 0
        const backgroundColor = interpolateColor(progressBg, [0, 2], ['white', '#ff9ea2'])
        const scale = interpolate(progress, [0, 1], [1, 0.8])
        const backgroundColorInEdit = isInEdit && Math.abs(offset.value) < THRESHOLD
        return {
            transform: [
                { translateX: offset.value },
                { scale }
            ],
            backgroundColor: backgroundColorInEdit ? colorPalette.primary[50] : backgroundColor
        }
    })


    return (
        <GestureDetector gesture={panGesture}>
            <AnimatedTap
                onPress={() => {
                    toggleItemEdit(item)
                }}
            >
                <Animated.View
                    exiting={FadeOut.duration(300)}
                    layout={LinearTransition.duration(300)}
                    style={animatedStyles}
                    className={clsx(
                        "h-[64px] gap-x-2 my-1 rounded-[16px] flex-row justify-between px-6 items-center"
                    )}>
                    <Text
                        className="text-[16px]">
                        {emoji}
                    </Text>
                    <Text
                        className="text-secondary-400 font-semibold text-center text-[16px] flex-auto"
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {title}
                    </Text>
                    <Checkbox
                        className={clsx(
                            source == "AI" && "!bg-primary-500 !border-primary-500"
                        )}
                        pointerEvents="none"
                        isActive />
                </Animated.View>
            </AnimatedTap>
        </GestureDetector>
    )
}


export default function ViewAddedItems() {

    const items = useSetCreationStore(store => store.items)
    const reverseItems = [...items].reverse()

    return (
        <Accordion>
            <View>
                <Accordion.Header
                    className="flex-row py-2 justify-between border-b pb-5 border-b-primary-200"
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
                        keyExtractor={(item) => item.itemID.toString()}
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
        </Accordion>
    )
}
