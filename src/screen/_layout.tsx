import SetFilterProvider from "@/providers/SetFilter.provider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../../global.css";
export default function RootLayout() {
  return (
    <SetFilterProvider>

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
    </SetFilterProvider>
  )
}
