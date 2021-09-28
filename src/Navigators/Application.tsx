import React, { useEffect, useState, FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexStartupContainer } from '@/Containers'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/Navigators/Root'
import { SafeAreaView, StatusBar } from 'react-native'
import { StartupState } from '@/Store/Startup'
import tw from '@/Styles/tailwind'

const Stack = createStackNavigator()

let MainNavigator: FunctionComponent | null

// @refresh reset
const ApplicationNavigator = () => {
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false)
  const applicationIsLoading = useSelector(
    (state: { startup: StartupState }) => state.startup.loading,
  )

  useEffect(() => {
    if (MainNavigator == null && !applicationIsLoading) {
      MainNavigator = require('@/Navigators/Main').default
      setIsApplicationLoaded(true)
    }
  }, [applicationIsLoading])

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false)
      MainNavigator = null
    },
    [],
  )

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={'light-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={IndexStartupContainer} />
          {isApplicationLoaded && MainNavigator != null && (
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
