import SetCard from "@/components/SetCard.component";
import { FlatList, Text, View } from "react-native";
import setList from "../mocks/setList.mock";


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
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SetCard
                        className="h-[175px] w-[300px]"
                        colors={item.colors}
                    >
                        <SetCard.Header>
                            <Text className="text-3xl" >{item.emoji}</Text>
                        </SetCard.Header>
                        <SetCard.Body
                            name={item.name}
                            userBy={item.userBy}
                        />
                    </SetCard>
                )}
            />
        </View>
    )
}
