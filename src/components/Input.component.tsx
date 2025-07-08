import clsx from "clsx";
import { ReactNode } from "react";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import SafeInputKeyboard from "./SafeInputKeyboard.component";


export interface InputProps extends ViewProps {
    inputProps?: TextInputProps
    endComponent?: ReactNode
    startCompoent?: ReactNode
}

export default function Input({
    inputProps = {},
    className,
    endComponent,
    startCompoent,
    ...props
}: InputProps) {
    return (
        <SafeInputKeyboard>
            <View className={clsx(
                "border pr-6 rounded-[16px] h-[64px] border-primary-200 items-center flex-row",
                className,
            )}
                {...props}
            >
                {startCompoent}
                <TextInput
                    placeholderTextColor={"#514093"}
                    {...inputProps}
                    className={clsx(
                        "flex-1 pl-6 text-[16px] font-medium h-full",
                        inputProps.className
                    )}
                />
                {endComponent}
            </View>
        </SafeInputKeyboard>
    )
}

