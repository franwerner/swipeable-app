import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Pressable, PressableProps, ViewProps } from "react-native";
import Animated, { Easing, LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


interface AccordionHeaderProps extends Omit<PressableProps, "onPress"> {
    endComponent: ReactNode
    children?: ReactNode
}


interface AccordionContex {
    isOpen: boolean
    setOpen: (b?: boolean) => void
}

const AccordionContext = createContext<AccordionContex>({
    isOpen: false,
    setOpen: () => { }
})

export const useAccordion = () => useContext(AccordionContext)

export default function Accordion({
    defaultOpen = false,
    ...props
}: { children: ReactNode, defaultOpen?: boolean }) {

    const [isOpen, setOpen] = useState(defaultOpen)

    const handleOpen = (b?: boolean) => setOpen(prev => b ?? !prev)


    return (
        <AccordionContext.Provider
            value={{
                isOpen,
                setOpen: handleOpen
            }}
            {...props}
        />
    )
}

const AccordionBody = ({
    style,
    ...props
}: ViewProps) => {

    const { isOpen } = useAccordion()

    return (
        <Animated.View
            layout={LinearTransition.duration(300).easing(Easing.inOut(Easing.ease))}
            style={{
                maxHeight: isOpen ? "auto" : 0,
            }}
            {...props}
        />
    )
}

const PresseableAnimated = Animated.createAnimatedComponent(Pressable)

const AccordionHeader = ({
    endComponent,
    children,
    style,
    ...props
}: AccordionHeaderProps) => {

    const { isOpen, setOpen } = useAccordion()

    const value = isOpen ? 180 : 0

    const rotation = useSharedValue(value)

    useEffect(() => {
        rotation.value = withTiming(value, {
            duration: 300,
            easing: Easing.inOut(Easing.ease)
        })
    }, [isOpen])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        }
    })

    return (
        <PresseableAnimated
            layout={LinearTransition.duration(300).easing(Easing.inOut(Easing.ease))}
            onPress={() => setOpen()}
            {...props}>
            {children}
            <Animated.View style={animatedStyle}>
                {endComponent}
            </Animated.View>
        </PresseableAnimated>
    )
}


Accordion.Header = AccordionHeader
Accordion.Body = AccordionBody