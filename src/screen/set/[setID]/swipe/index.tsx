import AnimatedTap from "@/components/AnimatedTap.component";
import BackHeader from "@/components/BackHeader.component";
import SetCardGradient from "@/components/SetCardGradient.component";
import emojiStatistic from "@/constant/emojiStatistic.constant";
import setItemsMock from "@/mocks/itemList.mock";
import useSetManagerStore from "@/store/useSetManagerStore.store";
import SetItem from "@/types/SetItemInteface.type";
import StaticsticType from "@/types/StaticsticType.type";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";


const emojiStatisticToArray = Object.entries(emojiStatistic) as Array<[keyof typeof emojiStatistic, string]>

interface SwipeCardProps {
    title: string
    emoji: string
    colors: Array<string>
    name: string
}
const SwipeCard = ({
    title,
    emoji,
    colors,
    name
}: SwipeCardProps) => {
    return (
        <View className="overflow-hidden rounded-2xl flex-1">
            <SetCardGradient
                colors={colors}
                className="flex-1">
                <View
                    style={{
                        borderBottomColor: "#ffffff"
                    }}
                    className="border-b  p-6">
                    <Text
                        numberOfLines={1}
                        className="text-center flex-shrink text-2xl font-medium">{name}</Text>
                </View>
                <View className=" flex-1 p-6 gap-10 justify-center">
                    <Text className="text-3xl">{emoji}</Text>
                    <Text
                        numberOfLines={5}
                        className="text-[38px] self-stretch font-semibold flex-shrink">{title}</Text>
                </View>
            </SetCardGradient>
        </View>
    )
}



const Content = () => {

    const {
        colors,
        name
    } = useSetManagerStore(store => store.setConfig)

    const ref = useRef<Swiper<SetItem>>(null)

    const [items, setItems] = useState({
        list: setItemsMock.slice(0, 5),
        count: setItemsMock.length, //Total absoluto de la cantidad de items.
        idx: 0
    })

    useEffect(() => {
        const currentIdx = items.idx + 1
        if (items.idx !== 0 && currentIdx % 4 === 0 && !isFinish) {
            setItems(prev => ({ ...prev, list: [...prev.list, ...setItemsMock.slice(prev.list.length, prev.list.length + 5)] }))
        }
    }, [items.idx])

    const swipeControlRef = useRef<{
        block: boolean
        timeout: NodeJS.Timeout | null
    }>({
        block: false,
        timeout: null,
    })

    const swipeAction = (type: StaticsticType) => {
        const control = swipeControlRef.current
        if (!ref.current || control.block) return

        control.block = true

        /**
         * Al bloquear por un tiempo determinado la action, evitamos que se haga spam y genere error de renderizado en el Swiper.
         */
        if (control.timeout) {
            clearTimeout(control.timeout)
        }

        control.timeout = setTimeout(() => {
            control.block = false
            control.timeout = null
        }, 600)

        if (type === "like") ref.current.swipeRight()
        else if (type === "dislike") ref.current.swipeLeft()
        else if (type === "normal") ref.current.swipeTop()
    }

    const isFinish = items.list.length - 1 == items.idx
    const handleSwipe = (idx: number) => {
        setItems(prev => ({
            ...prev,
            count: prev.count - 1,
            idx
        }))
    }

    const onLike = () => {
    }

    const onDislike = () => {
    }

    const onNormal = () => {
    }

    return (

        <View className="flex-1 px-6 gap-4 relative ">
            <View className="flex-1 items-center justify-center">
                {
                    !isFinish ? <Swiper
                        ref={ref}
                        backgroundColor="transparent"
                        cards={items.list}
                        cardIndex={items.idx}
                        disableBottomSwipe
                        onSwiped={handleSwipe}
                        onSwipedTop={onNormal}
                        onSwipedLeft={onDislike}
                        onSwipedRight={onLike}
                        cardStyle={{
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0
                        }}
                        renderCard={(props) => {
                            if (!props) return
                            const { emoji, title } = props
                            return <SwipeCard
                                emoji={emoji}
                                title={title}
                                colors={colors}
                                name={name}
                            />
                        }}
                    /> : <Text className="text-xl underline">No hay mas items para mostrar.</Text>
                }
            </View>
            <View className="p-3 pb-8 h-[30%] justify-between">
                <Text className="text-center text-[16px] text-secondary-500">{items.count} selecciones restantes</Text>
                <View className="flex-row pb-6 justify-between">
                    {
                        emojiStatisticToArray.map(([key, emoji]) => {
                            return (
                                <AnimatedTap
                                    key={key}
                                    onPress={() => swipeAction(key)}
                                    className="bg-primary-100 shadow-sm items-center justify-center rounded-full h-[100px] w-[100px]">
                                    <View className="flex-1 items-center justify-center">
                                        <Text className="text-[40px]">{emoji}</Text>
                                    </View>
                                </AnimatedTap>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}


export default function Swipe() {

    return (
        <View className="gap-8 flex-1">
            <BackHeader className="mr-[60px] p-6" />
            <Content />
        </View>
    )
}