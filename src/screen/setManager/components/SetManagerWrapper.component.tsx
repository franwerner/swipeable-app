import BackHeader from "@/components/BackHeader.component";
import clsx from "clsx";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps, TouchableWithoutFeedback, View, ViewProps } from "react-native";

export function SetManagerWrapperWithSafeKeyboard({
    contentContainerClassName,
    ...props
}: ScrollViewProps) {

    return (
        <View className="flex-1 gap-4 p-6">
            <BackHeader titleClassName="mr-[60px] " />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerClassName={clsx(
                            "gap-8 flex-1",
                            contentContainerClassName
                        )}
                        {...props} />
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

export default function SetManagerWrapper({
    className,
    ...props
}: ViewProps) {

    return (
        <View
            className="flex-1 p-6 gap-4">
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
