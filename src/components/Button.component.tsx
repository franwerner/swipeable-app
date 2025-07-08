import clsx from "clsx";
import { ActivityIndicator, ActivityIndicatorProps, PressableProps } from "react-native";
import AnimatedTap from "./AnimatedTap.component";

export interface ButtonProps extends PressableProps {
    isLoading?: boolean
    loadingProps?: ActivityIndicatorProps
}

export default function Button({
    isLoading,
    className,
    children,
    loadingProps,
    ...props
}: ButtonProps) {
    return (
        <AnimatedTap
            className={clsx(
                "bg-secondary-950 rounded-[50px] py-6 items-center",
                className,
                isLoading && "opacity-95"
            )}
            {...props}
        >
            {
                isLoading ? <ActivityIndicator
                    size={30}
                    className="text-white "
                    {...loadingProps}
                /> : children
            }

        </AnimatedTap>
    )
}