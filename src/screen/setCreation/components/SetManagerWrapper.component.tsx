import BackHeader from "@/components/BackHeader.component";
import clsx from "clsx";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function SetManagerWrapper({
    className,
    ...props
}: ViewProps) {

    const insets = useSafeAreaInsets();


    return (
        <View
            style={{
                marginTop: insets.top
            }}
            className="flex-1">
            <BackHeader />
            <View
                className={clsx(
                    "gap-8 m-6 flex-1",
                    className
                )}
                {...props}
            />
        </View>
    )
}