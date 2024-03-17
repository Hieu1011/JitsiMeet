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
import {COLORS, images} from '../../../constants'
import styles from './profile.style'
import Title from '../../components/Title'
import SelectDropdown from 'react-native-select-dropdown'
import status from '../../../assets/data/statusData'

const Profile = ({visible, setVisible}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <Pressable onPress={() => setVisible(false)} style={styles.pressable} />
      <View style={styles.container}>
        <View>
          <Title title="Profile" size={24} style={styles.header}></Title>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              position: 'absolute',
              right: 0,
              margin: 10
            }}>
            <MaterialIcons name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View>
            <Image
              source={images.hero1}
              resizeMode="cover"
              style={styles.avatar}
            />
            <Text>Bùi Lương Hiếu</Text>
            <Text>UIT - CNPM</Text>
          </View>

          <View>
            <View>
              <Text>Email</Text>
              <Text>20520994@gm.uit.edu.vn</Text>
            </View>

            <View>
              <Text>Phone number</Text>
              <Text>0999999999</Text>
            </View>

            <View>
              <Text>Status</Text>
              <SelectDropdown
                data={status}
                defaultButtonText="Select Status"></SelectDropdown>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Profile
