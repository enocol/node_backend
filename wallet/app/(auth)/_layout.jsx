import { Redirect, Stack, useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { StyleSheet, Platform, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'


function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

   return (
    <Stack screenOptions={{
      headerBackTitleVisible: true, // removes "Sign-in" text
      headerTitle: "", // removes the header title
      headerTransparent: true, // makes header transparent on iOS
      headerStyle: {
        backgroundColor: "transparent", // makes the header background transparent
        elevation: 0, // removes shadow on Android
        shadowOpacity: 0, // removes shadow on iOS
      },
      headerShadowVisible: false,
      headerBackground: () => null, // removes the header background
      headerLeft: Platform.OS === 'ios' ? () => (
        <Pressable onPress={() => router.back()} style={styles.backArrow}>
          <MaterialIcons name="arrow-back" size={20} color="black"  />
        </Pressable>
      ) : undefined,
    }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  )
}

const styles = StyleSheet.create({
   backArrow: {
   alignItems: 'center',
   justifyContent: 'center',
   width: 40,
   backgroundColor: "transparent",
  },
})

export default AuthRoutesLayout