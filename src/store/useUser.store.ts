import userMock from "@/mocks/user.mocks";
import User from "@/types/UserInterface.type";
import { create } from "zustand";

interface Methods {
    setUser: (user: User) => void
    reset: () => void
}

interface State {
    user?: User
}

type Store = State & Methods

const initialState: State = {
}

const useUserStore = create<Store>((set) => ({
    user: userMock,
    setUser: (user) => set({ user }),
    reset: () => set(initialState)
}))

export default useUserStore;