import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import clsx from "clsx"
import { Platform, ScrollView, View } from "react-native"
import HeaderBar from "./components/HeaderBar.Component"
import InputSearch from "./components/InputSearch"
import NavigationBar from "./components/NavigationBar.component"
import NewSets from "./components/NewSets.components"
import RecommendedSets from "./components/RecommendedSets.component"
import SetFilters from "./components/SetFilters"


const Header = () => {

    return (
        <View className="gap-12 pb-0 p-6 flex-auto ">
            <HeaderBar />
            <View className="items-center flex-row">
                <InputSearch />
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
        <>
            <BottomSheetModalProvider>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className={clsx(
                        "overflow-visible",
                        Platform.OS === "android" && ""
                    )}
                    contentContainerStyle={{
                        gap: 64
                    }} >
                    <Header />
                    <Content />
                </ScrollView>
                <NavigationBar />
            </BottomSheetModalProvider>
        </>
    )
}