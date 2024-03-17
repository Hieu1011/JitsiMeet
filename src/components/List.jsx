import {FlatList, StyleSheet, Text, View} from 'react-native'
import React from 'react'

const List = (data) => {
  return (
    <View>
      <FlatList data={data}/>
    </View>
  )
}

export default List

const styles = StyleSheet.create({})
