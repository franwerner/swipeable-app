import Button from "@/components/Button.component";
import SetCard from "@/components/SetCard.component";
import SetHeart from "@/components/SetHeart.component";
import { Text, View } from "react-native";
import setList from "../mocks/setList.mock";


export default function RecommendedSets() {

    const slice = setList.slice(0, 20)
    return (
        <View className="gap-8 mx-6   ">
            <Text className="text-2xl font-semibold ">
                En base a tus sets
            </Text>
            <View className="items-center  gap-6">
                {
                    slice.map(({ id, likeStatus, colors, emoji, name, userBy }) =>
                        <SetCard
                            key={id}
                            colors={colors}
                            className="min-w-full h-[140px]"
                        >
                            <SetCard.Header>
                                <SetHeart
                                    className="items-end p-3 absolute right-3 top-3"
                                    likeStatus={!!likeStatus}
                                    hearthProps={{
                                        active: {
                                            fill: "#EC5047",
                                            stroke: "#EC5047"
                                        }
                                    }}

                                />
                            </SetCard.Header>
                            <SetCard.Body name={name + " " + emoji} userBy={userBy} />
                        </SetCard>
                    )
                }
            </View>
            <Button className="mb-2">
                <Text className="text-xl  text-white font-semibold">Cargar más</Text>
            </Button>
        </View>
    )
}
