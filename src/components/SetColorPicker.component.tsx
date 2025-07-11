import { X } from "lucide-react-native";
import { createContext, useContext, useMemo, useState } from "react";
import { Modal, ModalProps, SafeAreaView, View, ViewProps } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import AnimatedTap from "./AnimatedTap.component";
import SetCard from "./SetCard.component";

interface SetColorPickerModalContext {
    isOpen: boolean
    setOpen: () => void
}

interface SetColorPickerModalBodyProps extends ViewProps {
    colors: Array<string>
    onChangeColor: (colors: Array<string>) => void
}

interface SetColorPickerModalProps extends ModalProps, SetColorPickerModalContext { }

const SetColorPickerModalContext = createContext<SetColorPickerModalContext>({
    isOpen: false,
    setOpen: () => { }
})

export const useSetColorPickerModal = () => useContext(SetColorPickerModalContext)


//Esto se cambiara a un buttom shet
export default function SetColorPickerModal({
    isOpen,
    setOpen,
    ...props
}: SetColorPickerModalProps) {

    const [] = useState()

    return (
        <SetColorPickerModalContext.Provider
            value={{
                isOpen,
                setOpen
            }}>

            <SafeAreaView>
                <Modal
                    visible={isOpen}
                    animationType='slide'
                    className="flex-1"
                    {...props}
                />
            </SafeAreaView>
        </SetColorPickerModalContext.Provider>
    )
}

const SetColorPickerModalBody = ({
    colors: defaultColors = [],
    onChangeColor,
    ...props
}: SetColorPickerModalBodyProps) => {

    const [colors, setColor] = useState<Array<string>>(defaultColors)
    const [editColor, setEditColor] = useState(0)

    const pickerInitial = useMemo(() => defaultColors[0], []) //Solo se debe color una sola vez al montar, ya que si no generaria render infinitos.

    const handleSetColor = (color: string) => {
        setColor((prev) => {
            const copied = [...prev]
            copied[editColor] = color
            return copied
        })
    }

    return (
        <View
            className="flex-1 overflow-hidden p-4 items-center"
            {...props}>
            <View className=" p-4 w-full gap-5">
                <SetCard
                    id={1}
                    subtitle="asda"
                    userBy="#ffffff"
                    className="h-[200px] border border-black rounded-2xl overflow-hidden w-full"
                    colors={colors}
                />
                <View className="gap-10 flex-row justify-center">
                    {
                        colors.map((i, index) =>
                            <AnimatedTap
                                key={index}
                                onPress={() => setEditColor(index)}
                                style={{
                                    width: 70,
                                    height: 70,
                                    backgroundColor: i,
                                    transform: [{ scale: 1.5 }]
                                }}
                                className="rounded-md border ">
                            </AnimatedTap>
                        )
                    }
                </View>
            </View>
            <View className="relative items-center">
                <View className="absolute">
                    <ColorPicker
                        color={pickerInitial}
                        onColorChangeComplete={(e) => {
                            onChangeColor(colors)
                        }}
                        sliderSize={30}
                        onColorChange={handleSetColor}
                        swatches={false}
                    />
                </View>
            </View>
        </View>
    )
}

const SetColorPickerModalHeader = () => {

    const { setOpen } = useSetColorPickerModal()

    return (
        <View className="items-end border-b border-black/10 p-4">
            <AnimatedTap
                className=" py-2 "
                onPress={setOpen}>
                <X size={28} />
            </AnimatedTap>
        </View>
    )
}


SetColorPickerModal.Header = SetColorPickerModalHeader
SetColorPickerModal.Body = SetColorPickerModalBody