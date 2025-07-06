import { Search } from "lucide-react-native"
import { useState } from "react"
import { ActivityIndicator, TextInput, View } from "react-native"

interface InputSearchProps {
    isLoading: boolean
}

export default function InputSearch({ isLoading }: InputSearchProps) {

    const [value, setValue] = useState("")

    return (
        <View className="border items-center flex-1 gap-3 px-5 flex-row py-4  relative border-primary-200 rounded-[50px] ">
            <Search size={24} color={"#443976"} />
            <TextInput
                className="flex-1"
                placeholderTextColor={"#443976"}
                placeholder="Busca ideas, temas o creadores"
                onChangeText={setValue}
                value={value} />
            {isLoading &&
                <ActivityIndicator
                    className="color-primary-900"
                    size={28} />
            }
        </View>
    )
}