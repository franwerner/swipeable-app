import AnimatedTap from "@/components/AnimatedTap.component"
import colorPalette from "@/constant/colorPalette.constant"
import { LucideIcon } from "lucide-react-native"
import { Text } from "react-native"

interface SetAction {
    label: string
    handler: () => void
    Icon: LucideIcon
}

export default function SetAction({
    handler,
    Icon,
    label
}: SetAction) {
    return (
        <AnimatedTap
            onStartShouldSetResponder={() => true}
            onPress={handler}
            className="flex-row gap-2 p-3 px-4 items-center bg-primary-100 rounded-[100px]">
            <Icon size={25} color={colorPalette.primary[800]} />
            <Text className="text-[14px] text-primary-800">{label}</Text>
        </AnimatedTap>
    )
}