import {Text, StyleSheet} from 'react-native'
import React from 'react'
import {COLORS} from '../../constants'

const Title = props => {
  const size = props.size || 16
  const color = props.color || COLORS.black
  const font = props.font
  const type = props.type
  const weight = props.weight

  return (
    <Text
      style={{
        ...styles.text,
        ...{
          color: color,
          fontSize: size,
          fontFamily: font,
          fontStyle: type,
          fontWeight: weight
        },
        ...props.style
      }}>
      {props.title}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Title
