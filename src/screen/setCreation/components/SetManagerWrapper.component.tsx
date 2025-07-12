import BackHeader from "@/components/BackHeader.component";
import clsx from "clsx";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SetManagerWrapperWithSafeKeyboard({
    contentContainerClassName,
    ...props
}: ScrollViewProps) {

    return (
        <SafeAreaView className="flex-1">
            <BackHeader titleClassName="mr-[60px]" />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className="flex-1"
                        contentContainerClassName={clsx(
                            "gap-8 p-6",
                            contentContainerClassName
                        )}
                        {...props} />
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default function SetManagerWrapper({
    className,
    ...props
}: ViewProps) {

    return (
        <View
            className="flex-1">
            <BackHeader titleClassName="mr-[60px]" />
            <View
                className={clsx(
                    "gap-8 flex-1 p-6",
                    className
                )}
                {...props}
            />
        </View>
    )
}
