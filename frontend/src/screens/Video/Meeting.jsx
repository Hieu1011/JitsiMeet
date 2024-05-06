import React, { useCallback, useEffect, useRef, useState } from 'react'
import { JitsiMeeting } from '@jitsi/react-native-sdk/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, View, Text, SafeAreaView } from 'react-native'

const Meeting = ({ navigation, route }) => {
  const jitsiMeeting = useRef(null)
  const { room } = route.params
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  
  const onReadyToClose = useCallback(() => {
    navigation.navigate('Home')
    jitsiMeeting.current.close()
  }, [navigation])

  const eventListeners = {
    onReadyToClose
  }

  const getToken = async () => {
    try {
      const tokenRes = await AsyncStorage.getItem('token')
      if (!tokenRes)
        return
      else setToken(tokenRes)
    } catch (error) {
      console.log(error);
    }
  }

  const getUserInfo = async () => {
    try {
      const userRes = await AsyncStorage.getItem('userInfo')
      if (!userRes)
        return
      else setUserInfo(JSON.parse(userRes))
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken()
    getUserInfo()
  }, [])

  // Kiểm tra xem userInfo có giá trị không trước khi truyền vào JitsiMeeting
  if (!userInfo) {
    return (
      <SafeAreaView style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,}}>
      <ActivityIndicator size={24}/>
      <Text style={{fontSize: 16, textAlign: 'center', textAlignVertical: 'center'}}>Loading</Text>
      </SafeAreaView>
    )
  }

  return (
    <JitsiMeeting
      eventListeners={eventListeners}
      ref={jitsiMeeting}
      style={{flex: 1}}
      room={room}
      token={token}
      userInfo={{displayName: userInfo.context.user.name, email: userInfo.context.user.email}}
      serverURL={'https://8x8.vc/'}
    />
  )
}

export default Meeting
