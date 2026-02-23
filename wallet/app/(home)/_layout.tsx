import { Stack } from 'expo-router/stack'
import { Image, View } from 'react-native'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerBackground: () => null,
        

        // Remove default title
        headerTitle: () => (
          <View >
            <Image
              source={require('../../assets/images/wallet.png')}
              style={{
                width: 300,
                height: 50,
                
              }}
            />
          </View>
        ),
        headerTitleAlign: 'left',

        // Put logo on the left
        
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  )
}