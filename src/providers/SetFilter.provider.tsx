import { createContext, ReactNode, useCallback, useContext, useState } from "react"

type SelectedOptions = Partial<Record<string, Array<string>>>

export interface SetFilterContext {
    handleSelectedOptions: (options: SelectedOptions) => void
    selectedOptions: SelectedOptions
}

const SetFilterContext = createContext<SetFilterContext>({
    handleSelectedOptions: () => { },
    selectedOptions: {}
})

interface SetFilterProviderProps {
    children: ReactNode
}

export const useSetFilter = () => {
    return useContext(SetFilterContext)
}


export default function SetFilterProvider({ children }: SetFilterProviderProps) {

    const [selectedOptions, setOptions] = useState<SelectedOptions>({})

    const handleSelectedOptions = useCallback((options: SelectedOptions) => {
        setOptions(options)
    }, [])

    return (
        <SetFilterContext.Provider value={{
            selectedOptions,
            handleSelectedOptions
        }}>
            {children}
        </SetFilterContext.Provider>
    )
}