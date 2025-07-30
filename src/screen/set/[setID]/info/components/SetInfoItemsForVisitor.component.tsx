import Button from "@/components/Button.component"
import useSetManagerStore from "@/store/useSetManagerStore.store"
import SetItem from "@/types/SetItemInteface.type"
import { router } from "expo-router"
import { FlatList, Text, View } from "react-native"

const ItemForVisitedUser = ({
    title
    , emoji
}: SetItem) => {
    return (
        <View
            className="flex-row h-[64px] px-3 gap-4 items-center ">
            <Text className="text-[16px] pl-3">
                {emoji}
            </Text>
            <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                className="text-[16px] pr-3 text-center flex-1  text-primary-800 font-medium">
                {title}
            </Text>
        </View>
    )
}

export default function SetInfoItemsForVisitor() {

    const items = useSetManagerStore(state => state.items)

    return (
        <View className="flex-1 gap-4">
            <FlatList
                data={items}
                showsVerticalScrollIndicator={false}
                keyExtractor={i => i.itemID.toString()}
                ItemSeparatorComponent={() => <View className="h-[1px] bg-primary-100" />}
                renderItem={({ item }) =>
                    <ItemForVisitedUser
                        key={item.itemID}
                        {...item}
                    />}
            />
            <Button
                onPress={() => router.navigate("./swipe")}
                className="bg-primary-500 py-7">
                <Text className="text-white text-md font-semibold">Empezar set</Text>
            </Button>
        </View>
    )
}
