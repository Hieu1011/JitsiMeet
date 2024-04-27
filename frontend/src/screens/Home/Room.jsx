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

const Room = ({route, navigation}) => {
  const data = route.params
  const [visible, setVisible] = useState(false)

  console.log(route.params)

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

      <View style={styles.content}></View>

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

            <TouchableOpacity style={styles.modalItem}>
              <MaterialCommunityIcons name="account-arrow-left-outline" size={24} color={COLORS.black} />
              <Text style={{fontSize: 16, color: COLORS.black}}>
                Rời khỏi nhóm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Room
