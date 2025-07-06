import { ScrollView, View } from "react-native"
import HeaderBar from "./components/HeaderBar.component"
import InputSearch from "./components/InputSearch"
import NavigationBar from "./components/NavigationBar.component"
import NewSets from "./components/NewSets.components"
import RecommendedSets from "./components/RecommendedSets.component"
import SetFilters from "./components/SetFilters"
import BottomSheetProvider from "./provider/BottomSheet.provider"
import SetFilterProvider from "./provider/SetFilter.provider"

const Footer = () => <NavigationBar />

const Header = () => {
    return (
        <View className="gap-8 flex-auto">
            <HeaderBar />
            <View className="mx-6 items-center flex-row">
                <InputSearch isLoading={false} />
                <SetFilters />
            </View>
        </View>
    )
}

const Content = () => {
    return (
        <>
            <NewSets />
            <RecommendedSets />
        </>
    )
}

export default function HomeScreen() {
    return (
        <SetFilterProvider>
            <BottomSheetProvider>
                <ScrollView
                    contentContainerStyle={{
                        gap: 64
                    }} >

                    <Header />
                    <Content />
                </ScrollView>
                <Footer />
            </BottomSheetProvider>
        </SetFilterProvider>
    )
}