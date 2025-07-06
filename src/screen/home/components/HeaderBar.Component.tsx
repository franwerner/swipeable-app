import { Bell } from "lucide-react-native";
import { Image, Text, View } from "react-native";


function Avatar() {
    return (
        <Image
            className="w-[60px] h-[60px] rounded-full"
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} />
    )
}

function Title() {
    return <Text className="text-2xl flex-1 text-center font-bold">Swipeable</Text>
}

function Notification() {
    return (
        <View className="bg-primary-100 w-[60px] h-[60px] rounded-full justify-center  items-center">
            <Bell size={24} color={"#443976"} />
        </View>
    )

}
export default function HeaderBar() {

    return (
        <View className="mx-6  flex-row items-center  mt-8">
            <Avatar />
            <Title />
            <Notification />
        </View>
    )
}
