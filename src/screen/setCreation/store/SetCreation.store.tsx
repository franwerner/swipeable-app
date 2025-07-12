import colorPalette from "@/constant/colorPalette.constant"
import { SetItem } from "@/types/SetItemInteface.type"
import { useEffect } from "react"
import { create } from "zustand"
import itemList from "../mocks/itemList.mock"


type Visibility = "public" | "private"

interface State {
    topic: string
    name: string
    visibility: Visibility,
    items: Array<SetItem>
    colors: Array<string>
    description: string
}

interface Methods {
    addTopic: (topic: string) => void
    addName: (name: string) => void
    addItem: (item: SetItem) => void
    addColors: (colors: Array<string>) => void
    addDescription: (description: string) => void
    toggleVisibility: () => void
}

type Store = State & Methods
const initialState: State = {
    items: itemList.slice(0, 3),
    name: "",
    topic: "",
    visibility: "private",
    colors: Array.from<string>({ length: 2 }).fill(colorPalette.secondary[200]),
    description: "asdasdsad asdasd asdasdasdasdassadsadasdasdasdasdasd asdsadasdasdasdasdsadasdasdasdsdasd",
}

/**
 * Nota: Internamente zustand combina los objectos creando la nueva referencia
 */

const useSetCreationStore = create<Store>((set, get) => ({
    ...initialState,
    addTopic: (topic) => set({ topic }),
    addName: (name) => set({ name }),
    addItem(item) {
        const items = get().items
        const isIncludes = items.find(i => i.id == item.id)
        const filterRepeted = isIncludes ? items.filter(i => i.id !== item.id) : [...items, item]
        set({ items: filterRepeted })
    },
    toggleVisibility() {
        const currentVisibility = get().visibility
        const toggle = currentVisibility === "public" ? "private" : "public"
        set({ visibility: toggle })
    },
    addColors: (colors) => set({ colors }),
    addDescription: (description) => set({ description: description.slice(0, 225) }),
    reset: () => set(initialState)
}))

export const useResetCreationStore = () => {
    const reset = useSetCreationStore((store: any) => store.reset)
    useEffect(() => {
        return () => reset()
    }, [])
}

export default useSetCreationStore