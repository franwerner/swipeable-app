import ISet from "@/types/SetInterface.type"
import clsx from "clsx"
import { BlurView } from "expo-blur"
import { LinearGradient } from "expo-linear-gradient"
import { ReactNode } from "react"
import { Text, View, ViewProps } from "react-native"

interface SetCardProps extends Omit<ViewProps, "id">, Omit<ISet, "title"> {
    title: ReactNode
    bodyProps?: ViewProps
}

type SetCardGradientProps = Pick<ISet, "colors"> & { children: ReactNode }

const SetCardGradient = ({ colors, children }: SetCardGradientProps) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
            colors={[...colors] as any}>
            <BlurView
                intensity={100}
                style={{ flex: 1 }}>
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
    textColor = "#000",
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
                {title}
                <View className="p-6  py-3 gap-1" {...bodyProps}>
                    <Text
                        style={{
                            color: textColor
                        }}
                        className={"text-xl font-bold"}>
                        {subtitle}
                    </Text>
                    <Text
                        style={{
                            color: textColor
                        }}
                        className={"tracking-wide font-medium"}>
                        {userBy}
                    </Text>
                </View>
            </SetCardGradient>
        </View>
    )
}