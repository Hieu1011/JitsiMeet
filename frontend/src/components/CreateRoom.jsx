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
import { useSelector } from 'react-redux'
import TextAreaComponent from './TextAreaComponent'
import TextInputComponent from './TextInputComponent'
import {COLORS} from '../../constants'
import {createRoom} from '../api/roomApi'

const {width, height} = Dimensions.get('window')
const CreateRoom = ({isShow, setIsShow, loadRooms}) => {
  const userInfo = useSelector(state => state.user.info)
  const [roomName, setRoomName] = useState('')
  const [desc, setDesc] = useState('')

  const handleCreateRoom = async () => {
    try {
      await createRoom(
        roomName,
        userInfo.id,
        'https://firebasestorage.googleapis.com/v0/b/jitsimeet-1234.appspot.com/o/3530322.jpg?alt=media&token=80a7ebd5-0a65-4851-ac8b-e86bb9d8ab80',
        desc
      )
      ToastAndroid.show('Tạo phòng thành công!', ToastAndroid.BOTTOM)
    } catch (error) {
      ToastAndroid.show('Lỗi tạo phòng! Hãy thử lại', ToastAndroid.BOTTOM)
    }
    
    loadRooms()
    setIsShow(!isShow)

    setRoomName('')
    setDesc('')
  }

  return (
    <Modal
      transparent
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow)
        setRoomName('')
        setDesc('')
      }}
      animationType="fade">
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          setIsShow(!isShow)
          setRoomName('')
          setDesc('')
        }}
      />

      <View style={styles.modal}>
        <Text style={styles.label}>Tạo phòng mới</Text>

        <TextInputComponent
          iconName={'account-group'}
          label="Tên phòng"
          placeholder="Nhập tên phòng"
          value={roomName}
          setValue={setRoomName}
        />

        <TextAreaComponent
          label="Mô tả"
          maxLength={100}
          value={desc}
          setValue={setDesc}
        />

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsShow(!isShow)
              setRoomName('')
              setDesc('')
            }}>
            <Text style={styles.btnText}>Hủy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleCreateRoom}>
            <Text style={styles.btnText}>Tạo phòng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default CreateRoom

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modal: {
    width: width * 0.9,
    height: height * 0.47,
    backgroundColor: '#fff',
    position: 'absolute',
    top: (height - height * 0.45) / 2,
    left: (width - 0.9 * width) / 2,
    gap: 20,
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
    justifyContent: 'flex-end',
    gap: 15
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
