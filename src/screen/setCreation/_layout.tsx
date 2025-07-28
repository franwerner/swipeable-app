import useResetStore from "@/hook/useResetStore.hook";
import useSetManagerStore from "@/store/useSetManagerStore.store";
import useUserStore from "@/store/useUser.store";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function SetCreationLayout() {

    useResetStore(useSetManagerStore)
    const updateSet = useSetManagerStore(store => store.updateSet)

    useEffect(() => {
        const user = useUserStore.getState().user
        if (user) {
            const { avatarUrl, nickname, userID } = user
            updateSet({
                userBy: {
                    avatarUrl,
                    nickname,
                    userID
                }
            })
        }

    }, [])

    return <Stack
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: "white"
            }
        }}
    />
}