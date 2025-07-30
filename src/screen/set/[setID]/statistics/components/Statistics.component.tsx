import Avatar from "@/components/Avatar.component";
import Button from "@/components/Button.component";
import emojiStatistic from "@/constant/emojiStatistic.constant";
import { default as setStatisticsMock } from "@/mocks/setItemsStatistics.mocks";
import { SetStatisticsStatus } from "@/types/SetItemStatistic.type";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

interface StatisticProps {
    emoji: string
    users: SetStatisticsStatus["users"]
}

const Statistic = ({
    users,
    emoji
}: StatisticProps) => {

    return (
        <View className="relative gap-3 flex-row items-center pl-6">
            <View className="bg-primary-100 h-[50px] w-[65px] items-center justify-center rounded-full z-10">
                <Text className="text-3xl">{emoji}</Text>
            </View>
            <FlatList
                data={users}
                horizontal
                keyExtractor={({ userID }) => userID.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-4 pr-[48px]"
                renderItem={({ item }) => (
                    <View className="flex-row items-center gap-3 bg-primary-100 rounded-full px-3 h-[50px]">
                        <Avatar
                            className="!w-[30px] !h-[30px]"
                            source={{ uri: item.avatarUrl }}
                        />
                        <Text className="text-primary-800">{item.nickname}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default function Statistics() {

    const [index, setIndex] = useState(0)

    const next = () => {

        setIndex((prev) => {
            const next = prev + 1
            return next > setStatisticsMock.length - 1 ? 0 : next
        })
    }

    const statistic = setStatisticsMock[index]

    return (
        <View className="gap-6 flex-1 justify-center">
            <Animated.View
                key={statistic.itemID}
                entering={SlideInRight.duration(300)}
                exiting={SlideOutLeft.duration(300)}
                className="gap-6 flex-1"
            >
                <Text className="text-[40px] px-6 font-bold">{statistic.title}</Text>
                {statistic.status.map((i, idx) => (
                    <View className="gap-6 justify-center" key={i.type}>
                        <Statistic
                            users={i.users}
                            emoji={emojiStatistic[i.type]}
                        />
                        {idx < statistic.status.length - 1 && (
                            <View className="h-[1px] mx-6 bg-primary-100" />
                        )}
                    </View>
                ))}
            </Animated.View>
            <Button
                onPress={next}
                className="m-6 mb-8 rounded-full "  >
                <Text className="text-white text-lg font-semibold">Siguiente</Text>
            </Button>
        </View>
    )
}