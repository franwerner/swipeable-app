import colorPalette from "@/constant/colorPalette.constant";
import setItemsMock from "@/mocks/itemList.mock";
import ISet from "@/types/SetInterface.type";
import SetItem from "@/types/SetItemInteface.type";
import { create } from "zustand";


type setConfig = Pick<ISet, "colors" | "description" | "emojis" | "name" | "visibility" | "topic" | "userBy">

interface Methods {
    addItem: (item: SetItem) => void
    removeItem: (itemID: SetItem["itemID"]) => void
    addDescription: (description: string) => void
    toggleVisibility: () => void
    reset: () => void
    updateSet: (v: Partial<setConfig>) => void
    toggleItemEdit: (i: SetItem) => void
    updateItem: (i: Partial<Omit<SetItem, "itemID">> & { itemID: SetItem["itemID"] }) => void
    _removeItemEdit: () => void
    toggleItem: (item: SetItem) => void
}

type State = {
    setConfig: setConfig
    items: Array<SetItem>
    itemInEdit: SetItem | null
}

type Store = State & Methods

const initialState: State = {
    setConfig: {
        topic: "Topico de test",
        name: "Peliculas de disney",
        visibility: "private",
        colors: Array.from<string>({ length: 2 }).fill(colorPalette.secondary[200]),
        description: "Description tesing",
        emojis: Array.from<string>({ length: 3 }).fill(""),
        userBy: {
            avatarUrl: "",
            nickname: "",
            userID: 0
        }
    },
    items: setItemsMock.slice(0, 5),
    itemInEdit: null
}

/**
 * Nota: Internamente zustand combina los objectos creando la nueva referencia
 */

const useSetManagerStore = create<Store>((set, get) => ({
    ...initialState,
    updateSet(partial) {
        const { setConfig } = get()
        set({
            setConfig: {
                ...setConfig,
                ...partial
            }
        })
    },
    toggleVisibility() {
        const { setConfig, updateSet } = get()
        const currentVisibility = setConfig.visibility
        const toggle = currentVisibility === "public" ? "private" : "public"
        updateSet({ visibility: toggle })
    },
    addDescription: (description) => {
        const { updateSet } = get()
        updateSet({ description: description.slice(0, 255) })
    },
    toggleItemEdit: (itemInEdit) => {
        const { itemInEdit: currentItemInEdit } = get()
        const isSame = currentItemInEdit?.itemID === itemInEdit.itemID
        set({ itemInEdit: isSame ? null : itemInEdit })
    },
    _removeItemEdit() {
        set({ itemInEdit: null })
    },
    updateItem(payload) {
        const { items, _removeItemEdit } = get()
        const updateItems = items.map(i => (i.itemID === payload.itemID) ? { ...i, ...payload } : i)
        _removeItemEdit()
        set({ items: updateItems })
    },
    removeItem(itemID) {
        const { items, _removeItemEdit } = get()
        _removeItemEdit()
        set({ items: items.filter(i => i.itemID !== itemID) })
    },
    addItem(item) {
        const { items } = get()
        set({ items: [...items, item] })
    },
    toggleItem(item) {
        const { items, addItem, removeItem } = get()
        const some = items.some(i => i.itemID == item.itemID)
        if (some) {
            removeItem(item.itemID)
        } else {
            addItem(item)
        }
    },
    reset: () => set(initialState),
}))

export default useSetManagerStore