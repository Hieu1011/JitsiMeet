import {StyleSheet} from 'react-native'
import {COLORS} from '../../../constants'

const styles = StyleSheet.create({
  container: {
    height: '85%',
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    zIndex: 999
  },
  pressable: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  header: {
    alignSelf: 'center',
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  content:{
    alignContent: 'center',
    alignItems: 'center'
  },
  avatar:{
    height: 100,
    width: 100,
    borderRadius: 50,
  }
})

export default styles
