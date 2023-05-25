import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

export const MapScreen = () => {
  const {
    params: { currentLocation },
  } = useRoute();

  return (
    <MapView
      style={styles.mapStyle}
      region={{
        ...currentLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
    >
      {/* {currentLocation && (
        <Marker
          title="I am here"
          coordinate={currentLocation}
          description="Hello"
        />
      )} */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
