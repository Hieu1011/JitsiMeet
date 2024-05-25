import React, {useCallback, useEffect, useRef, useState} from 'react'
import {JitsiMeeting} from '@jitsi/react-native-sdk/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ActivityIndicator, View, Text, SafeAreaView} from 'react-native'
import {LogBox} from 'react-native'
import {useSelector} from 'react-redux'
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Meeting = ({navigation, route}) => {
  const {room} = route.params
  const jitsiMeeting = useRef(null)
  const userInfo = useSelector(state => state.user.info)
  const [token, setToken] = useState('')

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
      if (!tokenRes) return
      else setToken(tokenRes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  // Kiểm tra xem userInfo có giá trị không trước khi truyền vào JitsiMeeting
  if (!userInfo || token === '') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10
        }}>
        <ActivityIndicator size={24} />
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            textAlignVertical: 'center'
          }}>
          Loading
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <JitsiMeeting
      eventListeners={eventListeners}
      ref={jitsiMeeting}
      config={{dialInConfCodeUrl: 111}}
      style={{flex: 1}}
      room={room}
      token={token}
      userInfo={{
        displayName: userInfo.name,
        avatarURL: userInfo.avatar,
        email: userInfo.email
      }}
      serverURL={'https://8x8.vc/'}
    />
  )
}

export default Meeting
