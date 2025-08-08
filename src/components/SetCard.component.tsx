import colorPalette from "@/constant/colorPalette.constant"
import ISet, { ISetBase } from "@/types/SetInterface.type"
import User from "@/types/UserInterface.type"
import clsx from "clsx"
import { Share2 } from "lucide-react-native"
import { Text, TextProps, View, ViewProps } from "react-native"
import AnimatedTap from "./AnimatedTap.component"
import Avatar from "./Avatar.component"
import SetCardGradient from "./SetCardGradient.component"

type SetCardProps = Pick<ISet, "colors"> & ViewProps

type SetCardBodyProps = Pick<ISet, "items_count"> & Pick<User, "avatarUrl" | "nickname"> & ViewProps

type SetCardTitleProps = Pick<ISetBase, "name"> & TextProps

export default function SetCard({
    className,
    colors,
    children,
    ...props
}: SetCardProps) {
    return (
        <View
            className={clsx(
                "overflow-hidden w-[360px] rounded-2xl",
                className
            )}
            {...props}>
            <SetCardGradient colors={colors}>
                {children}
            </SetCardGradient>
        </View>
    )
}



const SetCardShared = ({
    ...props
}: ViewProps) => {
    return (
        <AnimatedTap
            {...props}>
            <Share2
                size={28}
                color={colorPalette.primary[800]} />
        </AnimatedTap>
    )
}

const SetCardTitle = ({
    className,
    name,
    ...props
}: SetCardTitleProps) => {
    return <Text
        numberOfLines={1}
        className={clsx(
            "font-extrabold flex-shrink text-[20px]",
            className
        )}
        {...props}
    >
        {name}
    </Text>
}

const SetCardBody = ({
    avatarUrl,
    nickname,
    items_count,
    className,
    ...props
}: SetCardBodyProps) => {
    return (
        <View
            className={clsx(
                "p-5 flex-row items-center gap-3 justify-between",
                className
            )}
            {...props}>
            <View className="flex-row flex-1 items-center gap-3">
                <Avatar
                    className="!w-[45px] !h-[45px]"
                    source={{ uri: avatarUrl }}
                />
                <Text
                    className="text-[16px] font-medium flex-shrink "
                    ellipsizeMode="tail"
                    numberOfLines={1}

                >
                    Por {nickname}
                </Text>
            </View>
            <Text className="text-[16px] font-medium">{items_count} items</Text>
        </View>
    )
}

SetCard.Title = SetCardTitle
SetCard.Shared = SetCardShared
SetCard.Body = SetCardBody