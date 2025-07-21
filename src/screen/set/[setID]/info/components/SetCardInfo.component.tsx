import Avatar from "@/components/Avatar.component";
import SetCard from "@/components/SetCard.component";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import useSetInfoStore from "../store/useSetInfo.store";

// const Header = () => {
//     const name = useSetInfoStore(state => state.setData?.name)
//     const emoji = useSetInfoStore(state => state.setData?.emojis)

//     return (
//         <SetCard.Header className="flex-row justify-between">
//             <Text className="font-bold text-2xl">{name + " " + emoji}</Text>
//             <AnimatedTap>
//                 <Share2 size={28} color={"#000"} />
//             </AnimatedTap>
//         </SetCard.Header>
//     )
// }

const Body = () => {
    const { avatarUrl, nickname } = useSetInfoStore(state => state.setData?.userBy) || {}
    const items_count = useSetInfoStore(state => state.setData?.items_count) || 0;
    return (
        <View className="p-6 pt-2 flex-row items-center gap-3 justify-between">
            <View className="flex-row flex-1 items-center  gap-3">
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


const CardWrapper = ({ children }: { children: ReactNode }) => {
    const colors = useSetInfoStore(state => state.setData?.colors) || [];
    return <SetCard
        className="!h-[150px] w-full"
        colors={colors}>
        {children}
    </SetCard>
}

export default function SetCardInfo() {


    return (
        <View className="gap-4">
            <CardWrapper>
                {/* <Header /> */}
                <Body />
            </CardWrapper>
        </View>
    )
}