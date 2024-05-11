import {useTheme, Text, Button, List} from 'react-native-paper'
import React, {useState} from 'react'
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native'
import {useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Profile from './Profile/Profile'
import {statusObject} from '../../../assets/data/statusData'
import {images} from '../../../constants'
import styles from './settings.style'

const Settings = ({navigation}) => {
  const theme = useTheme()
  const [openModal, setOpenModal] = useState(false)
  const user = useSelector(state => state.user)
  const userInfo = useSelector(state => state.user.info)

  const navigateToSecurity = () => {
    console.log('Security function')
  }
  const navigateToNotifications = () => {
    console.log('Notifications function')
  }
  const navigateToPrivacy = () => {
    console.log('Privacy function')
  }
  const navigateToSupport = () => {
    console.log('Support function')
  }
  const navigateToTermsAndPolicies = () => {
    console.log('Terms and Policies function')
  }
  const navigateToReportProblem = () => {
    console.log('Report a problem')
  }
  const logout = async () => {
    try {
      Alert.alert('Log out?', 'Do you want to log out?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.removeItem('token')
            navigation.replace('SignIn')
          }
        }
      ])
    } catch (err) {
      console.error('Error logging out:', err)
      Alert.alert('Error', 'Failed to log out. Please try again.')
    }
  }

  const settingItems = [
    {
      title: 'Security',
      desc: 'Manage your account security settings.',
      icon: 'security',
      action: navigateToSecurity
    },
    {
      title: 'Notifications',
      desc: 'Adjust your notification preferences.',
      icon: 'bell-outline',
      action: navigateToNotifications
    },
    {
      title: 'Privacy',
      desc: 'Control your privacy settings.',
      icon: 'lock-outline',
      action: navigateToPrivacy
    },
    {
      title: 'Help & Support',
      desc: 'Get help and support from our team.',
      icon: 'help-circle-outline',
      action: navigateToSupport
    },
    {
      title: 'Terms and Policies',
      desc: 'Read our terms and policies.',
      icon: 'information-outline',
      action: navigateToTermsAndPolicies
    },
    {
      title: 'Report a problem',
      desc: 'Report any problems or issues you encounter.',
      icon: 'flag-variant-outline',
      action: navigateToReportProblem
    },
    {
      title: 'Log out',
      desc: 'Log out of your account.',
      icon: 'logout',
      action: logout
    }
  ]

  const renderSettingsItem = ({title, desc, icon, action}) => (
    <List.Item
      title={title}
      description={desc}
      left={() => <List.Icon style={styles.settingCenter} icon={icon} />}
      right={() => <List.Icon icon="chevron-right" />}
      onPress={action}
    />
  )
  const renderStatusIcon = (statusName) => {
    const statusItem = statusObject.find(item => item.name === statusName)
    if (statusItem) {
      return (
        <MaterialCommunityIcons
          name={statusItem.icon}
          size={18}
          color={statusItem.color}
        />
      )
    } else {
      return null
    }
  }  

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.profile}>
        <Image source={images.hero1} style={styles.img} />
        <View style={styles.userInfo}>
          <View style={styles.editContainer}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Button
              icon="pencil"
              mode="text"
              onPress={() => setOpenModal(true)}
              contentStyle={{flexDirection: 'row-reverse'}}>
              Edit
            </Button>
          </View>
          <Text>UIT - CNPM</Text>
          <Text>Email: {userInfo.email}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
           {renderStatusIcon(user.status)}
            <Text>{user.status}</Text>
            {/* <MaterialCommunityIcons name={status.find((item.name) === user.status)} /> */}
          </View>
        </View>
      </View>
      <ScrollView>
        <List.Section>
          {settingItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderSettingsItem(item)}
            </React.Fragment>
          ))}
        </List.Section>
        <Profile visible={openModal} setVisible={setOpenModal} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings