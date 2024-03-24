import {StyleSheet, Modal, Pressable, View} from 'react-native'
import React from 'react'

const DetailEvent = () => {
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
              onChangeText={text => setTitle(text)}
              value={title}
            />
            <TextInput
              placeholder="Description Event"
              placeholderTextColor={COLORS.grey}
              multiline
              onChangeText={text => setDesc(text)}
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

export default DetailEvent

const styles = StyleSheet.create({})
