import { router } from "expo-router"
import { Award } from "lucide-react-native"
import { View } from "react-native"
import AddItem from "./AddItem.actionbar"
import EditSet from "./EditSet.actionbar"
import SetAction from "./SetAction.actionbar"

export default function SetActionBar() {

    return (
        <View className="flex-row justify-between">
            <AddItem />
            <EditSet />
            <SetAction
                Icon={Award}
                handler={() => router.navigate(`./statistics`)}
                label="Estadísticas"
            />
        </View>
    )
}