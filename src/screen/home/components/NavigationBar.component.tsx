import AnimatedTap from "@/components/AnimatedTap.component";
import { useRouter } from "expo-router";
import { Home, Plus, User } from "lucide-react-native";
import { Text, View } from "react-native";

export default function NavigationBar() {
    const { navigate } = useRouter()

    return (
        <View className="py-6">
            <View className="flex-row items-center justify-around bg-[#f7f4f4] rounded-3xl mx-5 py-3 shadow-2xl">
                <AnimatedTap onPress={() => navigate("/home")} >
                    <Home
                        strokeWidth={1}
                        size={32} />
                    <Text className="text-sm text-center">Inicio</Text>
                </AnimatedTap>
                <AnimatedTap
                    className="bg-gray-800 p-2 rounded-full"
                    onPress={() => navigate("/setManager")}>
                    <Plus
                        color="white"
                        size={32} />
                </AnimatedTap>
                <AnimatedTap
                    onPress={() => { }}
                    className="items-center">
                    <User
                        strokeWidth={1}
                        size={32} />
                    <Text className="text-sm text-center">Cuenta</Text>
                </AnimatedTap>
            </View>
        </View>
    );
}
