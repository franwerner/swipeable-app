import { View } from "react-native";
import InputSearch from "./InputSearch";
import SetFilter from "./SetFilter";

export default function SearchFilterBar() {
    return (
        <View className="mx-6 items-center  flex-row">
            <InputSearch isLoading={false} />
            <SetFilter />
        </View>
    )
}