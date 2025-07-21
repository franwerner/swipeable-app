import setListMock from "@/mocks/setList.mock"
import { default as ISet, default as SetInfo } from "@/types/SetInfoInterface.type"
import { create } from "zustand"


interface State {
    setData?: ISet
}

type PartialSetInfo = Partial<SetInfo>

interface Methods {
    updateSetInfo: (info: PartialSetInfo) => void
    addSetInfo: (info: SetInfo) => void
    reset: () => void
}

type Store = State & Methods

const initialState: State = {
    setData: setListMock[0]
}


const useSetInfoStore = create<Store>((set, get) => ({
    ...initialState,
    addSetInfo: (setData) => set({ setData }),
    updateSetInfo(info) {
        const setInfo = get().setData
        if (!setInfo) return
        const currentInfo = { ...setInfo, ...info }
        set({ setData: currentInfo })
    },
    reset: () => set(initialState),
}))

export default useSetInfoStore;