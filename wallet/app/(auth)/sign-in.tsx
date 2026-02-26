import { useSignIn } from '@clerk/clerk-expo'
import type { EmailCodeFactor } from '@clerk/types'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { Pressable, StyleSheet, TextInput, View, Text, Image, Platform } from 'react-native'
import {appstyles} from "@/assets/styles/auth.styles"
import { MaterialIcons } from "@expo/vector-icons";


export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')
  const [showEmailCode, setShowEmailCode] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')


  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return
    setErrorMessage('')
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
              console.log(session?.currentTask)
              return
            }
              router.replace("/");  // Redirect to the home page after successful sign-in
          },
        })
      } else if (signInAttempt.status === 'needs_second_factor') {
        // Check if email_code is a valid second factor
        // This is required when Client Trust is enabled and the user
        // is signing in from a new device.
        // See https://clerk.com/docs/guides/secure/client-trust
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor): factor is EmailCodeFactor => factor.strategy === 'email_code',
        )

        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: 'email_code',
            emailAddressId: emailCodeFactor.emailAddressId,
          })
          setShowEmailCode(true)
        }
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
  let message = 'Something went wrong. Please try again.'

  if (err?.errors && err.errors.length > 0) {
    message = err.errors[0].longMessage || err.errors[0].message
  }

  setErrorMessage(message)
}
  }, [isLoaded, signIn, setActive, router, emailAddress, password])

  // Handle the submission of the email verification code
  const onVerifyPress = React.useCallback(async () => {
    if (!isLoaded) return
    setErrorMessage('')
    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
              console.log(session?.currentTask)
              return
            }

            router.replace('/');
          },
        })
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    }  catch (err: any) {
  let message = 'Verification failed. Please try again.'

  if (err?.errors && err.errors.length > 0) {
    message = err.errors[0].longMessage || err.errors[0].message
  }

  setErrorMessage(message)
}
  }, [isLoaded, signIn, setActive, router, code])
// Clear error message after 4 seconds
  React.useEffect(() => {
  if (errorMessage) {

    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 5000); // 4 seconds

    return () => clearTimeout(timer); // cleanup
  }
}, [errorMessage]);

  // Display email code verification form
  if (showEmailCode) {
    return (
      <View style={styles.container}>
        {errorMessage ? (<View style={styles.erroMessageContainer}>
          
          <Text style={styles.errorText}>{errorMessage}</Text></View>) : null}
        <Text  style={styles.title}>
          Verify your email
        </Text>
        <Text style={styles.description}>
          A verification code has been sent to your email.
        </Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={onVerifyPress}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
     {errorMessage ?
      (<View style={styles.erroMessageContainer}>
         <View style={styles.errorIconContainer}>
          <MaterialIcons
            name="error"
            size={18}
            color="red"
            style={{ marginRight: 6 }}
          />
        </View>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>) : null}
      
      <Text  style={styles.title}>
        Sign in to your account
      </Text>

      <Image style={styles.image} source={require("@/assets/images/revenue-i2.png")} />
      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#666666"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#666666"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          (!emailAddress || !password) && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
        onPress={onSignInPress}
        disabled={!emailAddress || !password}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>

         

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Don't have an account? </Text>
        <Link href="/sign-up">
          <Text style={styles.linkButtonText}>Sign up</Text>
        </Link>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
    
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  description: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  label: {
    fontWeight: '600',
    fontSize: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    alignItems: 'center',
  },

   errorText: {
    color: "#4A148C",
    fontSize: 14,
  },

  image : {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 5,
    
  },


  linkText : {
    fontSize: 15,
    fontWeight: '600',
  },

  linkButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },

  erroMessageContainer: {
    height: "auto",
    justifyContent: 'center',
    marginTop: 8,
    borderLeftWidth: 25,
    borderLeftColor: '#F44336',
    flexDirection: "row",
    backgroundColor: "#ffe5e5", // optional soft red background
    padding: 10,
    borderRadius: 8,
  },

  errorIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 6,
    marginLeft: 10, // Adjust this value to position the icon closer to the left border
  },
  

})