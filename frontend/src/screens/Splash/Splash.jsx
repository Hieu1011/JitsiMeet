import {SafeAreaView, Image} from 'react-native'
import React, {useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'
import {useDispatch} from 'react-redux'
import {setInfo, setFeatures, setRoom} from '../../redux/slices/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {images} from '../../../constants'
import styles from './splash.style'

const Splash = ({navigation}) => {
  const dispatch = useDispatch()

  const checkTokenExpired = async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      if (!token) {
        navigation.replace('Welcome')

        return
      }

      const decoded = jwtDecode(token)
      console.log(decoded)

      if (Date.now() >= decoded.exp * 1000) {
        await AsyncStorage.removeItem('token')

        navigation.replace('Welcome')

      } else {
        dispatch(setInfo(decoded.context.user))
        dispatch(setFeatures(decoded.context.features))
        dispatch(setRoom(decoded.room))

        navigation.replace('BottomNavigator')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      checkTokenExpired()
    }, 2000)
  }, [])

  return (
    <SafeAreaView style={styles.splashContainer}>
      <Image source={images.favicon} />
    </SafeAreaView>
  )
}

export default Splash
