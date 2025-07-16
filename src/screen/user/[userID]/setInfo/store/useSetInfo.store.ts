import SetInfo from "@/types/SetInfoInterface.type"
import { create } from "zustand"
import setInfoMock from "../../../../../mocks/setInfo.mock"


interface State {
    setInfo?: SetInfo
}

type PartialSetInfo = Partial<SetInfo>

interface Methods {
    updateSetInfo: (info: PartialSetInfo) => void
    addSetInfo: (info: SetInfo) => void
    reset: () => void
}

type Store = State & Methods

const initialState: State = {
    setInfo: setInfoMock
}


const useSetInfoStore = create<Store>((set, get) => ({
    ...initialState,
    addSetInfo: (setInfo) => set({ setInfo }),
    updateSetInfo(info) {
        const setInfo = get().setInfo
        if (!setInfo) return
        const currentInfo = { ...setInfo, ...info }
        set({ setInfo: currentInfo })
    },
    reset: () => set(initialState),
}))

export default useSetInfoStore;