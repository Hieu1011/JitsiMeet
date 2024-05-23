import React, {useState} from 'react'
import {
  Modal,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ToastAndroid
} from 'react-native'
import TextAreaComponent from './TextAreaComponent'
import TextInputComponent from './TextInputComponent'
import {COLORS} from '../../constants'
import {joinRoom} from '../api/roomApi'

const {width, height} = Dimensions.get('window')
const JoinRoom = ({isShow, setIsShow, handleJoinRoom}) => {
  return (
    <Modal
      transparent
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow)
      }}
      animationType="fade">
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          setIsShow(!isShow)
        }}
      />

      <View style={styles.modal}>
        <Text style={styles.label}>Tham gia phòng</Text>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsShow(!isShow)
            }}>
            <Text style={styles.btnText}>Hủy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleJoinRoom}>
            <Text style={styles.btnText}>Yêu cầu tham gia</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default JoinRoom

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modal: {
    width: width * 0.7,
    height: height * 0.15,
    backgroundColor: '#fff',
    position: 'absolute',
    top: (height - height * 0.15) / 2,
    left: (width - 0.7 * width) / 2,
    gap: 25,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  label: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: '#000'
  },

  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30
  },

  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItemsL: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary
  },

  btnText: {
    color: '#fff',
    fontWeight: '500'
  }
})
