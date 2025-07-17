import AnimatedTap from "@/components/AnimatedTap.component";
import BackHeader from "@/components/BackHeader.component";
import emojiStatistic from "@/constant/emojiStatistic.constant";
import { Text, View } from "react-native";

const emojiStatisticToArray = Object.entries(emojiStatistic) as Array<[keyof typeof emojiStatistic, string]>

// const SwipeCard = () => {
//     const { colors, name, emojis } = setListMock[0]
//     return (
//         <SetCard
//             colors={colors}
//             className="flex-1 ">
//             <SetCard.Header
//                 style={{
//                     borderBottomColor: "#ffffff"
//                 }}
//                 className="border-b  p-6">
//                 <Text
//                     numberOfLines={1}
//                     className="text-center flex-shrink text-2xl font-medium">{name}</Text>
//             </SetCard.Header>
//             <View className=" flex-1 p-6 gap-8 justify-center">
//                 <Text className="text-3xl">{emoji}</Text>
//                 <Text
//                     numberOfLines={3}
//                     className="text-[40px] font-semibold flex-shrink">Las locuras del emperador</Text>
//             </View>
//         </SetCard>
//     )
// }


const SwipeActions = () => {
    return (
        <View className="flex-row pb-6 justify-between">
            {
                emojiStatisticToArray.map(([key, emoji]) => {
                    return (
                        <AnimatedTap
                            key={key}
                            onPress={() => { }}
                            className="bg-primary-100 items-center justify-center rounded-full h-[100px] w-[100px]">
                            <View className="flex-1 items-center justify-center">
                                <Text className="text-[40px]">{emoji}</Text>
                            </View>
                        </AnimatedTap>
                    )
                })
            }

        </View>
    )
}

const Content = () => {
    return (
        <View className="flex-1 gap-20">
            <View className="flex-1 gap-8">
                {/* <SwipeCard /> */}
                <Text className="text-center text-[16px] text-secondary-500">5 selecciones restantes</Text>
            </View>
            <SwipeActions />
        </View>
    )
}


export default function Swipe() {

    return (
        <View className="p-6 gap-8 flex-1">
            <BackHeader className="mr-[60px]" />
            <Content />
        </View>
    )
}