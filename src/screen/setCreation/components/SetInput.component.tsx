import AnimatedTap from "@/components/AnimatedTap.component"
import Input, { InputProps } from "@/components/Input.component"
import { ChevronRight, X } from "lucide-react-native"
import { Keyboard, View } from "react-native"

type SetInputProps = Omit<InputProps, "endComponent">

export default function SetInput({
    inputProps,
    ...props
}: SetInputProps) {
    const value = inputProps?.value || ""
    const hasValue = value.length > 0
    const onChangeText = inputProps?.onChangeText
    return (
        <Input
            style={{
                borderColor: hasValue ? "#000" : "#ced0f7"
            }}
            inputProps={{
                ...inputProps,
            }}
            {...props}
            endComponent={
                hasValue ?
                    <AnimatedTap
                        className="h-full px-2 justify-center"
                        onPress={(e) => {
                            onChangeText && onChangeText("")
                            Keyboard.dismiss()
                        }}
                    >
                        <X color={"#443976"} />
                    </AnimatedTap>
                    :
                    <View className="px-2 " >
                        <ChevronRight color={"#443976"} />
                    </View>

            }
        />
    )
}