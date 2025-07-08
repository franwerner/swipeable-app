import Button, { ButtonProps } from "@/components/Button.component";
import { Href, router } from "expo-router";
import { Text } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";


const FaddedButton = Animated.createAnimatedComponent(Button)


interface NextButtonProps extends ButtonProps {
    text?: string
    href: Href
    nextStepAllowed?: boolean
}

export default function NextButton({
    text = "Siguiente",
    onPress,
    href,
    nextStepAllowed,
    ...props
}: NextButtonProps) {

    return nextStepAllowed &&
        <FaddedButton
            onPress={(e) => {
                router.navigate(href)
                onPress && onPress(e)
            }}
            exiting={FadeOut.duration(200)}
            {...props}
        >
            <Text className="text-white text-xl font-semibold">
                {text}
            </Text>
        </FaddedButton>
}
