import { Image, ImageProps, View } from "react-native";


export default function SetImageBackground(props: ImageProps) {

    return (
        <View className="items-center">
            <Image
                resizeMode="contain"
                {...props}
            />
        </View>
    )
}