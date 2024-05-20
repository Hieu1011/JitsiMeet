import {StyleSheet} from 'react-native'
import {COLORS} from '../../../../constants/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
  },
  textTitle:{
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
  },
  content:{
    paddingHorizontal: 15,
  },
  modal:{
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    zIndex: 999
  },
  modalHeader:{
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent:{
    marginBottom: 10,
  },
  modalItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 40,
    gap: 25
  },
  pressable: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
})

export default styles
