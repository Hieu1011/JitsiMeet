import React from 'react'
import {StyleSheet, TextInput, View} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import {COLORS} from '../../constants'

const SearchBar = ({searchQuery, setSearchQuery, onChangeText}) => {
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={16} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={(query) => {
          setSearchQuery(query)
            onChangeText && onChangeText(query)
        }}
        textAlignVertical="center"
      />
      {searchQuery !== '' && (
        <Entypo
          name="cross"
          size={20}
          color="black"
          onPress={() => {
            setSearchQuery('')
            onChangeText && onChangeText('')
          }}
        />
      )}
    </View>
  )
}

export default SearchBar

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '90%',
    minHeight: 35,
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
    paddingVertical: 0 
  }
})
