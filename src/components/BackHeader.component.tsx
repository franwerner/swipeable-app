import AnimatedTap from "@/components/AnimatedTap.component";
import colorPalette from "@/constant/colorPalette.constant";
import clsx from "clsx";
import { router } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { Platform, Text, ViewProps } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import CircleDecoration from "../ui-components/CircleDecoration.ui-component";

const AnimatedView = Animated.View

interface BackHeaderProps extends ViewProps {
    endComponent?: ReactNode
    titleClassName?: string
}
export default function BackHeader({
    endComponent,
    className,
    titleClassName,
    ...props
}: BackHeaderProps) {

    return (
        <AnimatedView
            entering={FadeIn.duration(500)}
            className={clsx(
                "flex-row items-center",
                Platform.OS === "android" && "",
                className
            )}
            {...props}
        >
            <AnimatedTap onPress={() => router.back()}>
                <CircleDecoration>
                    <ChevronLeftIcon color={colorPalette.primary[800]} />
                </CircleDecoration>
            </AnimatedTap>
            <Text
                className={clsx(
                    "text-center text-2xl flex-1 font-bold",
                    titleClassName
                )}>
                Swipeable
            </Text>
            {endComponent && endComponent}
        </AnimatedView>
    )
}
