import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import React, {useState} from 'react'
import Title from '../../components/Title'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {COLORS, FONTS} from '../../../constants'
import styles from './settings.style'
import Profile from '../Profile/Profile'

const Settings = () => {
  const [openModal, setOpenModal] = useState(false)

  const navigateToProfile = () => {
    setOpenModal(true)
  }
  const navigateToSecurity = () => {
    console.log('Security function')
  }
  const navigateToNotifications = () => {
    console.log('Notifications function')
  }
  const navigateToPrivacy = () => {
    console.log('Privacy function')
  }
  const navigateToSubscription = () => {
    console.log('Subscription function')
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
  const addAccount = () => {
    console.log('Add account ')
  }
  const logout = () => {
    console.log('Logout')
  }

  const accountItems = [
    {
      icon: 'person-outline',
      text: 'Profile',
      action: navigateToProfile
    },
    {icon: 'security', text: 'Security', action: navigateToSecurity},
    {
      icon: 'notifications-none',
      text: 'Notifications',
      action: navigateToNotifications
    },
    {icon: 'lock-outline', text: 'Privacy', action: navigateToPrivacy}
  ]
  const supportItems = [
    {
      icon: 'credit-card',
      text: 'My Subscription',
      action: navigateToSubscription
    },
    {icon: 'help-outline', text: 'Help & Support', action: navigateToSupport},
    {
      icon: 'info-outline',
      text: 'Terms and Policies',
      action: navigateToTermsAndPolicies
    }
  ]
  const actionsItems = [
    {
      icon: 'outlined-flag',
      text: 'Report a problem',
      action: navigateToReportProblem
    },
    {icon: 'people-outline', text: 'Add Account', action: addAccount},
    {icon: 'logout', text: 'Log out', action: logout}
  ]

  const renderSettingsItem = ({icon, text, action}) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 12,
        borderRadius: 12,
        marginVertical: 3,
        backgroundColor: COLORS.grey
      }}>
      <MaterialIcons name={icon} size={24} color="black" />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.body1,
          fontWeight: 600,
          fontSize: 16
        }}>
        {text}{' '}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Title
        title="Settings"
        size={32}
        weight="500"
        color={COLORS.black}
        style={{alignSelf: 'center'}}
      />

      <ScrollView style={{marginHorizontal: 12}}>
        {/* Account Settings */}
        <View style={{marginBottom: 12}}>
          <Title title="Account" size={18} color={COLORS.black} />
          <View
            style={{
              borderRadius: 12
            }}>
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}
        <View style={{marginBottom: 12}}>
          <Title title="Support & About" size={18} color={COLORS.black} />
          <View
            style={{
              borderRadius: 12
            }}>
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Actions Settings */}
        <View style={{marginBottom: 12}}>
          <Title title="Actions" size={18} color={COLORS.black} />
          <View
            style={{
              borderRadius: 12
            }}>
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        <Profile visible={openModal} setVisible={setOpenModal} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
