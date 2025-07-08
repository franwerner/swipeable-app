import AnimatedTap from "@/components/AnimatedTap.component"
import Input, { InputProps } from "@/components/Input.component"
import { ChevronRight, X } from "lucide-react-native"
import { Keyboard } from "react-native"



export default function SetInput({
    inputProps,
    ...props
}: InputProps) {
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
                        className="h-full justify-center"
                        onPress={() => {
                            onChangeText && onChangeText("")
                            Keyboard.dismiss()
                        }}
                    >
                        <X color={"#443976"} />
                    </AnimatedTap>
                    :
                    <ChevronRight color={"#443976"} />

            }
        />
    )
}