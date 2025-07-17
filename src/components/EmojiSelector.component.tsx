import { createContext, ReactNode, useContext, useLayoutEffect, useRef, useState } from "react"
import { Modal, Pressable, PressableProps, TouchableNativeFeedback, View } from "react-native"
import EmojiModal from "react-native-emoji-modal"
import { SafeAreaView } from "react-native-safe-area-context"

type EmojiOutput = string | null


interface EmojiSelectorProps {
    onEmojiSelected: (e: EmojiOutput) => void
    children: ReactNode
}



interface EmojiSelectorContextProps {
    isOpen: boolean
    setOpen: (b: boolean) => void
    setTrigger: (h: number) => void
}

const EmojiSelectorContext = createContext<EmojiSelectorContextProps>({
    isOpen: false,
    setOpen: () => { },
    setTrigger: () => { }
})

export const useEmojiSelector = () => useContext(EmojiSelectorContext)

export default function EmojiSelector({ children }: { children: ReactNode }) {

    const [isOpen, setOpen] = useState(false)

    const [trigger, setTrigger] = useState(0)

    const setOpenHandler = (b: boolean) => setOpen(b)

    return (
        <EmojiSelectorContext.Provider value={{
            isOpen,
            setOpen: setOpenHandler,
            setTrigger
        }}>
            <View
                style={{
                    // marginTop: isOpen ? -trigger : 0
                }}
                className="flex-1">
                {children}
            </View>
        </EmojiSelectorContext.Provider>
    )
}


const EmojiSelectorModal = ({
    onEmojiSelected,
    children
}: EmojiSelectorProps) => {

    const { isOpen, setOpen } = useEmojiSelector()

    const ref = useRef<View>(null)

    useLayoutEffect(() => {
        if (isOpen && ref.current) {
            console.log(ref.current)
        }
    }, [isOpen])

    return (
        <SafeAreaView>
            <Modal
                visible={isOpen}
                animationType="slide"
                transparent={true}>
                <TouchableNativeFeedback onPress={() => setOpen(false)}>
                    <View className="flex-1">
                        <View onStartShouldSetResponder={() => true}>
                            <EmojiModal
                                ref={ref}
                                containerStyle={{
                                    width: "100%",
                                    alignItems: "center",
                                    overflow: "hidden",
                                    margin: "auto",
                                    gap: "8px",
                                    borderRadius: 0,
                                }}
                                scrollStyle={{
                                    width: "100%",
                                }}
                                modalStyle={{
                                    position: "absolute",
                                    bottom: "0%",
                                    width: "100%",
                                }}
                                emojiSize={35}
                                columns={8}
                                onEmojiSelected={onEmojiSelected}
                            />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </Modal>
            {children}
        </SafeAreaView>
    )
}

const EmojiSelectorTrigger = (props: PressableProps) => {

    const ref = useRef<View>(null)

    const { isOpen, setTrigger } = useEmojiSelector()

    useLayoutEffect(() => {
        if (isOpen && ref.current) {
            ref.current.measureInWindow((x, y, width, height) => {
                setTrigger(height)
            })
        }
    }, [isOpen])

    return (
        <Pressable
            ref={ref}
            {...props}
        />
    )
}

EmojiSelector.Modal = EmojiSelectorModal
EmojiSelector.Trigger = EmojiSelectorTrigger