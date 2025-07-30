import AnimatedTap from "@/components/AnimatedTap.component";
import SetCard from "@/components/SetCard.component";
import ISet from "@/types/SetInterface.type";
import User from "@/types/UserInterface.type";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import clsx from "clsx";
import { createContext, forwardRef, memo, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, ViewProps } from "react-native";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import ColorPicker from "react-native-wheel-color-picker";


interface SetColorPickerColor extends ViewProps {
    onChangeColor: (colors: Array<string>) => void

}

interface ColorPickerPreview extends ViewProps {
    cardProps: Pick<ISet, "name" | "emojis" | "items_count"> & Pick<User, "avatarUrl" | "nickname">
}

interface ColorPickerContext {
    colors: Array<string>
    selectedColorIndex: number
    setSelectedColorIndex: (n: number) => void
}

const ColorPickerContext = createContext<ColorPickerContext>({
    colors: [],
    selectedColorIndex: 0,
    setSelectedColorIndex: () => { }
})

const useColorPicker = () => useContext(ColorPickerContext)

type SetColorPicker = BottomSheetModalProps & { colors: Array<string>, renderBackDrop?: boolean }

interface ForwardRefWithBody
    extends React.ForwardRefExoticComponent<
        SetColorPicker & React.RefAttributes<BottomSheetModalMethods>
    > {
    Body: typeof SetColorPickerBody
    Preview: typeof SetColorPickerPreview
    Toggle: typeof SetColorPickerToggle
    Color: typeof SetColorPickerColor
}

const _SetColorPicker = forwardRef<BottomSheetModalMethods, SetColorPicker>(({
    colors,
    renderBackDrop = true,
    children,
    ...props
}, ref) => {
    const [selectedColorIndex, setSelectedColorIndex] = useState(0)
    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={["75%"]}
            enableContentPanningGesture={false}
            backdropComponent={(props) => <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />}
            index={0}
            {...props}
        >
            <ColorPickerContext.Provider
                value={{
                    colors,
                    selectedColorIndex,
                    setSelectedColorIndex
                }}
                children={children as ReactNode}
            />
        </BottomSheetModal>
    )
}
)

interface ToggleColorButton {
    backgroundColor: string
    isActive: boolean
    id: number
    setEditColor: (n: number) => void
}

const ToggleColorButton = memo(({
    backgroundColor,
    isActive,
    setEditColor,
    id
}: ToggleColorButton) => {

    const scale = useSharedValue(0.9)

    useEffect(() => {
        scale.value = withSpring(isActive ? 1.2 : 0.9, {
            damping: 12,
            stiffness: 120,
            mass: 0.4,
        })
    }, [isActive])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    return (
        <AnimatedTap
            onPress={() => setEditColor(id)}
            style={[
                {
                    width: 48,
                    height: 48,
                    backgroundColor: backgroundColor,
                },
                animatedStyle
            ]}
            className="rounded-full border-secondary-400 border">
        </AnimatedTap>
    )
})

function SetColorPickerBody({
    className,
    ...props
}: BottomSheetViewProps) {

    return <BottomSheetView
        className={clsx(
            "p-6 px-4 items-center gap-8 h-full",
            className
        )}
        {...props} />
}

function SetColorPickerToggle() {

    const { colors, selectedColorIndex, setSelectedColorIndex } = useColorPicker()
    const handleEditColor = useCallback(setSelectedColorIndex, [])

    return (
        <View className="gap-4  w-full px-4 flex-row justify-start">
            {
                colors.map((i, index) =>
                    <ToggleColorButton
                        key={index}
                        id={index}
                        backgroundColor={i}
                        isActive={selectedColorIndex === index}
                        setEditColor={handleEditColor}
                    />
                )
            }
        </View>
    )
}

function SetColorPickerColor({
    onChangeColor
}: SetColorPickerColor) {

    const {
        colors,
        selectedColorIndex
    } = useColorPicker()

    const pickerInitial = useMemo(() => colors[selectedColorIndex], [selectedColorIndex])

    const handleSetColor = (color: string) => {
        const copied = [...colors]
        copied[selectedColorIndex] = color
        onChangeColor(copied)
    }

    return (
        <View className="flex-1 mb-2 px-14 w-full">
            <ColorPicker
                color={pickerInitial}
                thumbSize={50}
                autoResetSlider
                sliderHidden
                sliderSize={30}
                onColorChange={handleSetColor}
                swatches={false}
            />
        </View>
    )
}

function SetColorPickerPreview({ cardProps }: ColorPickerPreview) {

    const { colors } = useColorPicker()

    const {
        avatarUrl,
        emojis,
        items_count,
        name,
        nickname
    } = cardProps
    return (
        <SetCard
            colors={colors}>
            <View className="p-5 flex-row justify-between gap-2">
                <SetCard.Title name={name + " " + emojis.join(" ")} />
                <SetCard.Shared />
            </View>
            <SetCard.Body
                items_count={items_count}
                nickname={nickname}
                avatarUrl={avatarUrl}
            />
        </SetCard>
    )
}

const SetColorPicker = _SetColorPicker as ForwardRefWithBody

SetColorPicker.Toggle = SetColorPickerToggle
SetColorPicker.Color = SetColorPickerColor
SetColorPicker.Preview = SetColorPickerPreview
SetColorPicker.Body = SetColorPickerBody
SetColorPicker.displayName = "SetColorPicker"

export default SetColorPicker