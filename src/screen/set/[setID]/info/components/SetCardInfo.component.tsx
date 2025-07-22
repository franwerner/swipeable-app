import SetCard from "@/components/SetCard.component";
import { View } from "react-native";
import useSetStore from "../store/useSet.store";


export default function SetCardInfo() {
    useSetStore(state => state.setData?.colors)
    const { colors, userBy, items_count, name } = useSetStore((state) => state.setData)
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