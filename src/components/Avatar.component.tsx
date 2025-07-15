import CircleDecoration from "@/ui-components/CircleDecoration.ui-component";
import clsx from "clsx";
import { Image, ImageSourcePropType, ViewProps } from "react-native";

interface AvatarProps extends ViewProps {
    source: ImageSourcePropType
}

export default function Avatar({
    source,
    className,
    ...props
}: AvatarProps) {
    return (
        <CircleDecoration
            style={{
                borderColor: "white",
                borderWidth: 1,
            }}
            className={clsx(
                "overflow-hidden",
                className
            )}
            {...props}
        >
            <Image
                source={source}
                className="w-full h-full" />
        </CircleDecoration>
    )
}