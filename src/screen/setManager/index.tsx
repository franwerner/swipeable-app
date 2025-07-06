import { useRouter } from "expo-router"
import { Pressable, Text } from "react-native"

export default function SetManagerScreen() {

    const { navigate } = useRouter()

    return (
        <Pressable
            onPress={() => navigate("/home")}
        >
            <Text>Ir home</Text>
        </Pressable>
    )
}