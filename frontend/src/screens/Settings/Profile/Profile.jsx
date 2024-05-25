import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  Text,
  Pressable
} from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { setStatus } from '../../../redux/slices/userSlice'
import Title from '../../../components/Title'
import {status} from '../../../../assets/data/statusData'
import {COLORS, images} from '../../../../constants'
import styles from './profile.style'


const Profile = ({visible, setVisible}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userInfo = useSelector(state => state.user.info)

  const handleSelectStatus = (item) => {
    dispatch(setStatus(item))
  }

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <Pressable onPress={() => setVisible(false)} style={styles.pressable} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Title title="Profile" size={24} style={styles.headerText}></Title>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              position: 'absolute',
              right: 5,
              margin: 5
            }}>
            <MaterialIcons name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.avatar}>
            <Image
              source={{uri: userInfo.avatar}}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.title}>{userInfo.name}</Text>
            <Text style={[styles.value, {alignSelf: 'center'}]}>
              UIT - CNPM
            </Text>
          </View>

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text style={styles.title}>Email: </Text>
              <Text style={styles.value}>{userInfo.email}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.title}>Phone number: </Text>
              <Text style={styles.value}>0999999999</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.title}>Status: </Text>
              <SelectDropdown
                rowTextStyle={{fontSize: 16,textAlign: 'auto'}}
                rowStyle={{height: 30}}
                buttonTextStyle={{fontSize: 16}}
                buttonStyle={{
                  height: 25,
                  width: 150,
                  borderWidth: 0.5,
                  borderRadius: 5,
                }}
                data={status}
                onSelect={(item) => handleSelectStatus(item)}
                defaultButtonText={user.status ? user.status : "Select Status"}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Profile
