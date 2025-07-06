import clsx from "clsx"
import { View, ViewProps } from "react-native"


//Text-color: #443976

export default function CircleDecoration({
    className,
    ...props
}: ViewProps) {

    return (
        <View
            className={clsx(
                "bg-primary-100 rounded-full w-[60px] h-[60px]",
                className
            )}
            {...props}
        />
    )
}
