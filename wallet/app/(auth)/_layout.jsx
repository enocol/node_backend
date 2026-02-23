import { Redirect, Stack, useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Pressable, Platform, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

   return (
    <Stack screenOptions={{
      headerBackTitleVisible: false, // removes "Sign-in" text
      headerTitle: '',
      headerTransparent: true, // makes header transparent on iOS
      headerStyle: {
        backgroundColor: 'transparent', // makes the header background transparent
        elevation: 0, // removes shadow on Android
        shadowOpacity: 0, // removes shadow on iOS
         
      },
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
  },
})

export default AuthRoutesLayout