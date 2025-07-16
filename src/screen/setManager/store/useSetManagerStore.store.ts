import colorPalette from "@/constant/colorPalette.constant";
import itemList from "@/mocks/itemList.mock";
import SetItem from "@/types/SetItemInteface.type";
import { create } from "zustand";

type Visibility = SetItem["visibility"]

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
    removeItem: (itemID: string) => void
    addColors: (colors: Array<string>) => void
    addDescription: (description: string) => void
    toggleVisibility: () => void
    reset: () => void
}

type Store = State & Methods
const initialState: State = {
    items: itemList.slice(0, 7),
    name: "Test",
    topic: "",
    visibility: "private",
    colors: Array.from<string>({ length: 3 }).fill(colorPalette.secondary[200]),
    description: "",
}

/**
 * Nota: Internamente zustand combina los objectos creando la nueva referencia
 */



const useSetManagerStore = create<Store>((set, get) => ({
    ...initialState,
    addTopic: (topic) => set({ topic }),
    addName: (name) => set({ name }),
    addItem(item) {
        const items = get().items
        const isIncludes = items.find(i => i.id == item.id)
        const filterRepeted = isIncludes ? items.filter(i => i.id !== item.id) : [...items, item]
        set({ items: filterRepeted })
    },
    removeItem(itemID) {
        const items = get().items
        const filteredItems = items.filter(i => i.id !== itemID)
        set({ items: filteredItems })
    },
    toggleVisibility() {
        const currentVisibility = get().visibility
        const toggle = currentVisibility === "public" ? "private" : "public"
        set({ visibility: toggle })
    },
    addColors: (colors) => set({ colors }),
    addDescription: (description) => set({ description: description.slice(0, 255) }),
    reset: () => set(initialState),
}))


export default useSetManagerStore