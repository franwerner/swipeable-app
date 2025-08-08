import BackHeader from "@/components/BackHeader.component";
import clsx from "clsx";
import { Keyboard, ScrollViewProps, TouchableWithoutFeedback, View, ViewProps } from "react-native";

export function SetManagerWrapperWithSafeKeyboard({
    contentContainerClassName,
    ...props
}: ScrollViewProps) {

    return (
        <View className="flex-1 gap-4 p-6 pb-3">
            <BackHeader titleClassName="mr-[60px] " />
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}>
                <View
                    className={clsx(
                        "gap-8 flex-1 ",
                        contentContainerClassName
                    )}
                    {...props}
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default function SetManagerWrapper({
    className,
    ...props
}: ViewProps) {

    return (
        <View
            className="flex-1 p-6 pb-3 gap-4">
            <BackHeader titleClassName="mr-[60px]" />
            <View
                className={clsx(
                    "gap-8 flex-1 ",
                    className
                )}
                {...props}
            />
        </View>
    )
}
