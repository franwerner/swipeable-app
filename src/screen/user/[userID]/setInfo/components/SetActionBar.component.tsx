import AnimatedTap from "@/components/AnimatedTap.component"
import colorPalette from "@/constant/colorPalette.constant"
import { router } from "expo-router"
import { Award, LucideIcon, Pencil, Plus } from "lucide-react-native"
import { Text, View } from "react-native"
import useSetInfoStore from "../store/useSetInfo.store"

interface Action {
    label: string
    handler: () => void
    Icon: LucideIcon
}
const Action = ({
    handler,
    Icon,
    label
}: Action) => {
    return (
        <AnimatedTap
            onPress={handler}
            className="flex-row gap-2 p-3 px-4 items-center bg-primary-100 rounded-[100px]">
            <Icon size={25} color={colorPalette.primary[800]} />
            <Text className="text-[14px] text-primary-800">{label}</Text>
        </AnimatedTap>
    )
}

export default function SetActionBar() {


    const setID = useSetInfoStore(state => state.setData?.setID)

    return (
        <View className="flex-row justify-between">
            <Action
                Icon={Plus}
                handler={() => router.navigate({
                    pathname: "/setCreation/setCustomItems",
                })}
                label="Añadir"
            />
            <Action
                Icon={Pencil}
                handler={() => router.navigate({
                    pathname: "/setCreation/setMoreDetails",
                })}
                label="Editar"
            />
            <Action
                Icon={Award}
                handler={() => router.navigate(`../setStatistics/${setID}`)}
                label="Estadísticas"
            />
        </View>
    )
}
