import AnimatedTap from "@/components/AnimatedTap.component";
import SetCard from "@/components/SetCard.component";
import ISet from "@/types/SetInfoInterface.type";
import User from "@/types/UserInterface.type";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from "react";
import { View, ViewProps } from "react-native";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import ColorPicker from "react-native-wheel-color-picker";


interface SetColorPickerBodyProps extends ViewProps {
    colors: ISet["colors"]
    onChangeColor: (colors: Array<string>) => void
    cardProps: Pick<ISet, "name" | "emojis" | "items_count"> & Pick<User, "avatarUrl" | "nickname">
}

interface ForwardRefWithBody
    extends React.ForwardRefExoticComponent<
        BottomSheetModalProps & React.RefAttributes<BottomSheetModalMethods>
    > {
    Body: typeof SetColorPickerBody
}

const _SetColorPicker = forwardRef<BottomSheetModalMethods, BottomSheetModalProps>((props, ref) => {
    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={["75%"]}
            enableContentPanningGesture={false}
            backdropComponent={(p) => (
                <BottomSheetBackdrop
                    {...p}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                />
            )}
            index={0}
            {...props}
        />
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
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColor,
                },
                animatedStyle
            ]}
            className="rounded-full">
        </AnimatedTap>
    )
})

function SetColorPickerBody({
    colors,
    onChangeColor,
    cardProps,
    ...props
}: SetColorPickerBodyProps) {

    const [editColor, setEditColor] = useState(0)

    const {
        avatarUrl,
        emojis,
        items_count,
        name,
        nickname
    } = cardProps

    const pickerInitial = useMemo(() => colors[editColor], [editColor])

    const handleEditColor = useCallback(setEditColor, [])

    const handleSetColor = (color: string) => {
        const copied = [...colors]
        copied[editColor] = color
        onChangeColor(copied)
    }

    return (
        <BottomSheetView
            className="p-6 px-4 items-center gap-8 h-full"
            {...props}
        >
            <View className="gap-4  w-full px-4 flex-row justify-start">
                {
                    colors.map((i, index) =>
                        <ToggleColorButton
                            key={index}
                            id={index}
                            backgroundColor={i}
                            isActive={editColor === index}
                            setEditColor={handleEditColor}
                        />
                    )
                }
            </View>
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
            <View className="flex-1 mb-2 w-full">
                <ColorPicker
                    color={pickerInitial}
                    thumbSize={50}
                    sliderSize={30}
                    onColorChange={handleSetColor}
                    swatches={false}
                />
            </View>
        </BottomSheetView>
    )
}

const SetColorPicker = _SetColorPicker as ForwardRefWithBody

SetColorPicker.Body = SetColorPickerBody
SetColorPicker.displayName = "SetColorPicker"

export default SetColorPicker