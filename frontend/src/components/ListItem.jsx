import {StyleSheet} from 'react-native'
import React from 'react'
import {Card, Text, Badge} from 'react-native-paper'

const ListItem = ({data, navigation}) => {
  return (
    <Card style={styles.card} onPress={() => navigation.navigate('Room', data)}>
      <Card.Cover source={data.avt} style={styles.img} />
      <Card.Title
        title={data.title}
        titleNumberOfLines={2}
        titleStyle={styles.title}
      />
      <Badge visible={true} style={styles.badge} size={6} />
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.desc}>
          {data.desc}
        </Text>
      </Card.Content>
    </Card>
  )
}

export default ListItem

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'flex-start',
    alignItems: 'stretch',
    margin: 8,
    maxWidth: '48%'
  },
  img: {
    height: 135
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  badge: {
    position: 'absolute',
    left: 5,
    top: 154
  },
  desc: {
    fontSize: 12
  }
})
