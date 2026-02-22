import { Stack } from 'expo-router/stack'

import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from "react-native";




export default function RootLayout() {

  return (
    <ClerkProvider tokenCache={tokenCache}>
         <Stack>
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        </Stack>
        <StatusBar  />

      </ClerkProvider>
  )
  
}
