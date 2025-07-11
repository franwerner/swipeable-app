import ISet from "@/types/SetInterface.type"
import clsx from "clsx"
import { BlurView } from "expo-blur"
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient"
import { ReactNode } from "react"
import { Text, View, ViewProps } from "react-native"

interface SetCardProps extends Omit<ViewProps, "id">, Omit<ISet, "title"> {
    title?: ReactNode
    bodyProps?: ViewProps
}

type SetCardGradientProps = Omit<LinearGradientProps, "colors"> & Pick<ISet, "colors"> & { children?: ReactNode }

export const SetCardGradient = ({ colors, children, ...props }: SetCardGradientProps) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            className="flex-1"
            {...props}
            colors={[...colors] as any}>
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
    title,
    className,
    colors,
    subtitle,
    bodyProps,
    userBy,
    id,
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
                {title && title}
                <View className="p-6  py-3 gap-1" {...bodyProps}>
                    <Text
                        className={"text-xl font-bold"}>
                        {subtitle}
                    </Text>
                    <Text

                        className={"tracking-wide font-medium"}>
                        {userBy}
                    </Text>
                </View>
            </SetCardGradient>
        </View>
    )
}