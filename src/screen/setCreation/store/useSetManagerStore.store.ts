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
    toggleItemEdit: (i: SetItem) => void
    updateItem: (i: Partial<Omit<SetItem, "itemID">> & { itemID: SetItem["itemID"] }) => void
    clearEditIfMatch: (id: SetItem["itemID"]) => void
    toggleItem: (item: SetItem) => void
}

type State = {
    setDraft: SetDraft
    itemInEdit: SetItem | null
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
    itemInEdit: null
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
    toggleItemEdit: (itemInEdit) => {
        const { itemInEdit: currentItemInEdit } = get()
        const isSame = currentItemInEdit?.itemID === itemInEdit.itemID
        set({ itemInEdit: isSame ? null : itemInEdit })
    },
    clearEditIfMatch(itemID) {
        const { itemInEdit } = get()
        if (itemID === itemInEdit?.itemID) {
            set({ itemInEdit: null })
        }
    },
    updateItem(payload) {
        const { setDraft, updateSet, clearEditIfMatch } = get()
        const items = setDraft.items
        const updateItems = items.map(i => (i.itemID === payload.itemID) ? { ...i, ...payload } : i)
        clearEditIfMatch(payload.itemID)
        updateSet({ items: updateItems })
    },
    removeItem(itemID) {
        const { updateSet, setDraft, clearEditIfMatch } = get()
        const items = setDraft.items
        clearEditIfMatch(itemID)
        updateSet({ items: items.filter(i => i.itemID !== itemID) })
    },
    addItem(item) {
        const { setDraft, updateSet } = get()
        const items = setDraft.items
        updateSet({ items: [...items, item] })
    },
    toggleItem(item) {
        const { setDraft, addItem, removeItem } = get()
        const { items } = setDraft
        const some = items.some(i => i.itemID == item.itemID)
        if (some) {
            removeItem(item.itemID)
        } else {
            addItem(item)
        }
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