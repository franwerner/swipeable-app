import SetDisplay from "@/types/SetDisplayInterface.type"
import clsx from "clsx"
import { BlurView } from "expo-blur"
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient"
import { ReactNode } from "react"
import { Text, View, ViewProps } from "react-native"

export interface SetCardProps extends ViewProps {
    colors: SetDisplay["colors"]
}

interface SetCardBodyProps extends ViewProps {
    name: SetDisplay["name"]
    userBy: SetDisplay["userBy"]
}


type SetCardGradientProps = Omit<LinearGradientProps, "colors"> & Pick<SetDisplay, "colors"> & { children?: ReactNode }

export const SetCardGradient = ({ colors, children, ...props }: SetCardGradientProps) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            className="flex-1"
            {...props}
            colors={[...colors,] as any}>
            <BlurView
                intensity={100}
                className="flex-1"
            >
                {children}
            </BlurView>
        </LinearGradient>

    )
}

export default function SetCard({
    className,
    colors,
    children,
    ...props
}: SetCardProps) {
    return (
        <View
            className={clsx(
                "overflow-hidden rounded-2xl",
                className
            )}
            {...props}
        >
            <SetCardGradient colors={colors}>
                {children}
            </SetCardGradient>
        </View>
    )
}


const SetCardHeader = ({
    className,
    ...props
}: ViewProps) => {
    return (
        <View
            className={clsx(
                "p-5",
                className
            )}
            {...props}
        />
    )
}

const SetCardBody = ({
    name,
    userBy,
    ...props
}: SetCardBodyProps) => {
    return (
        <View className="p-6 gap-1" {...props}>
            <Text
                className={"text-xl font-bold"}>
                {name}
            </Text>
            <Text
                className={"tracking-wide  text-[16px] font-medium"}>
                Por {userBy.nickname}
            </Text>
        </View>
    )
}

SetCard.Header = SetCardHeader
SetCard.Body = SetCardBody