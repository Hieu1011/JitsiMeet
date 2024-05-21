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

  deleteRoomBackdrop: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },

  deleteRoomModal: { backgroundColor: 'white', padding: 20, borderRadius: 10 },

  label: { fontSize: 18, marginBottom: 10, color: '#000' },

  question: { marginBottom: 20 },

  btnWrapper: { flexDirection: 'row', justifyContent: 'space-between' },

  confirmBtn: { backgroundColor: 'red', padding: 10, borderRadius: 5 },

  cancelBtn: { backgroundColor: 'grey', padding: 10, borderRadius: 5 },

  btnText: { color: 'white' }
})

export default styles
