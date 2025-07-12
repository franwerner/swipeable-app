import Input from "@/components/Input.component"
import colorPalette from "@/constant/colorPalette.constant"
import { Search } from "lucide-react-native"
import { useState } from "react"


export default function InputSearch() {

    const [value, setValue] = useState("")

    return (

        <Input
            isActive={value.length > 0}
            className="flex-1 rounded-[50px] gap-x-2 !h-[70px]"
            startCompoent={
                <Search
                    size={24}
                    color={colorPalette.primary[800]} />
            }
            inputProps={{
                placeholderTextColor: colorPalette.primary[800],
                placeholder: "Busca ideas, temas o cradores",
                value,
                onChangeText: setValue,
                className: "!text-[14px]",
            }}
        >
        </Input>

    )
}
