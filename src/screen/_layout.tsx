import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
export default function RootLayout() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView
          className="flex-1 bg-black"
          edges={['top', 'bottom']}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "white"
              }
            }}
          >
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  )
}
