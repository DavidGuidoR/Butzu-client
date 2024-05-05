import React, { useRef, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from './useLocation';

export function Mapa({ style }) {
  const location = useLocation();
  const mapRef = useRef(null);

  useEffect(() => {
    if (location?.coords && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  }, [location]);

  return (
    <View style={style}>
      {location?.coords && (

          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            onLayout={() => {
              if (location?.coords) {
                mapRef.current.animateToRegion({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }, 1000);
              }
            }}
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
    </View>
  );
}
