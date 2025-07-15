import { useEffect } from "react";
import { StoreApi, UseBoundStore } from "zustand";

//Se borra unicamente al desmontarse complamente el componente
export default function useResetStore(store: UseBoundStore<StoreApi<{ reset: () => void }>>) {
    const reset = store((state) => state.reset)
    useEffect(() => {
        return () => reset()
    }, [])
}