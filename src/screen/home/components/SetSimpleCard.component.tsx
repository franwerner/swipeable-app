import SetCardGradient from "@/components/SetCardGradient.component"
import { ISetBase } from "@/types/SetInterface.type"
import User from "@/types/UserInterface.type"
import clsx from "clsx"
import { Text, View, ViewProps } from "react-native"


interface SetSimpleCard extends Omit<ISetBase, "emojis"> {
    userBy: Pick<User, "userID" | "nickname">
}

interface SetSimpleCardProps extends SetSimpleCard {
    HeaderComponent: React.ReactNode

}

//USERID Y SETID nos servira luego para construir las rutas.

export default function SetSimpleCard({
    className,
    colors,
    children,
    userBy,
    HeaderComponent,
    name,
    ...props
}: SetSimpleCardProps & ViewProps) {
    return (
        <View
            className={clsx(
                "overflow-hidden rounded-2xl",
                className
            )}
            {...props}
        >
            <SetCardGradient colors={colors}>
                {HeaderComponent && HeaderComponent}
                <View className="p-5 gap-1" >
                    <Text
                        numberOfLines={2}
                        className={"text-xl flex-shrink  font-bold"}>
                        {name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        className={"tracking-wide flex-shrink  text-[16px] font-medium"}>
                        Por {userBy.nickname}
                    </Text>
                </View>
            </SetCardGradient>
        </View>
    )
}
