import { Stack } from "expo-router";
import { useResetCreationStore } from "./store/SetCreation.store";

export default function SetCreationLayout() {

    useResetCreationStore()

    return <Stack
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: "white"
            }
        }}
    />
}