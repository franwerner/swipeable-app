import AnimatedTap from "@/components/AnimatedTap.component";
import Container from "@/components/Container.component";
import Input from "@/components/Input.component";
import SetColorPicker from "@/components/SetColorPicker.component";
import colorPalette from "@/constant/colorPalette.constant";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useRef } from "react";
import { Text, View } from "react-native";
import Checkbox from "../../../components/Checkbox.component";
import NextButton from "../components/NextButton.component";
import SetImageBackground from "../components/SetImageBackground.component";
import SetInput from "../components/SetInput.component";
import { SetManagerWrapperWithSafeKeyboard } from "../components/SetManagerWrapper.component";
import useSetCreationStore from "../store/SetCreation.store";


const NameInput = () => {

    const name = useSetCreationStore((store) => store.name)
    const addName = useSetCreationStore((store) => store.addName)

    return (
        <SetInput
            inputProps={{
                value: name,
                onChangeText: addName,
                placeholder: "Ingresa un nombre"
            }}
        />
    )
}

const ColorInput = () => {
    const colors = useSetCreationStore((store) => store.colors)
    const name = useSetCreationStore((store) => store.name)
    const currentUserLogged = "test123" //Se debe modifcar posteriomente por la store global del usuario.
    const addColors = useSetCreationStore((store) => store.addColors)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const handleOpen = () => {
        bottomSheetModalRef.current?.present()
    }

    return (
        <>
            <AnimatedTap
                onPress={handleOpen} >
                <Container isActive >
                    <Text className="text-primary-800 font-semibold text-[16px]">Colores del set</Text>
                    <View className="px-2 flex-row items-center gap-5">
                        <View className="h-[52px] w-[52px] rounded-full overflow-hidden flex-row">
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
            <SetColorPicker ref={bottomSheetModalRef}>
                <SetColorPicker.Body
                    cardProps={{
                        icon: "",
                        userBy: currentUserLogged,
                        name,
                    }}
                    colors={colors}
                    onChangeColor={addColors}
                />
            </SetColorPicker>
        </>
    )
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
                maxLength: 255,
                onChangeText: addDescription,
                placeholder: "Describe el set",
                className: "h-full"
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
        onPress={() => router.navigate("/setCreation/SetItems")}
    />
}

const Content = () => {
    return (
        <View className="gap-4 flex-1 justify-between">
            <NameInput />
            <ColorInput />
            <DescriptionInput />
            <SetVisilibity />
        </View>
    )
}

export default function SetDetails() {
    return (
        <BottomSheetModalProvider>
            <SetManagerWrapperWithSafeKeyboard>
                <SetImageBackground
                    className="h-[360px]"
                    source={require("@/assets/images/setName.png")} />
                <Content />
                <Btn />
            </SetManagerWrapperWithSafeKeyboard>
        </BottomSheetModalProvider>
    )
}