import { FlatList, Text, View } from "react-native";
import setList from "../../../mocks/setList.mock";
import SetSimpleCard from "./SetSimpleCard.component";


export default function NewSets() {
    return (
        <View className="gap-8" >
            <Text className="text-2xl ml-6 font-semibold ">
                Nuevos sets ✨
            </Text>
            <FlatList
                data={setList}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-6 ml-6"
                keyExtractor={(item) => item.setID.toString()}
                renderItem={({ item }) => {
                    const { emojis, userBy } = item
                    return (
                        <SetSimpleCard
                            className="h-[160px] w-[300px]"
                            HeaderComponent={
                                <View className="p-5">
                                    <Text className="text-3xl" >{emojis.join((" "))}</Text>
                                </View>
                            }
                            colors={item.colors}
                            setID={item.setID}
                            name={item.name}
                            userBy={{
                                userID: userBy.userID,
                                nickname: userBy.nickname
                            }}


                        />
                    )
                }}

            />
        </View>
    )
}
