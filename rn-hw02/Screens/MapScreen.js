import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

function MapScreen() {
  const { params } = useRoute();

  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        ...params.location,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
    >
      {params && <Marker title={params.name} coordinate={params.location} />}
    </MapView>
  );
}
export default MapScreen;
