import Button from "@/components/Button.component";
import SetHeart from "@/components/SetHeart.component";
import setListMock from "@/mocks/setList.mock";
import { Text, View } from "react-native";
import SetSimpleCard from "./SetSimpleCard.component";


export default function RecommendedSets() {

    const slice = setListMock.slice(0, 20)
    return (
        <View className="gap-8 mx-6   ">
            <Text className="text-2xl font-semibold ">
                En base a tus sets
            </Text>
            <View className="items-center  gap-6">
                {
                    slice.map(({ setID, likeStatus, colors, emojis, name, userBy }) =>
                        <SetSimpleCard
                            key={setID}
                            colors={colors}
                            name={name + " " + emojis.join(" ")}
                            setID={setID}
                            userBy={{
                                nickname: userBy.nickname,
                                userID: userBy.userID
                            }}
                            className="min-w-full h-[130px]"
                            HeaderComponent={
                                <View className="p-5">
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
                                </View>
                            }
                        />
                    )
                }
            </View>
            <Button className="mb-2">
                <Text className="text-xl  text-white font-semibold">Cargar más</Text>
            </Button>
        </View>
    )
}
