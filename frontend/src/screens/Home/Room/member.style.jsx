import {StyleSheet} from 'react-native'
import {COLORS} from '../../../../constants/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center'
  },
  content: {
    paddingHorizontal: 15
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.6,
    // backgroundColor: 'red'
  },
  itemAvt: {
    height: 65,
    width: 65,
    borderRadius: 50,
  },
  itemText:{
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.black
  }
})

export default styles
