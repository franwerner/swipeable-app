import clsx from "clsx";
import { ActivityIndicator, ActivityIndicatorProps, ViewProps } from "react-native";
import AnimatedTap from "./AnimatedTap.component";

interface ButtonProps extends ViewProps {
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
                "bg-secondary-900 rounded-xl py-6 items-center",
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