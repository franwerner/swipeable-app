import AnimatedTap from "@/components/AnimatedTap.component";
import colorPalette from "@/constant/colorPalette.constant";
import useUserStore from "@/store/useUser.store";
import CircleDecoration from "@/ui-components/CircleDecoration.ui-component";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { Image, Text, View } from "react-native";

function Avatar() {
    const userID = useUserStore(state => state.user.id)
    return (
        <AnimatedTap onPress={() => router.navigate(`/user/${userID}/setInfo/1`)}>
            <CircleDecoration className="overflow-hidden">
                <Image
                    className="w-full h-full"
                    source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} />
            </CircleDecoration>
        </AnimatedTap>
    )
}

function Title() {
    return <Text className="text-2xl flex-1 text-center font-bold">Swipeable</Text>
}

function Notification() {
    return (
        <CircleDecoration className="justify-center  items-center">
            <Bell size={24} color={colorPalette.primary[800]} />
        </CircleDecoration>
    )

}

export default function HeaderBar() {

    return (
        <View className=" flex-row items-center">
            <Avatar />
            <Title />
            <Notification />
        </View>
    )
}
