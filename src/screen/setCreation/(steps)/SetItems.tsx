import AnimatedTap from "@/components/AnimatedTap.component";
import Checkbox from "@/components/Checkbox.component";
import Container from "@/components/Container.component";
import colorPalette from "@/constant/colorPalette.constant";
import SetItem from "@/types/SetItemInteface.type";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import setItemsMock from "../../../mocks/itemList.mock";
import useSetManagerStore from "../../../store/useSetManagerStore.store";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetManagerWrapper from "../components/SetManagerWrapper.component";

const SetItemCard = (item: SetItem) => {
    const {
        emoji,
        title,
        itemID
    } = item

    const toggleItem = useSetManagerStore(store => store.toggleItem)
    const isSelected = useSetManagerStore(store => store.items.some(i => i.itemID == itemID))

    return (
        <AnimatedTap
            onPress={() => toggleItem(item)}>
            <Container
                isActive={isSelected}
                className="gap-x-2">
                <Text className="text-[16px]">
                    {emoji}
                </Text>
                <Text
                    className="text-primary-800 font-semibold text-center flex-auto text-[16px]"
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {title}
                </Text>
                <Checkbox
                    style={{
                        backgroundColor: isSelected ? colorPalette.primary[500] : "white",
                        borderColor: isSelected ? colorPalette.primary[500] : colorPalette.secondary[400]
                    }}
                    pointerEvents="none"
                    isActive={isSelected} />
            </Container>
        </AnimatedTap>
    )
}

const Content = () => {

    return (
        <View className="flex-1 gap-3">
            <View className="flex-1 ">
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="gap-6 pt-2"
                    className="flex-1"
                    data={setItemsMock}
                    keyExtractor={(i) => i.itemID.toString()}
                    renderItem={({ item }) => (
                        <SetItemCard
                            {...item}
                        />
                    )}
                />
            </View>
            <NextButton
                nextStepAllowed={true}
                onPress={() => router.navigate("./setCustomItems")}
            />
        </View>
    )
}

export default function SetItems() {
    return (
        <SetManagerWrapper>
            <SetImageBackground
                className="h-[100px] "
                source={require("@/assets/images/itemList.jpg")} />
            <Content />
        </SetManagerWrapper>
    )
}