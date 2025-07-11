import Accordion from "@/components/Accordion.component";
import AnimatedTap from "@/components/AnimatedTap.component";
import Container from "@/components/Container.component";
import colorPalette from "@/constant/colorPalette.constant";
import { SetItem } from "@/types/SetItemInteface.type";
import clsx from "clsx";
import { ChevronDown, Plus } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import Checkbox from "../components/Checkbox.component";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetManagerWrapper from "../components/SetManagerWrapper.component";
import useSetCreationStore from "../store/SetCreation.store";

const AddItem = () => {
    return (
        <View>
            <AnimatedTap>
                <Container>
                    <Text className="color-primary-800 font-semibold text-[16px]">
                        Añadir item personalizado
                    </Text>
                    <Plus
                        color={colorPalette.primary["800"]}
                        size={24} />
                </Container>
            </AnimatedTap>
        </View>
    )
}

const SetItemCard = (item: SetItem & { isLastItem: boolean }) => {

    const {
        icon,
        title,
        isLastItem
    } = item

    return (
        <View
            className={clsx(
                "h-[64px] flex-row justify-between px-6 items-center",
                isLastItem ? "border-0" : "border-b border-b-secondary-200"
            )}>
            <Text className="text-[16px]">{icon}</Text>
            <Text className="text-secondary-300 font-semibold text-[16px]">{title}</Text>
            <Checkbox
                className="!bg-secondary-300 !border-secondary-300"
                pointerEvents="none"
                isActive />
        </View>
    )
}


const ViewAddedItems = () => {
    const setItems = useSetCreationStore(store => store.items)

    const itemsIndex = setItems.length - 1

    return (
        <Accordion>
            <Accordion.Header
                className="flex-row  py-2 justify-between border-b  pb-5 border-b-primary-200"
                endComponent={
                    <ChevronDown
                        color={colorPalette.primary["800"]}
                        size={24} />
                } >
                <Text className="text-[16px] font-semibold">
                    Ver items agregados
                </Text>
            </Accordion.Header>
            <Accordion.Body>
                <FlatList
                    data={setItems}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: 255 }}
                    renderItem={({ item, index }) => (
                        <SetItemCard
                            {...item}
                            isLastItem={index === itemsIndex && index !== 0}
                        />
                    )}
                />
            </Accordion.Body>
        </Accordion>
    )
}

const Content = () => {
    return (
        <View className="flex-1 gap-3 justify-between">
            <AddItem />
            <ViewAddedItems />
        </View>
    )
}


export default function SetCustomItem() {

    return (
        <SetManagerWrapper>
            <SetImageBackground
                className="h-[100px]"
                source={require("@/assets/images/itemCustom.png")} />
            <Content />
            <NextButton
                nextStepAllowed={true}
                href={"/home"}
                text="Finalizar" />
        </SetManagerWrapper>
    )
}