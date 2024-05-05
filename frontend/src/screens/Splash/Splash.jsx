import {SafeAreaView, Image} from 'react-native'
import React, {useEffect} from 'react'
import styles from './splash.style'
import {images} from '../../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const Splash = ({navigation}) => {
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
      }
      else {
        navigation.replace('BottomNavigator')
      }
    }
    catch (err) {
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
