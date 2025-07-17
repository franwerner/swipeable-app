import colorPalette from "@/constant/colorPalette.constant";
import setItemsMock from "@/mocks/itemList.mock";
import ISet from "@/types/SetInfoInterface.type";
import SetItem from "@/types/SetItemInteface.type";
import { create } from "zustand";


type SetDraft = Pick<ISet, "colors" | "description" | "emojis" | "name" | "visibility" | "topic"> & { items: Array<SetItem> }

interface Methods {
    addItem: (item: SetItem) => void
    removeItem: (itemID: SetItem["itemID"]) => void
    addDescription: (description: string) => void
    toggleVisibility: () => void
    reset: () => void
    updateSet: (v: Partial<SetDraft>) => void
    changeItemToEdit: (i: SetItem) => void
    updateItem: (i: Partial<Omit<SetItem, "itemID">> & { itemID: SetItem["itemID"] }) => void
    removeItemToEdit: (i: string | number) => void
}

type State = {
    setDraft: SetDraft
    itemInEdit?: SetItem
}

type Store = State & Methods
const initialState: State = {
    setDraft: {
        items: setItemsMock.slice(0, 1),
        topic: "Topico de test",
        name: "Peliculas de disney",
        visibility: "private",
        colors: Array.from<string>({ length: 2 }).fill(colorPalette.secondary[200]),
        description: "Description tesing",
        emojis: Array.from<string>({ length: 3 }).fill("🤮")
    },
    itemInEdit: undefined
}

/**
 * Nota: Internamente zustand combina los objectos creando la nueva referencia
 */

const useSetManagerStore = create<Store>((set, get) => ({
    ...initialState,
    updateSet(partial) {
        const { setDraft } = get()
        set({
            setDraft: {
                ...setDraft,
                ...partial
            }
        })
    },
    changeItemToEdit: (itemInEdit) => set({ itemInEdit }),
    removeItem(itemID) {
        const { updateSet, setDraft, removeItemToEdit } = get()
        const items = setDraft.items
        const filteredItems = items.filter(i => i.itemID !== itemID)
        removeItemToEdit(itemID)
        updateSet({ items: filteredItems })
    },
    removeItemToEdit(itemID) {
        const { itemInEdit } = get()
        if (itemInEdit && itemInEdit.itemID === itemID) {
            set({ itemInEdit: undefined })
        }
    },
    updateItem(payload) {
        const { setDraft, updateSet, removeItemToEdit } = get()
        const items = setDraft.items
        const updateItems = items.map(i => (i.itemID === payload.itemID) ? { ...i, ...payload } : i)
        removeItemToEdit(payload.itemID)
        updateSet({ items: updateItems })
        set({ itemInEdit: undefined })

    },
    addItem(item) {
        const { setDraft, updateSet } = get()
        const items = setDraft.items
        const findItem = items.findIndex(i => i.itemID == item.itemID)
        if (findItem >= 0) return
        updateSet({ items: [...items, item] })
    },
    toggleVisibility() {
        const { setDraft, updateSet } = get()
        const currentVisibility = setDraft.visibility
        const toggle = currentVisibility === "public" ? "private" : "public"
        updateSet({ visibility: toggle })
    },
    addDescription: (description) => {
        const { updateSet } = get()
        updateSet({ description: description.slice(0, 255) })
    },
    reset: () => set(initialState),
}))

export default useSetManagerStore