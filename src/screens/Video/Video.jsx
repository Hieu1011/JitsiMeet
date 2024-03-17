import React, {useState} from 'react'
import {Button, TextInput, View} from 'react-native'
import styles from './video.style'

const Video = ({navigation}) => {
  const [room, onChangeRoom] = useState('')

  return (
    <View
      style={styles.container}>
      <TextInput
        onChangeText={onChangeRoom}
        placeholder="Enter room name here"
        style={{color: 'black', padding: 32}}
        value={room}
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
