import Avatar from "@/components/Avatar.component"
import SetCard from "@/components/SetCard.component"
import { Text, View } from "react-native"
import setInfoMock from "../../../../../mocks/setInfo.mock"


export default function SetStatisticCard() {

    const { avatarUrl, nickname } = setInfoMock.userBy
    const { items_count, colors, name } = setInfoMock

    return (
        <View className="px-6">
            <SetCard
                className="!h-[120px] gap-5 w-full"
                colors={colors}>
                <SetCard.Header className="!p-3 px-4 ">
                    <Text className="font-bold text-3xl">{name}</Text>
                </SetCard.Header>
                <View className="px-4 flex-row items-center justify-between">
                    <View className="flex-row flex-1 items-center  gap-3">
                        <Avatar
                            className="!w-[45px] !h-[45px]"
                            source={{ uri: avatarUrl }}
                        />
                        <Text
                            className="text-[16px] font-medium flex-shrink "
                            ellipsizeMode="tail"
                            numberOfLines={1}>
                            Por {nickname}
                        </Text>
                    </View>
                    <Text className="text-[16px] font-medium">{items_count} items</Text>
                </View>
            </SetCard>
        </View>
    )
}