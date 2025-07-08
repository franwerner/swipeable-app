import AnimatedTap from "@/components/AnimatedTap.component";
import { useLocalSearchParams, useRouter } from "expo-router";
import { memo, useCallback, useEffect, useRef } from "react";
import { FlatList, Text } from "react-native";
import Checkbox from "./components/Checkbox.component";
import NextButton from "./components/NextButton.component";
import SetImageBackground from "./components/SetImageBackground.component";
import SetManagerWrapper from "./components/SetManagerWrapper.component";
import itemList, { SetItem } from "./mocks/itemList.mock";
interface SetItemProps extends SetItem {
    isActive?: Boolean
    setItem: (item: string) => void
}

const Item = memo(({
    icon,
    id,
    title,
    isActive,
    setItem
}: SetItemProps) => {

    const onPress = () => setItem(id)
    const borderColor = isActive ? "#000" : "#ced0f7"

    return (
        <AnimatedTap
            onPress={onPress}
            style={{
                borderColor
            }}
            className="h-[64px] rounded-[16px]  flex-row justify-between px-6 items-center border">
            <Text className="text-[16px]">{icon}</Text>
            <Text className="text-primary-800 font-medium text-[16px]">{title}</Text>
            <Checkbox
                pointerEvents="none"
                isActive={isActive} />
        </AnimatedTap>
    )
})

const Content = () => {

    const {
        selectedSetItems
    } = useLocalSearchParams<{
        selectedSetItems: string[]
    }>()

    const { setParams } = useRouter()

    const normalizedSelectedItems = selectedSetItems || []

    /**
   * useRef guarda el valor actual para que useCallback mantenga referencia fija,
   * evitando renders extra y sin necesidad de useState.
   */

    const refSelectItems = useRef<string[]>(normalizedSelectedItems)

    const setItems = useCallback((item: string) => {
        const currentParams = refSelectItems.current
        const nextParams = currentParams.includes(item) ? currentParams.filter(i => i !== item) : [...currentParams, item]
        setParams({
            selectedSetItems: nextParams
        })
    }, [])

    useEffect(() => {
        refSelectItems.current = normalizedSelectedItems
    }, [normalizedSelectedItems])

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerClassName="gap-6 pt-2"
            className="flex-1"
            data={itemList}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => (
                <Item
                    isActive={normalizedSelectedItems.includes(item.id)}
                    setItem={setItems}
                    {...item}
                />
            )}
        />
    )
}

export default function ItemList() {



    return (
        <SetManagerWrapper className="!gap-4">
            <SetImageBackground
                className="h-[100px] "
                source={require("@/assets/images/itemList.png")} />
            <Content />
            <NextButton
                nextStepAllowed={true}
                href={"/setCreation/SetCustomItems"} />
        </SetManagerWrapper>
    )
}