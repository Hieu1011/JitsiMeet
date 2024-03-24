import {
  View,
  Pressable,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native'
import React, {useState} from 'react'
import Button from './Button'
import {COLORS} from '../../constants'

const NewEvent = ({visible, setVisible, timeString, timeObject, onCreate}) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const handleCreateNewEvent = () => {
    if (onCreate) {
      onCreate(title, desc, timeString, timeObject)
      setTitle('')
      setDesc('')
    }
    setVisible(false)
  }

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <Pressable onPress={() => setVisible(false)} style={styles.pressable} />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={{flexDirection: 'column', marginBottom: 5}}>
            <TextInput
              placeholder="Title Event"
              placeholderTextColor={COLORS.grey}
              style={styles.title}
              onChangeText={(text)=>setTitle(text)}
              value={title}
            />
            <TextInput
              placeholder="Description Event"
              placeholderTextColor={COLORS.grey}
              multiline
              onChangeText={(text)=>setDesc(text)}
              value={desc}
              style={styles.desc}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button
              title="Cancel"
              size={14}
              onPress={() => setVisible(false)}
              style={styles.btn}
            />
            <Button
              title="Create"
              filled
              size={14}
              onPress={() => handleCreateNewEvent()}
              style={styles.btn}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default NewEvent
const styles = StyleSheet.create({
  container: {
    minHeight: '25%',
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
    zIndex: 1
  },
  content: {
    padding: 10,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black
  },
  desc: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.primary,
    marginTop: -10
  },
  btn: {
    paddingVertical: 5,
    height: 40,
    width: 70
  }
})
