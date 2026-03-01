import SignOutButton from './components/sign-out-button'
import AppText from './components/appText'

import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React, { use, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import useTransactions  from '../hooks/useTransactions'

export default function Page() {
  const { user } = useUser()
  const router = useRouter()


 const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions(user?.id)
  useEffect(() => {
    if(user?.id) {
      loadData()
    }

  }, [user?.id])
 
 




  // If your user isn't appearing as signed in,
  // it's possible they have session tasks to complete.
  // Learn more: https://clerk.com/docs/guides/configure/session-tasks
  // const { session } = useSession()
  // console.log(session?.currentTask)  

  

 

  return (
   
      <>
    
      {/* Show the sign-in and sign-up buttons when the user is signed out */}
      
       <SignedOut>
        <View style={{flex: 1,alignItems: 'center', gap: 20}}>
        <View style={styles.logoimageContainer}>
            <Image source={require('@/assets/images/wallet.png')} style={styles.image} />
        </View>

        <Image source={require('@/assets/images/revenue-i4.png')} style={styles.image} />
        <Pressable style={styles.signinButton} onPress={() => router.push('/sign-in')}>
         <AppText title="Sign in" />
        </Pressable>

        <Pressable style={styles.registerButton} onPress={() => router.push('/sign-up')}>
          <AppText title="Register"  />
        </Pressable>
        </View>
      </SignedOut>

     
        <SignedIn>
           <View style={styles.signedInContainer}>
              <View style={{padding: 10, gap: 150, width: '100%', alignItems: 'center',  flexDirection: "row" }}>
                <Text style={styles.signedInText}>Hello {user?.firstName}</Text>
               
                <SignOutButton />
              </View>

              <Image source={require('@/assets/images/revenue-i3.png')} style={styles.image} />
               <Text style={styles.signedInText}>Your balance is ${summary?.balance}</Text>
            </View>
            
        </SignedIn>
     

     

   
   </> 
  )
  
}

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: 'white',
  //   alignItems: 'center',
  //   flex: 1,
  //   gap: 20,
   
  // },

  signedInContainer: {
   position: 'absolute',
   top: 50,
   left: 0,
   flex: 1,
   width: '100%',
   height: "100%",
   
    
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

  signedInText: {
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  fontSize: 20,
  fontWeight: 'bold',
  },

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