import { useLocalSearchParams } from "expo-router";

const modeOptions = ["create", "edit"] as const
type Mode = typeof modeOptions[number]

type LocalSearchParams = {
    setManagerMode?: string
    customItemMode?: string
}

function isMode(value: any): value is Mode {
    return modeOptions.includes(value)
}

export default function useSetManagerMode() {
    const { customItemMode, setManagerMode } = useLocalSearchParams<LocalSearchParams>()

    const verifyCustomItemMode = isMode(customItemMode)
    return {
        setManagerMode: isMode(setManagerMode) ? setManagerMode : (verifyCustomItemMode ? "edit" : "create"),
        customItemMode: verifyCustomItemMode ? customItemMode : undefined,
    }
}