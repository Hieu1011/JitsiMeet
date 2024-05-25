import React, {useState, useEffect} from 'react'
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Image
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import { useSelector } from 'react-redux'
import { getRoomMembers, getRoomRequests } from '../../../api/roomApi'
import {COLORS} from '../../../../constants'
import styles from './member.style'

const Member = ({navigation, route}) => {
  const data = route.params
  const user = useSelector(state => state.user.info)

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {key: 'owner', title: 'Chủ phòng'},
    {key: 'members', title: 'Thành viên'}
  ])  

  const [ownerData, setOwnerData] = useState([])
  const [membersData, setMembersData] = useState([])

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Image style={styles.itemAvt} source={{uri: item.userId.avatarUrl}}/>
      <Text style={styles.itemText}>{item.userId.username} {item.userId._id === user.id ? '(Tôi)': ''}</Text>
    </View>
    )
  }
  useEffect(() => {
    (
      async () => {
        const result = await getRoomMembers(data._id)

        const hostId = data.hostId
        const owner = result.participants.filter(
          participant => participant.userId._id === hostId
        )
        const members = result.participants.filter(
          participant => participant.userId._id !== hostId
        )
        setOwnerData(owner)
        setMembersData(members)
      }
    ) ()
  }, [])

  const Owner = () => (
    <View style={styles.content}>
      <FlatList
        data={ownerData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  )

  const Members = () => (
    <View style={styles.content}>
      <FlatList
        data={membersData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  )

  const renderScene = SceneMap({
    owner: Owner,
    members: Members
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{maxWidth: 50}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color={COLORS.black} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>Thành viên nhóm</Text>
        </View>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        // initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: COLORS.primary}}
            style={{backgroundColor: COLORS.white}}
            labelStyle={{color: COLORS.black}}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Member
