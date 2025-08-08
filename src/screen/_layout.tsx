import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
export default function RootLayout() {

  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <StatusBar
          backgroundColor="white"
          barStyle={Platform.OS == "android" ? "dark-content" : "default"} />
        <SafeAreaProvider>
          <SafeAreaView className="flex-1">
            <BottomSheetModalProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: "white"
                  }
                }}
              />
            </BottomSheetModalProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}
