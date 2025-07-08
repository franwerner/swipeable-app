import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, TextInput, View } from "react-native";

export default function SetInput() {

    const [value, setValue] = useState("")

    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView
                className="flex-1"
                keyboardVerticalOffset={60}
                behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
                <View className="border mx-6 px-6 rounded-[16px] h-[64px] border-primary-100 items-center flex-row">
                    <TextInput
                        onChangeText={setValue}
                        value={value}
                        placeholderTextColor={"#443976"}
                        placeholder="¿De qué tópico quieres hablar?"
                        className="flex-1 text-md"
                    />
                    <ChevronRight color={"#443976"} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}