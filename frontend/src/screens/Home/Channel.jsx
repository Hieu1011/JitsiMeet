import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {COLORS} from '../../../constants'
import styles from './channel.style'

const normalizeString = str => {
  // Xóa dấu tiếng Việt
  str = str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  // Thay thế các ký tự không mong muốn bằng khoảng trắng
  str = str.replace(/[^\w\s]/gi, '')

  // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
  str = str.trim()

  // Thay thế khoảng trắng bằng dấu gạch dưới
  str = str.replace(/\s+/g, '')

  console.log(str)
  return str
}

const Channel = ({route, navigation}) => {
  const {item, roomTitle} = route.params
  const room = `vpaas-magic-cookie-aa87917959cf4f0f95d3b5eac48edb1e/${normalizeString(item.title)}`

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{maxWidth: 50}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color={COLORS.black} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={{fontSize: 14, color: 'gray', textAlign: 'center'}}>
            {roomTitle}
          </Text>
        </View>

        <TouchableOpacity
          style={{maxWidth: 50}}
          onPress={() => navigation.navigate('Meeting', {room})}>
          <Ionicons name="videocam-outline" size={22} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        
      </View>
    </SafeAreaView>
  )
}

export default Channel
