import SignOutButton from './components/sign-out-button'
import AppText from './components/appText'

import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { user } = useUser()
  const router = useRouter()

  // If your user isn't appearing as signed in,
  // it's possible they have session tasks to complete.
  // Learn more: https://clerk.com/docs/guides/configure/session-tasks
  // const { session } = useSession()
  // console.log(session?.currentTask)

  return (
    <SafeAreaView style={styles.container}>
      
    
      {/* Show the sign-in and sign-up buttons when the user is signed out */}
      <View style={styles.logoimageContainer}>
        <Image source={require('@/assets/images/wallet.png')} style={styles.image} />
      </View>
       <SignedOut>
        <Image source={require('@/assets/images/revenue-i4.png')} style={styles.image} />
        <Pressable style={styles.signinButton} onPress={() => router.push('/sign-in')}>
         <AppText title="Sign in" />
        </Pressable>

        <Pressable style={styles.registerButton} onPress={() => router.push('/sign-up')}>
          <AppText title="Register"  />
        </Pressable>
      </SignedOut>

      <View style={styles.signedInContainer}>
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <SignOutButton />
        </SignedIn>
      </View>

     

   
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    gap: 20,
   
  },

  signedInContainer: {
   position: 'absolute',
   top: 50,
   left: 20,
   flex: 1,
    
  },

  signinButton: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    height: 50,
    width: '80%',
   
    
  },

  registerButton: {
    backgroundColor: '#000000',
    height: 50,
    justifyContent: 'center',
    width: '80%',
    
  },

  // signinText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   textTransform: 'uppercase',
    
  // },

  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },

  logoimageContainer: {
    width: '100%',
    backgroundColor: 'orange',
   
   
  },

})