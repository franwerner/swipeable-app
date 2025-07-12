import { Stack } from "expo-router";
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";
export default function RootLayout() {

  return (
    <>
      <GestureHandlerRootView>
        <StatusBar
          backgroundColor="white"
          barStyle={Platform.OS == "android" ? "dark-content" : "default"} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "white"
            }
          }}
        >
        </Stack>
      </GestureHandlerRootView>

    </>
  )
}
