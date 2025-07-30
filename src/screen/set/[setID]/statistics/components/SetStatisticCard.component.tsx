import SetCard from "@/components/SetCard.component"
import useSetManagerStore from "@/store/useSetManagerStore.store"
import { View } from "react-native"


export default function SetStatisticCard() {

    const { userBy, colors, name, items_count, emojis } = useSetManagerStore(store => store.setConfig)
    const { avatarUrl, nickname } = userBy

    return (
        <View className="px-6">
            <SetCard
                className="!max-h-[120px] gap-5 w-full"
                colors={colors}>
                <View className="pt-2 px-5">
                    <SetCard.Title name={name + " " + emojis.join("")} />
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