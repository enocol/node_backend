import { Stack } from 'expo-router/stack'
import { Image, View } from 'react-native'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from "react-native";
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
    
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerStyle: {
          backgroundColor: '',
        },
        headerBackground: () => null,
       
        

        // Remove default title
        headerTitle: () => (
          <View >
            <Image
              source={require('@/assets/images/wallet.png')}
              style={{
                width: "100%",
                height: 40,
                
              }}
            />
          </View>
        ),
        headerTitleAlign: 'left',

        // Put logo on the left
        
      }}
    >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          
        
    </Stack>
     <StatusBar  />
    </ClerkProvider>
  )
}