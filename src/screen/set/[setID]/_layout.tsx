import useResetStore from "@/hook/useResetStore.hook";
import setItemsMock from "@/mocks/itemList.mock";
import setListMock from "@/mocks/setList.mock";
import useSetManagerStore from "@/store/useSetManagerStore.store";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function SetLayout() {

    useResetStore(useSetManagerStore)
    const updateSet = useSetManagerStore(store => store.updateSet)
    const loadItems = useSetManagerStore(store => store.loadItems)

    useEffect(() => {
        /**
         * Solo carga para prueba.
         */
        updateSet(setListMock[0])
        loadItems(setItemsMock)
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