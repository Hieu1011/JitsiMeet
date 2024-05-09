import React, {useEffect, useState} from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import {Avatar, Menu, Modal, PaperProvider} from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {filter} from 'lodash'
import SearchBar from '../../components/SearchBar'
import List from '../../components/List'
import Title from '../../components/Title'
import Video from '../Video/Video'
import {COLORS, images} from '../../../constants'
import styles from './home.style'
import { room } from '../../../assets/data/roomData'
import CreateRoom from '../../components/CreateRoom'
import { getAllRooms } from '../../api/roomApi'

const Home = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuVisible, setMenuVisible] = useState(false)
  const [videoVisible, setVideoVisible] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [fullData, setFullData] = useState([])
  const [showModal, setShowModal] = useState(false)

  const loadRooms = async () => {
    const result = await getAllRooms()

    setIsLoading(true)
    setData(result)
    setFullData(result.reverse())
  }

  useEffect(() => {
    loadRooms()
  }, [])

  const toggleMenu = () => {
    setMenuVisible(prevVisible => !prevVisible)
  }
  const toggleVideo = () => {
    setVideoVisible(prevVisible => !prevVisible)
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Error in fetching data ... Please check your internet connection!{' '}
        </Text>
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
                <Menu.Item onPress={() => {
                  setShowModal(true)
                  toggleMenu()
                }} 
                title="Create Room" 
                />
                <Menu.Item onPress={toggleVideo} title="Join Meeting" />
              </Menu>

              <CreateRoom isShow={showModal} setIsShow={setShowModal} loadRooms={loadRooms}/>
            </View>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onChangeText={query => handleSearch(query)}
            />
          </View>

          <List data={data} navigation={navigation} />

          {/* <Portal> */}

          <Modal
            visible={videoVisible}
            onDismiss={toggleVideo}
            contentContainerStyle={styles.modal}>
            <Video navigation={navigation} />
          </Modal>

          {/* </Portal> */}
        </SafeAreaView>
      </PaperProvider>
  )
}

export default Home
