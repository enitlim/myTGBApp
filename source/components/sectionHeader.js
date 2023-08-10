import { View, Text } from 'react-native'
import React from 'react'

const SectionHeader = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View pl="15" pr="15">
        <Text
          style={{
            color: 'black',
            width: '100%',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          {props.name}
        </Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
  );
}

export default SectionHeader