import setItemsMock from "@/mocks/itemList.mock"
import setListMock from "@/mocks/setList.mock"
import { default as ISet, default as SetInfo } from "@/types/SetInfoInterface.type"
import SetItem from "@/types/SetItemInteface.type"
import { create } from "zustand"


interface State {
    setData: ISet
    items: Array<SetItem>
}

type PartialSetInfo = Partial<SetInfo>

interface Methods {
    updateSetInfo: (info: PartialSetInfo) => void
    addSetInfo: (info: SetInfo) => void
    reset: () => void
    loadItems : (items:Array<SetItem>) => void
}

type Store = State & Methods

const initialState: State = {
    setData: setListMock[0],
    items : setItemsMock
}

//Aca combinaremos el store de create set(Solo lo necesario)


const useSetStore = create<Store>((set, get) => ({
    ...initialState,
    addSetInfo: (setData) => set({ setData }),
    updateSetInfo(info) {
        const setInfo = get().setData
        if (!setInfo) return
        const currentInfo = { ...setInfo, ...info }
        set({ setData: currentInfo })
    },
    loadItems : (items) => set({items}),
    reset: () => set(initialState),
}))

export default useSetStore;