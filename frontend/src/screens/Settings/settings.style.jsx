import {StyleSheet} from 'react-native'
import {COLORS} from '../../../constants/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '96%',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    textAlign: 'center',
    borderBottomWidth: 0.4,
  },
  userInfo: {
    paddingHorizontal: 10,
  },
  settingCenter: {
    paddingLeft: 20
  },
  editContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between'
  },
  userName: {
    fontSize: 18,
    fontWeight: '800'
  },
  img: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    borderRadius: 80
  },
})

export default styles
