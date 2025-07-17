import AnimatedTap from "@/components/AnimatedTap.component"
import Container from "@/components/Container.component"
import Input from "@/components/Input.component"
import colorPalette from "@/constant/colorPalette.constant"
import clsx from "clsx"
import { ListTodo, LucideIcon, Pencil, Plus } from "lucide-react-native"
import { memo } from "react"
import { Text, TextInput, View } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import useItemStage, { ItemStage } from "../hooks/useItemStage.hook"

const AnimatedInput = Animated.createAnimatedComponent(Input)

interface AddItemButtonProps {
    stage: ItemStage
    hasValue: boolean
}

const textForStage: Record<ItemStage, string> = {
    edit: "Guardar cambios",
    create: "Añadir item a la lista",
    none: "Crear item personalizado"
}

const iconForStae: Record<ItemStage, LucideIcon> = {
    create: Plus,
    edit: Pencil,
    none: ListTodo
}

const AddItemButton = memo(({
    stage,
    hasValue
}: AddItemButtonProps) => {
    const Icon = iconForStae[stage]
    const isActive = hasValue && stage !== "none"
    return (
        <Container className={clsx(
            "bg-white",
            isActive && "!bg-primary-500"
        )}>
            <Text className={clsx(
                "color-primary-800 font-semibold text-[16px]",
                isActive && "!color-white ",

            )}>
                {textForStage[stage]}
            </Text>
            <Icon
                color={isActive ? "white" : colorPalette.primary["800"]}
                size={24} />
        </Container>
    )
})


export default function AddItem() {

    const {
        action,
        hasValues,
        onChangeEmoji,
        onChangeTitle,
        stage,
        emoji,
        title
    } = useItemStage()

    return (
        <View className="gap-3">
            <AnimatedTap
                onPress={action}>
                <AddItemButton
                    stage={stage}
                    hasValue={hasValues}
                />
            </AnimatedTap>
            {
                stage !== "none" &&
                <AnimatedInput
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(300)}
                    className="pr-3"
                    isActive={hasValues}
                    inputProps={{
                        value: title,
                        onChangeText: onChangeTitle,
                        placeholder: "¡Prueba con texto y un emoji!",
                    }}
                    endComponent={
                        <TextInput
                            className="px-3 text-2xl"
                            placeholder="❓"
                            value={emoji}
                            onChangeText={onChangeEmoji}
                        />
                    }
                />
            }
        </View>
    )
}
