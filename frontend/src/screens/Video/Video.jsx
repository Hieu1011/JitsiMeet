import React, {useState} from 'react'
import {Button, TextInput, View} from 'react-native'
import styles from './video.style'

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

const Video = ({navigation}) => {
  const [text, setText] = useState('')
  const [room, setRoom] = useState('');
  
  const handleRoomURL = (text) => {
    setText(text);
    setRoom(`vpaas-magic-cookie-aa87917959cf4f0f95d3b5eac48edb1e/${normalizeString(text)}`)
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => handleRoomURL(text)}
        placeholder="Enter room name here"
        style={{color: 'black', padding: 32, textAlign: 'center'}}
        value={text}
      />
      <Button
        color="blue"
        disabled={!room}
        onPress={() => navigation.navigate('Meeting', {room})}
        style={{height: 32, width: 32}}
        title="Join"
      />
    </View>
  )
}

export default Video
