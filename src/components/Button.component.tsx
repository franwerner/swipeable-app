import { ViewProps } from "react-native";
import AnimatedTap from "./AnimatedTap.component";

interface ButtonProps extends ViewProps {
    isLoading?: boolean
}

export default function Button({
    isLoading,
    ...props
}: ButtonProps) {
    return (
        <AnimatedTap
            className="bg-secondary-900 items-center py-8"
            {...props}
        />
    )
}