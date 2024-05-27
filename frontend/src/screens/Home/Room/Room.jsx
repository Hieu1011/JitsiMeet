import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
  ToastAndroid,
  FlatList,
  Image
} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import {FAB, TextInput} from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './room.style'
import {COLORS} from '../../../../constants'
import Title from '../../../components/Title'
import {channel} from '../../../../assets/data/channelData'
import {useSelector} from 'react-redux'
import {
  approveUser,
  deleteRoom,
  getRoomRequests,
  inviteToRoom,
  leaveRoom,
  rejectUser
} from '../../../api/roomApi'
import {getAllMeetings} from '../../../api/meetingApi'
import {useFocusEffect} from '@react-navigation/native'

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

const Room = ({route, navigation}) => {
  const data = route.params

  const user = useSelector(state => state.user.info)

  const [email, setEmail] = useState('')
  const [requests, setRequests] = useState([])
  const [meetings, setMeetings] = useState([])
  const [visible, setVisible] = useState(false)
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
  const [leaveConfirmModal, setLeaveConfirmModal] = useState(false)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [requestModalVisible, setRequestModalVisible] = useState(false)
  const room = `vpaas-magic-cookie-aa87917959cf4f0f95d3b5eac48edb1e/${normalizeString(data.title)}`

  // console.log('Room: ', data)
  // console.log('User: ', user)

  useEffect(() => {
    fetchRequests()
    fetchMeetings()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchMeetings()
    }, [])
  )

  const fetchRequests = async () => {
    try {
      const response = await getRoomRequests(data._id)
      setRequests(response.requests)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMeetings = async () => {
    try {
      const response = await getAllMeetings(data._id)
      console.log(response.meetings)

      setMeetings(response.meetings)
    } catch (err) {
      console.log(err)
    }
  }

  const handleInviteMember = async () => {
    try {
      await inviteToRoom(email, data._id)
      ToastAndroid.show('Đã mời thành viên!', ToastAndroid.BOTTOM)
      setEmail('')
    } catch (err) {
      ToastAndroid.show('Đã xảy ra lỗi! Vui lòng thử lại', ToastAndroid.BOTTOM)
    }
  }

  const handleApproveMember = async userId => {
    try {
      await approveUser(userId, data._id)
      ToastAndroid.show('Đã duyệt yêu cầu!', ToastAndroid.BOTTOM)
      fetchRequests() // Refresh the request list
    } catch (error) {
      ToastAndroid.show('Đã xảy ra lỗi! Vui lòng thử lại', ToastAndroid.BOTTOM)
      console.log(error)
    }
  }

  const handleRejectMember = async userId => {
    try {
      await rejectUser(userId, data._id)
      ToastAndroid.show('Đã từ chối yêu cầu!', ToastAndroid.BOTTOM)
      fetchRequests() // Refresh the request list
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteRoom = async () => {
    await deleteRoom(data._id)
    ToastAndroid.show('Xóa phòng thành công!', ToastAndroid.BOTTOM)
    navigation.goBack()
  }

  const handleLeaveRoom = async () => {
    if (data.participants.length === 1) {
      await leaveRoom(user.id, data._id)

      await deleteRoom(data._id)
    } else {
      await leaveRoom(user.id, data._id)
    }

    ToastAndroid.show('Đã rời khỏi phòng!', ToastAndroid.BOTTOM)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{maxWidth: 50}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color={COLORS.black} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>{data.title}</Text>
        </View>

        <TouchableOpacity
          style={{maxWidth: 50}}
          onPress={() => setVisible(!visible)}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={{paddingLeft: 20}}>
          <Text style={{fontSize: 14, color: COLORS.black}}>{data.desc}</Text>
        </View>

        <View style={{marginTop: 10}}>
          {meetings && meetings.length > 0
            ? meetings.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={{marginVertical: 8, padding: 10, borderWidth: 0.5}}
                  onPress={() =>  navigation.navigate('Meeting', {room, data, roomId: data._id})}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: COLORS.black
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13
                    }}>
                    {item.desc}
                  </Text>
                </TouchableOpacity>
              ))
            : null}
        </View>
      </View>

      <FAB
        disabled={!user.moderator}
        style={{position: 'absolute', bottom: 10, right: 10}}
        icon="video-outline"
        size="medium"
        onPress={() =>
          navigation.navigate('Meeting', {room, data, roomId: data._id})
        }
      />
      <Modal transparent={true} visible={visible} animationType="slide">
        <Pressable onPress={() => setVisible(false)} style={styles.pressable} />
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Title title={data.title} size={24} style={styles.textTitle} />
          </View>

          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => navigation.navigate('Member', data)}>
              <Ionicons name="people-outline" size={24} color={COLORS.black} />
              <Text style={{fontSize: 16, color: COLORS.black}}>
                Xem thành viên
              </Text>
            </TouchableOpacity>

            {user.moderator === true && (
              <View>
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setInviteModalVisible(true)
                    setVisible(false)
                  }}>
                  <MaterialCommunityIcons
                    name="account-plus-outline"
                    size={24}
                    color={COLORS.black}
                  />
                  <Text style={{fontSize: 16, color: COLORS.black}}>
                    Mời thành viên
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setRequestModalVisible(true)
                    setVisible(false)
                  }}>
                  <Octicons name="checklist" size={24} color={COLORS.black} />
                  <Text style={{fontSize: 16, color: COLORS.black}}>
                    Duyệt yêu cầu
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setDeleteConfirmModal(true)
                    setVisible(false)
                  }}>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={24}
                    color={COLORS.black}
                  />
                  <Text style={{fontSize: 16, color: COLORS.black}}>
                    Xoá phòng
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setLeaveConfirmModal(true)
                setVisible(false)
              }}>
              <MaterialCommunityIcons
                name="account-arrow-left-outline"
                size={24}
                color={COLORS.black}
              />
              <Text style={{fontSize: 16, color: COLORS.black}}>
                Rời khỏi phòng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={requestModalVisible}>
        <Pressable
          onPress={() => setRequestModalVisible(false)}
          style={styles.pressable}
        />
        <View style={styles.requestBackdrop}>
          <View style={styles.requestModal}>
            <Text style={styles.label}>Danh sách yêu cầu</Text>
            {requests.length > 0 ? (
              <FlatList
                data={requests}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <View style={styles.requestItem}>
                    <View style={styles.requestInfo}>
                      <Image
                        style={styles.itemAvt}
                        source={{uri: item.avatarUrl}}
                      />
                      <View style={{flex: 1}}>
                        <Text style={styles.requestText}>
                          Tên: {item.username}
                        </Text>
                        <Text style={styles.requestText}>
                          Email: {item.email}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.requestActions}>
                      <TouchableOpacity
                        style={styles.approveBtn}
                        onPress={() => handleApproveMember(item._id)}>
                        <Text style={styles.btnText}>Duyệt</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rejectBtn}
                        onPress={() => handleRejectMember(item._id)}>
                        <Text style={styles.btnText}>Từ chối</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.question}>
                Hiện tại không có yêu cầu tham gia nào
              </Text>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={inviteModalVisible}
        onRequestClose={() => setInviteModalVisible(false)}>
        <View style={styles.deleteRoomBackdrop}>
          <View style={styles.deleteRoomModal}>
            <Text style={styles.label}>Nhập email thành viên</Text>
            <TextInput
              style={{height: 45, width: 250, marginBottom: 20}}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />

            <View style={styles.btnWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setInviteModalVisible(false)
                  setEmail('')
                }}
                style={styles.cancelBtn}>
                <Text style={styles.btnText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleInviteMember}
                style={styles.approveBtn}>
                <Text style={styles.btnText}>Mời</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteConfirmModal}
        onRequestClose={() => setDeleteConfirmModal(false)}>
        <View style={styles.deleteRoomBackdrop}>
          <View style={styles.deleteRoomModal}>
            <Text style={styles.label}>Xác nhận xóa phòng</Text>
            <Text style={styles.question}>
              Bạn có chắc chắn muốn xóa phòng này?
            </Text>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                onPress={() => setDeleteConfirmModal(false)}
                style={styles.cancelBtn}>
                <Text style={styles.btnText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteRoom}
                style={styles.confirmBtn}>
                <Text style={styles.btnText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={leaveConfirmModal}
        onRequestClose={() => setLeaveConfirmModal(false)}>
        <View style={styles.deleteRoomBackdrop}>
          <View style={styles.deleteRoomModal}>
            <Text style={styles.label}>Xác nhận rời phòng</Text>
            <Text style={styles.question}>
              Bạn có chắc chắn muốn rời phòng?
            </Text>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                onPress={() => setLeaveConfirmModal(false)}
                style={styles.cancelBtn}>
                <Text style={styles.btnText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLeaveRoom}
                style={styles.confirmBtn}>
                <Text style={styles.btnText}>Rời khỏi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Room
