import { ReactNode } from "react"
import { KeyboardAvoidingView, Platform } from "react-native"

interface SafeInputKeyboardProps {
    children: ReactNode
}
export default function SafeInputKeyboard({
    children
}: SafeInputKeyboardProps) {

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
            {children}
        </KeyboardAvoidingView>
    )
}
