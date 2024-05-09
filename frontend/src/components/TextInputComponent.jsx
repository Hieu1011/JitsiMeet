import React from 'react'
import { TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const TextInputComponent = ({
    value,
    setValue,
    label,
    placeholder,
    iconName
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode='outlined'
        label={label}
        value={value}
        onChangeText={text => setValue(text)}
        placeholder={placeholder}
        numberOfLines={1}
        left={
        <TextInput.Icon
          icon={iconName}
          size={20}
        />
      }
      />
    </View>
  )
}

export default TextInputComponent

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
})
