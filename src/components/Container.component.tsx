import colorPalette from "@/constant/colorPalette.constant";
import clsx from "clsx";
import { View, ViewProps } from "react-native";

export interface ContainerProps extends ViewProps {
    isActive?: boolean
}

export default function Container({
    className,
    isActive,
    style,
    ...props
}: ContainerProps) {
    return (
        <View
            className={clsx(
                "border px-6 rounded-[16px] flex-row items-center justify-between h-[64px] bg-white",
                className
            )}
            style={[
                {
                    borderColor: isActive ? colorPalette.primary[500] : colorPalette.primary[200]
                },
                style
            ]}
            {...props}
        />
    )
}