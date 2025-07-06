
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ReactNode } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

interface BottomSheetProviderProps {
    children: ReactNode
}
export default function BottomSheetProvider({ children }: BottomSheetProviderProps) {

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                {children}
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

