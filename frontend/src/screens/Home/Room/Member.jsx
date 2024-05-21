import React, {useState, useEffect} from 'react'
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  StyleSheet
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import {COLORS} from '../../../../constants'
import styles from './room.style'

const renderItem = ({item}) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{item.userId}</Text>
  </View>
)

const Member = ({navigation, route}) => {
  const data = route.params

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {key: 'owner', title: 'Chủ phòng'},
    {key: 'members', title: 'Thành viên'}
  ])

  const [ownerData, setOwnerData] = useState([])
  const [membersData, setMembersData] = useState([])

  useEffect(() => {
    const hostId = data.hostId
    const owner = data.participants.filter(
      participant => participant.userId === hostId
    )
    const members = data.participants.filter(
      participant => participant.userId !== hostId
    )
    setOwnerData(owner)
    setMembersData(members)
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
