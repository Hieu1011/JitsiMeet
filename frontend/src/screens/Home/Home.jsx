import {
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View
} from 'react-native'
import React, {useState} from 'react'
import Title from '../../components/Title'
import {COLORS} from '../../../constants'
import styles from './home.style'
import SearchBar from '../../components/SearchBar'
import List from '../../components/List'
import Video from '../Video/Video'

const Home = ({navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [data, setData] = useState()

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title
          title="Welcome to Video Call App"
          size={24}
          weight="500"
          color={COLORS.secondary}
          style={{marginLeft: 10}}
        />
      </View>

      <KeyboardAvoidingView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1}}>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
            />
            <List data={data} />

            <Video navigation={navigation}/>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Home
