import React, {useCallback, useEffect, useState} from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import {Avatar, Menu, Modal, PaperProvider} from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {filter} from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import Video from '../Video/Video'
import SearchBar from '../../components/SearchBar'
import List from '../../components/List'
import Title from '../../components/Title'
import CreateRoom from '../../components/CreateRoom'
import JoinRoom from '../../components/JoinRoom'
import {getAllRooms, joinRoom} from '../../api/roomApi'
import {COLORS, images} from '../../../constants'
import styles from './home.style'
import { useFocusEffect } from '@react-navigation/native'

const Home = ({navigation}) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.info)

  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuVisible, setMenuVisible] = useState(false)
  const [roomVisible, setRoomVisible] = useState(false)
  const [videoVisible, setVideoVisible] = useState(false)
  const [joinVisible, setJoinVisible] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [data, setData] = useState([]) //Room data hiển thị (đã join)
  const [fullData, setFullData] = useState([]) //Tất cả r
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const loadRooms = async () => {
    setIsLoading(true)
    try {
      const result = await getAllRooms()
      const filteredRooms = result.filter(room =>
        room.participants.some(
          participant => participant.userId === userInfo.id
        )
      )
      // console.log(userInfo.userId);
      

      setData(filteredRooms)
      setFullData(result.reverse())
      setIsLoading(false)
      setRetryCount(0)
    } catch (err) {
      setIsLoading(true)
      console.log(err)
      setError(
        err.message ||
          'Error in fetching data. Please check your internet connection!'
      )
    }
  }

  useEffect(() => {
    const MAX_RETRY = 3 // Số lần thử lại tối đa
    const TIMEOUT = 3000 // Thời gian timeout (3 giây)

    const fetchData = async () => {
      try {
        await loadRooms()
      } catch (error) {
        // Nếu có lỗi, kiểm tra số lần thử lại
        if (retryCount < MAX_RETRY) {
          // Nếu chưa đạt số lần thử lại tối đa, tăng biến đếm và thử lại sau TIMEOUT
          setRetryCount(retryCount + 1)
          setTimeout(fetchData, TIMEOUT)
        } else {
          // Nếu đã đạt số lần thử lại tối đa, đặt lỗi để thông báo cho người dùng
          setError(
            'Error in fetching data. Please check your internet connection!'
          )
        }
      }
    }

    fetchData()
  }, [retryCount])
  useFocusEffect(
    useCallback(() => {
      loadRooms()
    }, [])
  )

  const toggleMenu = () => {
    setMenuVisible(prevVisible => !prevVisible)
  }

  const handleSearch = query => {
    setSearchQuery(query)
    const formattedQuery = query.toLowerCase()
    if (formattedQuery === '') {
      const joinedRooms = fullData.filter(room =>
        room.participants.some(
          participant => participant.userId === userInfo.id
        )
      )
      setData(joinedRooms)
    } else {
      const filteredData = filter(fullData, room => {
        return contains(room, formattedQuery)
      })
      setData(filteredData)
    }
  }

  const contains = ({title}, query) => {
    if (title.toLowerCase()?.includes(query)) {
      return true
    }
    return false
  }

  const handleRoomClick = room => {
    const hasJoined = room.participants.some(
      participant => participant.userId === userInfo.id
    )
    console.log(hasJoined)

    if (hasJoined) {
      navigation.navigate('Room', room)
    } else {
      setSelectedRoom(room)
      setJoinVisible(true)
    }
  }

  const handleJoinRoom = async () => {
    const hasRequested =
      Array.isArray(selectedRoom.pendingUsers) &&
      selectedRoom.pendingUsers.includes(userInfo.id)

    console.log(selectedRoom, hasRequested)

    try {
      if (!hasRequested) {
        const res = await joinRoom(userInfo.id, selectedRoom._id)
        console.log(res)

        await loadRooms() // Load lại danh sách phòng sau khi gửi yêu cầu
        setSelectedRoom(prevRoom => ({
          ...prevRoom,
          pendingUsers: [...prevRoom.pendingUsers, userInfo.id]
        }))
        ToastAndroid.show(
          'Yêu cầu tham gia phòng đã được gửi!',
          ToastAndroid.BOTTOM
        )
      } else {
        ToastAndroid.show(
          'Bạn đã yêu cầu tham gia phòng này rồi!',
          ToastAndroid.BOTTOM
        )
      }
    } catch (err) {
      console.log(err)
      ToastAndroid.show(
        'Không thể tham gia phòng này hoặc phòng không tồn tại!',
        ToastAndroid.BOTTOM
      )
    }

    setJoinVisible(false)
    // navigation.navigate('RoomDetail', { room: selectedRoom });
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.white
        }}>
        <Text>{error}</Text>
      </View>
    )
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 5,
              paddingBottom: 10
            }}>
            <Avatar.Image
              style={styles.avatar}
              source={{uri: userInfo.avatar}}
              size={32}
            />
            <Title
              title="Welcome to Video Call App"
              size={22}
              weight="500"
              color={COLORS.secondary}
            />

            <Menu
              visible={menuVisible}
              onDismiss={toggleMenu}
              anchor={
                <TouchableOpacity onPress={toggleMenu}>
                  <AntDesign name="plus" size={20} color={COLORS.black} />
                </TouchableOpacity>
              }>
              <Menu.Item
                onPress={() => {
                  if (userInfo.role !== 3) {
                    setRoomVisible(true)
                    toggleMenu()
                  } else {
                    Alert.alert('Thông báo', 'Bạn không có quyền tạo phòng')
                  }
                }}
                title="Create Room"
              />
              <Menu.Item
                onPress={() => {
                  setVideoVisible(true)
                  toggleMenu()
                }}
                title="Join Meeting"
              />
            </Menu>

            <CreateRoom
              isShow={roomVisible}
              setIsShow={setRoomVisible}
              loadRooms={loadRooms}
            />
          </View>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onChangeText={query => handleSearch(query)}
          />
        </View>

        {!isLoading ? (
          data.length > 0 ? (
            <List
              data={data}
              navigation={navigation}
              onPressItem={handleRoomClick}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 14, color: COLORS.black}}>
                Không tìm thấy phòng.
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10
            }}>
            <ActivityIndicator size={24} />
            <Text style={{fontSize: 14, color: COLORS.black}}>
              Loading rooms...
            </Text>
          </View>
        )}

        <JoinRoom
          isShow={joinVisible}
          setIsShow={setJoinVisible}
          handleJoinRoom={handleJoinRoom}
        />
        <Modal
          visible={videoVisible}
          onDismiss={() => setVideoVisible(false)}
          contentContainerStyle={styles.modal}>
          <Video navigation={navigation} />
        </Modal>
      </SafeAreaView>
    </PaperProvider>
  )
}

export default Home
