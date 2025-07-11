import AnimatedTap from "@/components/AnimatedTap.component";
import Container from "@/components/Container.component";
import Input from "@/components/Input.component";
import SetColorPickerModal from "@/components/SetColorPicker.component";
import colorPalette from "@/constant/colorPalette.constant";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import Checkbox from "../components/Checkbox.component";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetInput from "../components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "../components/SetManagerWrapper.component";
import useSetCreationStore from "../store/SetCreation.store";


const NameInput = () => {

    const name = useSetCreationStore((store) => store.name)
    const setName = useSetCreationStore((store) => store.addName)

    return (
        <SetInput
            inputProps={{
                value: name,
                onChangeText: setName,
                placeholder: "Ingresa un nombre"
            }}
        />
    )
}


const ColorInput = () => {
    const [isOpen, setOpen] = useState(false)

    const colors = useSetCreationStore((store) => store.colors)

    const addColors = useSetCreationStore((store) => store.addColors)

    const handleShowModal = () => setOpen(prev => !prev)

    const hasValue = colors.length == 2

    return (
        <>
            <AnimatedTap
                onPress={handleShowModal}
            >
                <Container
                    isActive={hasValue}>
                    <Text className="text-primary-800 font-semibold text-[16px]">Colores del set</Text>
                    <View className="px-2 flex-row items-center gap-5">
                        <View
                            className="h-[52px] w-[52px] rounded-full overflow-hidden flex-row">
                            {
                                colors.map((i, index) =>
                                    <View
                                        key={index}
                                        style={{
                                            backgroundColor: i
                                        }}
                                        className="flex-1 " />)
                            }
                        </View>
                        <ChevronRight color={colorPalette.primary[800]} />
                    </View>
                </Container>
            </AnimatedTap>
            <SetColorPickerModal
                isOpen={isOpen}
                setOpen={handleShowModal}
            >
                <SetColorPickerModal.Header />
                <SetColorPickerModal.Body
                    colors={colors}
                    onChangeColor={addColors}
                />
            </SetColorPickerModal>
        </ >
    );
}

const DescriptionInput = () => {
    const description = useSetCreationStore((store) => store.description)
    const addDescription = useSetCreationStore((store) => store.addDescription)

    const hasValue = description.length > 0

    return (
        <Input
            isActive={hasValue}
            className="!h-[150px] py-2 px-4"
            inputProps={{
                value: description,
                multiline: true,
                textAlignVertical: 'top',
                numberOfLines: 4,
                onChangeText: addDescription,
                placeholder: "Describe el set"
            }}
        />
    )
}

const SetVisilibity = () => {

    const visibility = useSetCreationStore((store) => store.visibility)

    const toggleVisibility = useSetCreationStore((store) => store.toggleVisibility)

    const isPublic = visibility == "public"

    return (
        <View className="flex-row items-center gap-2">
            <Checkbox
                onPress={toggleVisibility}
                isActive={isPublic} />
            <Text className="text-primary-800 text-[16px] font-semibold">Lista pública</Text>
        </View>
    )
}

const Btn = () => {

    const name = useSetCreationStore((store) => store.name)
    const description = useSetCreationStore((store) => store.description)

    const nextStepAllowed = !!name && !!description

    return <NextButton
        nextStepAllowed={nextStepAllowed}
        href={"/setCreation/SetItems"} />
}

const Content = () => {
    return (
        <Animated.View
            className="gap-4 flex-1 justify-between">
            <NameInput />
            <ColorInput />
            <DescriptionInput />
            <SetVisilibity />
        </Animated.View>
    )
}

export default function SetDetails() {


    return (
        <SetManagerWrapperWithSafeKeyboard>
            <SetImageBackground
                className="h-[360px]"
                source={require("@/assets/images/setName.png")} />
            <Content />
            <Btn />
        </SetManagerWrapperWithSafeKeyboard>
    )
}