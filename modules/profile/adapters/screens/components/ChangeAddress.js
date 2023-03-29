import { StyleSheet, Text, View, Dimensions, Alert, Platform } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import * as MediaLibrary from 'expo-media-library'
import MapView, { Marker } from "react-native-maps";
import { Button, Divider } from "@rneui/base";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

/* Configuración global*/
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications to send push notifications.
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Su ubicación ha sido actualizada',
    body: 'Dmn, pq te movisteeeeee',
    //data: { someData: location },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
//pedir permisos para notificaciones y obtener el token
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


export default function ChangeAddress(props) {
  const { setShowModal } = props;
  const [location, setLocation] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const save = async ()=>{
    await sendPushNotification(expoPushToken);
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
            tile="Mi ubicación"
            draggable
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
          onPress={() => setShowModal(false)}
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
