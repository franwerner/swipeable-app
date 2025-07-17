import clsx from "clsx";
import React, { createContext, Dispatch, SetStateAction, useContext, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, Modal, Pressable, PressableProps, SafeAreaView, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface DropdownMenuProps {
    children: React.ReactNode;
}

interface DropdownItemProps extends PressableProps {
    closeMenuOnInteract?: boolean
}


interface Position {
    x: number
    y: number
    height: number
    width: number
}

interface DropdownContext {
    position: Position
    setPosition: Dispatch<SetStateAction<DropdownContext["position"]>>
    isOpen?: boolean
    setOpen: Dispatch<SetStateAction<boolean>>

}


const DropdownContext = createContext<DropdownContext>({
    position: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    setPosition: () => { },
    isOpen: false,
    setOpen: () => { },
})

export const useDropdown = () => useContext(DropdownContext)

export default function Dropdown({
    children,
}: DropdownMenuProps) {

    const [position, setPosition] = useState<Position>({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })

    const [isOpen, setOpen] = useState(false)

    return (
        <SafeAreaView>
            <DropdownContext.Provider
                value={{
                    position,
                    setPosition,
                    isOpen,
                    setOpen,
                }}
            >
                {children}
            </DropdownContext.Provider >
        </SafeAreaView>
    )
}


const DropdownMenu = ({
    className,
    style,
    ...props
}: ViewProps) => {

    const { position, setOpen, isOpen } = useDropdown()
    const menuRef = useRef<View>(null)
    const [containerDimesions, setWidthContainerDimesion] = useState({
        width: 0,
        height: 0
    })

    const screenHeight = Dimensions.get("window").height

    /**
     * `isExceedingScreenBottom` verifica si la dropdown sobrepasa el limite de la pantalla y lo reajusta.
     */

    const isExceedingScreenBottom = (position.y + position.height + containerDimesions.height) > screenHeight
    const isExceedingScreenWidth = (position.x + position.width - containerDimesions.width) < 0
    const top = isExceedingScreenBottom ? (position.y - containerDimesions.height) : (position.y + position.height)
    const left = isExceedingScreenWidth ? (position.x + position.width) : (position.x - containerDimesions.width)


    useLayoutEffect(() => {
        if (menuRef.current && isOpen) {
            menuRef.current.measureInWindow((_fx, _fy, width, height) => {
                setWidthContainerDimesion({
                    height,
                    width
                })
            })
        }
    }, [isOpen])

    return (

        <Modal
            visible={isOpen}
            transparent
            animationType="none"
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    setOpen(false)
                }}>
                <View
                    className="flex-1">
                    <Animated.View
                        entering={ZoomIn
                            .duration(80)
                            .springify()
                            .damping(12)
                            .mass(0.3)
                            .stiffness(90)
                        }
                        exiting={ZoomOut
                            .duration(150)
                            .damping(12)
                            .mass(0.3)
                            .stiffness(90)
                        }
                        ref={menuRef}
                        style={[
                            {
                                position: 'absolute',
                                top,
                                left,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            },
                            style,
                        ]}
                        className={clsx(
                            "rounded-2xl bg-white",
                            className
                        )}
                        onStartShouldSetResponder={() => true}
                        {...props}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const DropdownTrigger = ({
    children,
    ...props
}: ViewProps) => {

    const triggerRef = useRef<View>(null)

    const { setPosition, setOpen, isOpen } = useDropdown()

    useLayoutEffect(() => {
        if (triggerRef.current && isOpen) {
            triggerRef.current.measureInWindow((x, y, width, height) => {
                setPosition({
                    x,
                    y,
                    height,
                    width
                })
            })
        }
    }, [isOpen])

    return (
        <Pressable
            onPress={() => setOpen(true)}
            ref={triggerRef}
            {...props}
        >
            {children}
        </Pressable>
    )
}

const DropdownItem = ({
    closeMenuOnInteract = true,
    onPress,
    ...props
}: DropdownItemProps) => {

    const { setOpen } = useDropdown()

    return (
        <Pressable
            onPress={(e) => {
                closeMenuOnInteract && setOpen(false)
                onPress && onPress(e)
            }}
            {...props}
        />
    )
}


Dropdown.displayName = "Dropdown"
Dropdown.Item = DropdownItem
Dropdown.Menu = DropdownMenu
Dropdown.Trigger = DropdownTrigger