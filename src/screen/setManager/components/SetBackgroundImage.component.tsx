import { Image, View } from "react-native"

export default function SetManagerBackgroundImage() {
    return (
        <View className="items-center mx-6">
            <Image
                resizeMode="cover"
                className="w-[360px] h-[360px]"
                source={require("@/assets/images/setBg2.png")} />
        </View>
    )
}