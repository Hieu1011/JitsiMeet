import {FlatList, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import ListItem from './ListItem'

const List = ({data, navigation, onPressItem}) => {
  return (
    <FlatList
      data={data}
      style={styles.flatList}
      renderItem={({item}) => <ListItem data={item} navigation={navigation} onPressItem={onPressItem} />}
      keyExtractor={item => item._id}
      numColumns={2}
    />
  )
}

export default List

const styles = StyleSheet.create({
  flatList: {
    flex: 1
  }
})
