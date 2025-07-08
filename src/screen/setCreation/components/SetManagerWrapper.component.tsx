import BackHeader from "@/components/BackHeader.component";
import clsx from "clsx";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const classNameShared = "gap-8 m-6 flex-1"

export function SetManagerWrapperWithSafeKeyboard({
    contentContainerClassName,
    ...props
}: ScrollViewProps) {

    return (
        <SafeAreaView className="flex-1">
            <BackHeader />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        className="flex-1"
                        contentContainerClassName={clsx(
                            classNameShared,
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
            <BackHeader />
            <View
                className={clsx(
                    classNameShared,
                    className
                )}
                {...props}
            />
        </View>
    )
}
