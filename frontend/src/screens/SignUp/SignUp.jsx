import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CheckBox from '@react-native-community/checkbox'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { register, login } from '../../api/authApi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setInfo, setFeatures, setRoom} from '../../redux/slices/userSlice'
import Button from '../../components/Button'
import {images,COLORS} from '../../../constants'
import styles from './signUp.style'

const SignUp = ({navigation}) => {
  const dispatch = useDispatch()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    const signUpResponse = await register(email, phone, password, username)
  
    if (signUpResponse.data === 'User already exists') {
      Alert.alert(signUpResponse.data)
    }
    else {
      const loginResponse = await login(email, password)
      const decoded = jwtDecode(loginResponse.data.token)

      try {
        await AsyncStorage.setItem('token', loginResponse.data.token)
        // await AsyncStorage.setItem('userInfo', JSON.stringify(decoded))

        dispatch(setInfo(decoded.context.user))
        dispatch(setFeatures(decoded.context.features))
        dispatch(setRoom(decoded.room))
        navigation.replace('BottomNavigator')
      }
      catch (err) {
        console.log(err)
      }
    }
  }
  
  return (
    <SafeAreaView style={styles.signUpContainer}>
        <View style={styles.labelWrapper}>
          <Text
            style={styles.createAccountLabel}>
            Create Account
          </Text>

          <Text
            style={styles.connectLabel}>
            Connect with your friend today!
          </Text>
        </View>

        <View style={styles.in4InputWrapper}> 
          <Text
            style={styles.inputLabel}>
            Username
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22
            }}>
            <TextInput
              value={username}
              onChangeText={text => setUsername(text)}
              placeholder="Enter your username"
              placeholderTextColor={COLORS.black}
              style={{
                width: '100%'
              }}
            />
          </View>
        </View>

        <View style={styles.in4InputWrapper}> 
          <Text
            style={styles.inputLabel}>
            Email
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22
            }}>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: '100%'
              }}
            />
          </View>
        </View>

        <View style={styles.in4InputWrapper}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8
            }}>
            Mobile Number
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 22
            }}>
            <TextInput
              placeholder="+84"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '12%',
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: '100%'
              }}
            />

            <TextInput
              value={phone}
              onChangeText={text => setPhone(text)}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '80%'
              }}
            />
          </View>
        </View>

        <View style={styles.in4InputWrapper}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8
            }}>
            Password
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22
            }}>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                width: '100%'
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12
              }}>
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 6
          }}>
          <CheckBox
            style={{marginRight: 8}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>I aggree to the terms and conditions</Text>
        </View>

        <Button
          title="Sign Up"
          filled
          onPress={handleSignUp}
          style={{
            marginTop: 18,
            marginBottom: 4
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
          <Text style={{fontSize: 14}}>Or</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}>
            <Image
              source={images.facebook}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode="contain"
            />

            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}>
            <Image
              source={images.google}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22
          }}>
          <Text style={{fontSize: 16, color: COLORS.black}}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default SignUp
