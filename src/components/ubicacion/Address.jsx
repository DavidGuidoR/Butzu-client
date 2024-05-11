import React from 'react';
import { View, Text } from 'react-native';
import { useAddress } from './useAddress';

export function Address() {
  const address = useAddress();

  return (
    <View>
      {address && (
        <Text>{`${address.district},  ${address.city}, ${address.region}`}</Text>
      )}
    </View>
  );
}
