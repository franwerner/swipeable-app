import { ScrollView, View } from "react-native"
import HeaderBar from "./components/HeaderBar.Component"
import NavigationBar from "./components/NavigationBar.component"
import SearchFilterBar from "./components/searchFilterBar"
import BottomSheetProvider from "./provider/BottomSheet.provider"

export default function HomeScreen() {
    return (
        <BottomSheetProvider>
            <View className="flex-1">
                <ScrollView
                    contentContainerStyle={{
                        gap: 32
                    }} >
                    <HeaderBar />
                    <SearchFilterBar />
                </ScrollView>
                <NavigationBar />
            </View>
        </BottomSheetProvider>
    )
}