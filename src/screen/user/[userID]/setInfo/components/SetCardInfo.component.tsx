import AnimatedTap from "@/components/AnimatedTap.component";
import Avatar from "@/components/Avatar.component";
import SetCard from "@/components/SetCard.component";
import { Share2 } from "lucide-react-native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import useSetInfoStore from "../store/useSetInfo.store";

const Header = () => {
    const name = useSetInfoStore(state => state.setInfo?.name)
    const emoji = useSetInfoStore(state => state.setInfo?.emoji)

    return (
        <SetCard.Header className="flex-row justify-between">
            <Text className="font-bold text-2xl">{name + " " + emoji}</Text>
            <AnimatedTap>
                <Share2 size={28} color={"#000"} />
            </AnimatedTap>
        </SetCard.Header>
    )
}

const Body = () => {
    const { avatarUrl, nickname } = useSetInfoStore(state => state.setInfo?.userBy) || {}
    const items_count = useSetInfoStore(state => state.setInfo?.items_count) || 0;
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

const Description = () => {
    const description = useSetInfoStore(state => state.setInfo?.description)


    return (
        <View className="p-5 rounded-2xl min-h-[100px] border">
            <Text className="text-[14px]">{description}</Text>
        </View>
    )
}

const CardWrapper = ({ children }: { children: ReactNode }) => {
    const colors = useSetInfoStore(state => state.setInfo?.colors) || [];
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
                <Header />
                <Body />
            </CardWrapper>
            {/* <Description /> */}
        </View>
    )
}