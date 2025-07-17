import useResetStore from "@/hook/useResetStore.hook";
import { Stack } from "expo-router";
import useSetManagerStore from "./store/useSetManagerStore.store";

export default function SetCreationLayout() {

    useResetStore(useSetManagerStore)

    return <Stack
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: "white"
            }
        }}
    />
}