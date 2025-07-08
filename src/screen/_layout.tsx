import { Stack } from "expo-router";
import { Platform, StatusBar } from "react-native";
import "../../global.css";

export default function RootLayout() {

  return (
    <>
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
    </>
  )
}
