import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import RootNavigation from './navigators/RootNavigation'
import {
  notificationListener,
  requestNotificationPermission
} from './utils/remoteNotification'
import {Provider} from 'react-redux'
import {store} from './redux/store'

const App = () => {
  useEffect(() => {
    requestNotificationPermission()
    notificationListener()
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  )
}

export default App
