import Avatar from "@/components/Avatar.component";
import emojiStatistic from "@/constant/emojiStatistic.constant";
import SetStatistic from "@/types/SetStatisticInterface.type";
import { FlatList, Text, View } from "react-native";
import setStatisticsMock from "../mocks/statistics.mocks";

interface StatisticProps {
    emoji: string
    data: Array<SetStatistic>
}

const Statistic = ({
    data, emoji
}: StatisticProps) => {
    return (
        <View className="relative gap-3 flex-row items-center pl-6">
            <View className="bg-primary-100 h-[50px] w-[65px] items-center justify-center rounded-full z-10">
                <Text className="text-3xl">{emoji}</Text>
            </View>
            <FlatList
                data={data}
                horizontal
                keyExtractor={({ id }) => id.toString()}
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
    return (
        <View className="gap-6">
            <Text className="text-[40px] px-6 font-bold">Las locuras del emperador</Text>
            {
                setStatisticsMock.map((i, index) => (
                    <View className="gap-6  justify-center" key={i.type}>
                        <Statistic
                            data={i.data}
                            emoji={emojiStatistic[i.type]}
                        />
                        {index < setStatisticsMock.length - 1 && <View className="h-[1px] mx-6  bg-primary-100" />}
                    </View>
                ))
            }
        </View>
    )
}