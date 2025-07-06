import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../../global.css";
export default function RootLayout() {
  return (
    <>
      <StatusBar />
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
