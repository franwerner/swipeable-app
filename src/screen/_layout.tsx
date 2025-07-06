import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../../global.css";
export default function RootLayout() {

  /**
   * FIX(IOS) : Headear y Footer bar se colapsan.
  */
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
