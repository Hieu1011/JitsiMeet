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
              source={images.hero1}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.title}>Bùi Lương Hiếu</Text>
            <Text style={[styles.value, {alignSelf: 'center'}]}>
              UIT - CNPM
            </Text>
          </View>

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text style={styles.title}>Email: </Text>
              <Text style={styles.value}>20520994@gm.uit.edu.vn</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.title}>Phone number: </Text>
              <Text style={styles.value}>0999999999</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.title}>Status: </Text>
              <SelectDropdown
                rowTextStyle={{textAlign: 'auto'}}
                rowStyle={{height: 25}}
                buttonStyle={{
                  height: 25,
                  width: 150,
                  borderWidth: 0.5,
                  borderRadius: 7,
                  backgroundColor: COLORS.secondary
                }}
                data={status}
                defaultButtonText="Select Status"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Profile
