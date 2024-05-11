import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useAddress = () => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
      setAddress(reverseGeocode[0]);
    })();
  }, []);

  return address;
};
