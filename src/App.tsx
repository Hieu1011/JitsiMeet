import React, { useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import RootNavigation from './navigators/RootNavigation'
import { notificationListener, requestNotificationPermission } from './utils/remoteNotification'

const App = () => {
  useEffect(() => {
    requestNotificationPermission()
    notificationListener()
  },[])

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  )
}

export default App
