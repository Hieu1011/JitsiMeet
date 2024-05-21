import React, {useEffect, useState} from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ActivityIndicator
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
import {getAllRooms} from '../../api/roomApi'
import {COLORS, images} from '../../../constants'
import styles from './home.style'
import { room } from '../../../assets/data/roomData'
import CreateRoom from '../../components/CreateRoom'
import { getAllRooms } from '../../api/roomApi'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Home = ({navigation}) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.info)

  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuVisible, setMenuVisible] = useState(false)
  const [roomVisible, setRoomVisible] = useState(false)
  const [videoVisible, setVideoVisible] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [fullData, setFullData] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = async () => {
    setUserInfo(JSON.parse(await AsyncStorage.getItem('userInfo')))
  }

  const [retryCount, setRetryCount] = useState(0)


  const loadRooms = async () => {
    setIsLoading(true)
    try {
      const result = await getAllRooms()
      setData(result)
      setFullData(result.reverse())
      setIsLoading(false)
      setRetryCount(0)
    } catch (err) {
      setIsLoading(false)
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
    getUserInfo()
  }, [retryCount])

  const toggleMenu = () => {
    setMenuVisible(prevVisible => !prevVisible)
  }

  const handleSearch = query => {
    const formattedQuery = query.toLowerCase()
    const filteredData = filter(fullData, room => {
      return contains(room, formattedQuery)
    })
    setData(filteredData)
  }

  const contains = ({title}, query) => {
    if (title.toLowerCase()?.includes(query)) {
      return true
    }
    return false
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center'
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
              source={images.hero1}
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
                    setVideoVisible(true)
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
          <List data={data} navigation={navigation} />
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
