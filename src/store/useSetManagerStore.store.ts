import colorPalette from "@/constant/colorPalette.constant";
import ISet from "@/types/SetInterface.type";
import SetItem from "@/types/SetItemInteface.type";
import { create } from "zustand";


type setConfig = ISet

interface Methods {
    addDescription: (description: string) => void
    toggleVisibility: () => void
    reset: () => void
    loadItems: (i: Array<SetItem>) => void
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
        setID: 0,
        topic: "",
        name: "",
        visibility: "private",
        colors: Array.from<string>({ length: 2 }).fill(colorPalette.secondary[200]),
        description: "",
        emojis: Array.from<string>({ length: 3 }).fill(""),
        items_count: 0,
        likeStatus: false,
        userBy: {
            avatarUrl: "",
            nickname: "",
            userID: 1
        }
    },
    items: [],
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
    loadItems(items: Array<SetItem>) {
        set({ items })
    },
    updateItem(payload) {
        const { items, _removeItemEdit } = get()
        const updateItems = items.map(i => (i.itemID === payload.itemID) ? { ...i, ...payload } : i)
        _removeItemEdit()
        set({ items: updateItems })
    },
    toggleItem(item) {
        const { items, _removeItemEdit, updateSet, setConfig } = get()
        const some = items.some(i => i.itemID == item.itemID)
        if (some) {
            set({ items: items.filter(i => i.itemID !== item.itemID) })
            _removeItemEdit()
            updateSet({
                items_count: setConfig.items_count - 1
            })
        } else {
            set({ items: [...items, item] })
            updateSet({
                items_count: setConfig.items_count + 1
            })
        }
    },
    reset: () => set(initialState),
}))

export default useSetManagerStore