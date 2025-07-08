import BackButton from "@/components/BackHeader.component"
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import SetManagerBackgroundImage from "./components/SetBackgroundImage.component"
import SetInput from "./components/SetInput.component"



export default function SetManagerScreen() {

    return (
        <SafeAreaView className="flex-1">
            <BackButton />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView className="flex-1">
                        <SetManagerBackgroundImage />
                        <SetInput />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}