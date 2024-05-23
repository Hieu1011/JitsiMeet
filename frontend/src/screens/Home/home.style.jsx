import {StyleSheet} from 'react-native'
import {COLORS} from '../../../constants/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 4
  },
  modal: {
    // height: "60%",
    flex: 0.4,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15
  },
})

export default styles
