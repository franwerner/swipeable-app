import AnimatedTap from "@/components/AnimatedTap.component";
import Avatar from "@/components/Avatar.component";
import colorPalette from "@/constant/colorPalette.constant";
import { useSafeStoreValue } from "@/hook/useSafeStoreValue.hook";
import useUserStore from "@/store/useUser.store";
import CircleDecoration from "@/ui-components/CircleDecoration.ui-component";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { Text, View } from "react-native";

function PerfilAvatar() {
    const {
        avatarUrl,
    } = useSafeStoreValue(useUserStore, (state) => state.user)
    return (
        <AnimatedTap onPress={() => router.navigate(`/set/1/info`)}>
            <Avatar source={{ uri: avatarUrl }} />
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
            <PerfilAvatar />
            <Title />
            <Notification />
        </View>
    )
}
