import {Text, View} from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../screens/Home/Home'
import Video from '../screens/Video/Video'
import Meeting from '../screens/Video/Meeting'
import Calendar from '../screens/Calendar/Calendar'
import Settings from '../screens/Settings/Settings'
import Profile from '../screens/Profile/Profile'
import {COLORS} from '../../constants/theme'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Video" component={Video} /> */}
      <Stack.Screen
        name="Meeting"
        component={Meeting}
        options={{
          presentation: 'modal',
          animation: 'fade'
        }}
      />
    </Stack.Navigator>
  )
}
const CalendarStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Calendar" component={Calendar} />
    </Stack.Navigator>
  )
}
const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {backgroundColor: COLORS.secondary}
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? COLORS.primary : COLORS.black}
            />
          )
        }}
      />
      <Tab.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={24}
              color={focused ? COLORS.primary : COLORS.black}
            />
          )
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={24}
              color={focused ? COLORS.primary : COLORS.black}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigator
