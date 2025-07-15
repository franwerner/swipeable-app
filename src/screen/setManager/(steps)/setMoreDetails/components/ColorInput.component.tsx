import AnimatedTap from "@/components/AnimatedTap.component"
import Container from "@/components/Container.component"
import colorPalette from "@/constant/colorPalette.constant"
import useSetCreationStore from "@/screen/setManager/store/useSetManagerStore.store"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { ChevronRight } from "lucide-react-native"
import { useRef } from "react"
import { Text, View } from "react-native"
import SetColorPicker from "./SetColorPicker.component"


export default function ColorInput() {
    const colors = useSetCreationStore((store) => store.colors)
    const name = useSetCreationStore((store) => store.name)
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
                        emoji: "",
                        userBy: {
                            id: 1,
                            nickname: "test123"
                        },
                        name,
                    }}
                    colors={colors}
                    onChangeColor={addColors}
                />
            </SetColorPicker>
        </>
    )
}
