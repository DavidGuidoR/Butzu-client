import React, { useRef, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from './useLocation';

export function Mapa() {
  const location = useLocation();
  const mapRef = useRef(null);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  }, [location]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {location && (
        <MapView
          ref={mapRef}
          style={{ width: Dimensions.get('window').width * 0.8, height: Dimensions.get('window').width * 0.8 }}
          onLayout={() => {}}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
          />
        </MapView>
      )}
      <Text>{location.coords.longitude} {location.coords.latitude}</Text>
    </View>
  );
}
