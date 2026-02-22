import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

   return (
    <Stack screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitleVisible: false, // removes "Sign-in" text
      headerTitle: '',    }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  )
}

export default AuthRoutesLayout