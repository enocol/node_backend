import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const SignOutButton = () => {
  // Use useClerk() to access the signOut() function
  const {signOut} = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      router.replace('/')
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <TouchableOpacity style={{padding: 10, backgroundColor: '#000000', borderRadius: 5}} onPress={handleSignOut}>
    <Text style={{color: 'white'}}>Sign out</Text>
    </TouchableOpacity>
  )
}

export default SignOutButton


const styles = StyleSheet.create({
  container: {
    width: '50%',
    alignItems: 'center',
  }
})