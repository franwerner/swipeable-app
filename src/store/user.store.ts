import userMock from "@/mocks/user.mocks";
import User from "@/types/UserInterface.type";
import { create } from "zustand";


interface Methods {
    setUser: (user: User) => void
}

type State = Partial<User> & Methods

const initialState: Partial<User> = {
    id: undefined,
    name: undefined,
    lastname: undefined,
}

const useUserStore = create<State>((set) => ({
    ...userMock,
    setUser: (newUser) => set({ ...newUser }),
    reset: () => set(initialState)
}))

export default useUserStore;