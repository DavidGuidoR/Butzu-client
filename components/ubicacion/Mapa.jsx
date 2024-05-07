import React, { useRef, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
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
          style={[styles.map, style]} 
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

const styles = StyleSheet.create({
  map: {
    borderRadius: 15, // Aplica el borderRadius al mapa directamente
    overflow: 'hidden', // Asegura que la sombra se recorte correctamente
    
  },
});
