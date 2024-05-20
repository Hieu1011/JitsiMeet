import {StyleSheet} from 'react-native'
import {COLORS} from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    height: '60%',
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
  header:{
    marginTop: 5,
  },
  headerText: {
    alignSelf: 'center',
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  content:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  avatar:{
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 0.5,
  },
  image:{
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  title:{
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black
  },
  value:{
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  info:{
    alignItems: 'flex-start',
    gap: 10,
    width: '80%',
  },
  infoItem:{
    flexDirection: 'row',
    gap: 5,
    alignItems: "center",
  }
})

export default styles
