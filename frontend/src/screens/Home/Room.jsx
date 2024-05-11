import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native'
import React, {useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './room.style'
import {COLORS} from '../../../constants'
import Title from '../../components/Title'
import {channel} from '../../../assets/data/channelData'
import {useSelector} from 'react-redux'

const Room = ({route, navigation}) => {
  const data = route.params
  const user = useSelector(state => state.user.info)
  const [visible, setVisible] = useState(false)

  console.log('Room: ', data)
  console.log('User: ', user)

  const handleDeleteRoom = () => {
  }
  const handleLeaveRoom = () => {
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
        <View style={{paddingLeft: 20,}}>
          <Text style={{fontSize: 14, color: COLORS.black}}>{data.desc}</Text>
        </View>

        {/* <View style={{marginTop: 10}}>
          {channel
            .filter(item => item.roomId === data._id)
            .map(item => (
              <TouchableOpacity
                key={item.id}
                style={{marginVertical: 8, padding: 10, borderWidth: 0.5}}
                onPress={() =>
                  navigation.navigate('Channel', {item, roomTitle: data.title})
                }>
                <Text
                  style={{fontSize: 15, fontWeight: 400, color: COLORS.black}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View> */}
      </View>

      <Modal transparent={true} visible={visible} animationType="fade">
        <Pressable onPress={() => setVisible(false)} style={styles.pressable} />
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Title title={data.title} size={24} style={styles.textTitle} />
          </View>

          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem}>
              <Ionicons name="people-outline" size={24} color={COLORS.black} />
              <Text style={{fontSize: 16, color: COLORS.black}}>
                Xem thành viên
              </Text>
            </TouchableOpacity>

            {user.moderator && (
              <TouchableOpacity style={styles.modalItem} onPress={() => handleDeleteRoom()}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={24}
                  color={COLORS.black}
                />
                <Text style={{fontSize: 16, color: COLORS.black}}>
                  Xoá phòng
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.modalItem} onPress={() => handleLeaveRoom()}>
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
    </SafeAreaView>
  )
}

export default Room
