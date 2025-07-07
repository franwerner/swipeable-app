import { ReactNode } from "react"
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface SafeInputKeyboardProps {
    children: ReactNode
}
export default function SafeInputKeyboard({
    children
}: SafeInputKeyboardProps) {

    return (
        <SafeAreaView>
            <ScrollView className="flex-1">
                <TouchableWithoutFeedback
                    className="flex-1"
                    accessible={false}
                    onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        className="flex-1"
                        behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
                        {children}
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    )
}
