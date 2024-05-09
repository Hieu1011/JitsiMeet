import React from 'react'
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';

const TextAreaComponent = ({
  value,
  setValue,
  label,
  maxLength
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        mode="outlined"
        multiline={true}
        value={value}
        maxLength={maxLength}
        numberOfLines={5}
        onChangeText={text => setValue(text)}
        style={{ paddingVertical: 10 }}
      />
    </View>
  )
}

export default TextAreaComponent

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000'
  },
})
