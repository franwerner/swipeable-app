import BackButton from "@/components/BackHeader.component"
import { useEffect } from "react"
import { View } from "react-native"
import SetManagerBackgroundImage from "./components/SetBackgroundImage.component"
import SetInput from "./components/SetInput.component"



export default function SetManagerScreen() {

    useEffect(() => {
        console.log("SETMANAGERSCREEN MOUNT")
        return () => console.log("SETMANAGERSCREEN DESMOUNT")
    }, [])

    return (
        <View className="gap-8">
            <BackButton />
            <SetManagerBackgroundImage />
            <SetInput />
        </View>
    )
}