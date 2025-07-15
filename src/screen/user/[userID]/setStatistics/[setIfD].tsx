import BackHeader from "@/components/BackHeader.component";
import { View } from "react-native";
import SetStaticsCard from "./components/SetStatisticCard.component";
import Statics from "./components/Statistics.component";



export default function SetStatics() {

    return (
        <View className="flex-1 gap-8">
            <BackHeader className="mr-[60px] p-6 pb-0 " />
            <SetStaticsCard />
            <Statics />
        </View>
    )
}