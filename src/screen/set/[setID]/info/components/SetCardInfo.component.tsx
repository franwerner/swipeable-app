import SetCard from "@/components/SetCard.component";
import useSetManagerStore from "@/store/useSetManagerStore.store";
import { View } from "react-native";


export default function SetCardInfo() {
    const { colors, userBy, name, items_count } = useSetManagerStore((state) => state.setConfig)
    return (
        <View className="gap-4">
            <SetCard
                className="!h-[150px] w-full"
                colors={colors}>
                <View className="p-3 flex-row justify-between pt-5 px-5">
                    <SetCard.Title name={name} />
                    <SetCard.Shared />
                </View>
                <SetCard.Body
                    items_count={items_count}
                    avatarUrl={userBy.avatarUrl}
                    nickname={userBy.nickname} />
            </SetCard>
        </View>
    )
}