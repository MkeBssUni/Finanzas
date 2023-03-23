import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as MediaLibrary from 'expo-media-library'
import MapView, { Marker } from "react-native-maps";
import { Button, Divider } from "@rneui/base";

const widthScreen = Dimensions.get("window").width; //Obtener el ancho del dispositivo que está abriendo el app

export default function ChangeAddress(props) {
  const { setShowModal } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "denied") {
        try {
          const loc = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          });
        } catch (error) {
          Alert.alert("Error al obtener la ubicación");
        }
      } else {
        Alert.alert("Es necesario aceptar los permisos de localización");
      }
    })();
  }, []);

  const save = ()=>{
    console.log("holaaa", location)
  }
  return (
    <View>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          minZoomLevel={15}
          onRegionChange={(region) => setLocation(region)}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            tile="Mi ubicación" //Muestra
            /* Description */
            draggable //Que el usario pueda mover la marca
          />
        </MapView>
      )}
      <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
        <Divider color="tomato" width={2} style={styles.divider}/>
      </View>
      <View style={styles.containerButtons}>
        <Button
          title="Cerrar mapa"
          containerStyle={styles.btnDangerContainer}
          buttonStyle={styles.btnDanger}
          onPress={() => setShowModal(false)}//ojito
        />
        <Button
          title="Guardar ubicación"
          containerStyle={styles.btnSuccessContainer}
          buttonStyle={styles.btnSuccess}
          onPress={save}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map:{
    width: '100%',
    height: 550,
  },
  divider:{
    width: '100%',
  },
  containerButtons:{
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 10,
  },
  btnSuccessContainer:{
    width: '50%',
    padding: 10,
  },
  btnDangerContainer:{
    pading: 10,
  },
  btnDanger:{
    backgroundColor: '#a60a0d'
  },
  btnSuccess:{
    backgroundColor: '#00a680'
  }

  
});
