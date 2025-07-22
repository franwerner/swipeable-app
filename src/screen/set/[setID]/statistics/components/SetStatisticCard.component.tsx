import SetCard from "@/components/SetCard.component"
import setListMock from "@/mocks/setList.mock"
import { View } from "react-native"

const setInfoMock = setListMock[2]

export default function SetStatisticCard() {

    const { avatarUrl, nickname } = setInfoMock.userBy
    const { items_count, colors, name } = setInfoMock

    return (
        <View className="px-6">
            <SetCard
                className="!max-h-[120px] gap-5 w-full"
                colors={colors}>
                <View className="pt-2 px-5">
                    <SetCard.Title name={name} />
                </View>
                <SetCard.Body
                    avatarUrl={avatarUrl}
                    items_count={items_count}
                    nickname={nickname}
                >
                </SetCard.Body>
            </SetCard>
        </View>
    )
}