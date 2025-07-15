import setItemsMock from "@/mocks/itemList.mock"
import SetItem from "@/types/SetItemInteface.type"
import { FlatList, Text, View } from "react-native"

const ItemForVisitedUser = ({
    title
    , emoji
}: SetItem) => {
    return (
        <View
            className="flex-row h-[64px] px-3 gap-4 items-center ">
            <Text className="text-[16px]">
                {emoji}
            </Text>
            <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                className="text-[16px] text-center flex-1  text-primary-800 font-medium">
                {title}
            </Text>
        </View>
    )
}

export default function SetInfoItemsForVisitor() {
    return (
        <FlatList
            data={setItemsMock}
            showsVerticalScrollIndicator={false}
            keyExtractor={i => i.id}
            ItemSeparatorComponent={() => <View className="h-[1px] bg-primary-100" />}
            renderItem={({ item }) =>
                <ItemForVisitedUser
                    key={item.id}
                    {...item}
                />}
        />
    )
}
