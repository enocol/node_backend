import SignOutButton  from '../components/sign-out-button'

import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Page() {
  const { user } = useUser()

  // If your user isn't appearing as signed in,
  // it's possible they have session tasks to complete.
  // Learn more: https://clerk.com/docs/guides/configure/session-tasks
  const { session } = useSession()
  // console.log(session?.currentTask)

  return (
    <View style={styles.container}>
      <Text >Welcome!!!!</Text>
      {/* Show the sign-in and sign-up buttons when the user is signed out */}
      <SignedOut>
        <Link href="/sign-in" style={styles.link}>
          <Text style={styles.signin}>Sign in</Text>
        </Link>

        <Link href="/sign-up">
          <Text style={styles.signout}>Register</Text>
        </Link>
      </SignedOut>
      {/* Show the sign-out button when the user is signed in */}
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    alignItems: "center"
  },

  signin: {
    fontSize: 20,
    color: "goldenrod",
    paddingTop: 50,
    width: 30,
    alignSelf: "flex-end"
  },

  
  signout: {
    fontSize: 20,
    color: "goldenrod",
    paddingTop: 50,
    width: 30
  },

  link: {
    backgroundColor: "red", width: "100%",
    height: 40,
  }
})