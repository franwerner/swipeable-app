import { useRouter } from "expo-router";
import { Home, Plus, User } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function NavigationBar() {
    const { navigate } = useRouter()

    return (
        <View className="flex-row items-center justify-around bg-gray-100 rounded-3xl mx-5 py-2 shadow-md">
            <TouchableOpacity onPress={() => navigate("/home")} >
                <Home strokeWidth={1} size={32} />
                <Text className="text-sm text-center">Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate("/setManager")}>
                <View className="bg-gray-800 p-2 rounded-full">
                    <Plus color="white" size={32} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }} className="items-center">
                <User strokeWidth={1} size={32} />
                <Text className="text-sm text-center">Cuenta</Text>
            </TouchableOpacity>
        </View>
    );
}
