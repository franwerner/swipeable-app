import Button, { ButtonProps } from "@/components/Button.component";
import { Text } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";


const FaddedButton = Animated.createAnimatedComponent(Button)

interface NextButtonProps extends ButtonProps {
    text?: string
    nextStepAllowed?: boolean
}

export default function NextButton({
    text = "Siguiente",
    onPress,
    nextStepAllowed,
    ...props
}: NextButtonProps) {

    return nextStepAllowed &&
        <FaddedButton
            onPress={onPress}
            exiting={FadeOut.duration(200)}
            {...props}
        >
            <Text className="text-white text-xl font-semibold">
                {text}
            </Text>
        </FaddedButton>
}
