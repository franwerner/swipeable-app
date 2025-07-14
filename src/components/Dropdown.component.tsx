import clsx from "clsx";
import React, { createContext, Dispatch, SetStateAction, useContext, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, Modal, Pressable, PressableProps, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface DropdownMenuProps {
    children: React.ReactNode;
    layoutDependencies?: Array<any>
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
    layoutDependencies: Array<any>
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
    layoutDependencies: []
})

export const useDropdown = () => useContext(DropdownContext)

export default function Dropdown({
    children,
    layoutDependencies = [],
}: DropdownMenuProps) {

    const [position, setPosition] = useState<Position>({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })

    const [isOpen, setOpen] = useState(false)

    return (
        <DropdownContext.Provider
            value={{
                position,
                setPosition,
                isOpen,
                setOpen,
                layoutDependencies: [...layoutDependencies, isOpen]
            }}
        >
            {children}
        </DropdownContext.Provider >
    )
}


const DropdownMenu = ({
    className,
    style,
    ...props
}: ViewProps) => {

    const { position, setOpen, layoutDependencies, isOpen } = useDropdown()

    const [containerDimesions, setWidthContainerDimesion] = useState({
        width: 0,
        height: 0
    })

    const menuRef = useRef<View>(null)
    const screenHeight = Dimensions.get("window").height
    /**
     * `isExceedingScreenBottom` verifica si la dropdown sobrepasa el limite de la pantalla y lo reajusta.
     */
    const isExceedingScreenBottom = (position.y + position.height + containerDimesions.height) > screenHeight
    const top = isExceedingScreenBottom ? (position.y - containerDimesions.height) : (position.y + position.height)
    const left = (position.x + position.width) - containerDimesions.width

    useLayoutEffect(() => {
        if (menuRef.current) {
            menuRef.current.measure((_fx, _fy, width, height) => {
                setWidthContainerDimesion({
                    height,
                    width
                })
            })
        }
    }, [layoutDependencies])

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="none"
        >
            <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                <View className="flex-1">
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
                                top: top,
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
                            "rounded-2xl p-4 bg-white",
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

    const { setPosition, setOpen, layoutDependencies } = useDropdown()

    useLayoutEffect(() => {
        if (triggerRef.current) {
            triggerRef.current.measure((_fx, _fy, width, height, px, py) => {
                setPosition({
                    x: px,
                    y: py,
                    height,
                    width

                });
            })
        }
    }, layoutDependencies)

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
    ...props
}: DropdownItemProps) => {
    const { setOpen } = useDropdown()
    return (
        <Pressable
            onPress={() => {
                closeMenuOnInteract && setOpen(false)
            }}
            {...props}
        />
    )
}

Dropdown.displayName = "Dropdown"
Dropdown.Item = DropdownItem
Dropdown.Menu = DropdownMenu
Dropdown.Trigger = DropdownTrigger