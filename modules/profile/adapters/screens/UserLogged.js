import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Avatar } from "@rneui/base";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../../../kernel/components/Loading";
import Success from "../../../../kernel/components/Success";
import Error from "../../../../kernel/components/Error";
import Confirmation from "../../../../kernel/components/Confirmation";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getAuth, updateProfile } from "firebase/auth";
import * as Imagepicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import AccountOptions from './AccountOptions'
export default function UserLogged(props) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)  
  const auth = getAuth();

  /* const removeValue = async () => {
    try {
      console.log("Elimando sesión");
      setShow(true);
      await AsyncStorage.removeItem("@session");
      setShow(false);
      setReload(true);
    } catch (e) {}
    console.log("Done.");
  }; */

  const uploadImage = async (uri) => {
    setShow(true);
    const response = await fetch(uri);
    const { _bodyBlob } = response;
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/${user.uid}`);
    return uploadBytes(storageRef, _bodyBlob);
  };

  const uploadPhotoProfile = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `avatars/${user.uid}`))
      .then(async (url) => {
        updateProfile(auth.currentUser,{
          photoURL: url
        })
        setShow(false)
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, 2000);
      })
      .catch((err) => {
        setShow(false)
        console.log("Error al obtener la imagen", err);
      });
  };

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA);
    if (resultPermission.permissions.camera.status !== "denied") {
      let result = await Imagepicker.launchCameraAsync({
        mediaTypes: Imagepicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1, //cuantas imagenes se van a guardar
        //base64: true, para convertir a base64 y guardar en la BD, si no lo pongo me devuelve un uri
      });
      if (!result.canceled) {
        uploadImage(result.assets[0].uri)
          .then((response) => {
            uploadPhotoProfile();
          })
          .catch((err) => {
            console.log("Error al actualizar la imagen", err);
            setShow(false);
            setShowError(true)
            setTimeout(() => {
              setShowError(false)
            }, 2000);
          });
      } else {}
    }
  };
  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.infoContainer}>
        <Avatar
          size={"xlarge"}
          rounded
          source={{
            uri: user.photoURL
          }}
          containerStyle={styles.avatar}
        >
          <Avatar.Accessory size={40} onPress={changeAvatar} />
        </Avatar>
        <View>
          <Text style={styles.displayName}>
            {" "}
            {user ? user.displayName : "Castor Asesino"}{" "}
          </Text>
          <Text>{user ? user.email : "sin email"}</Text>
        </View>
      </View>
      )}

      <AccountOptions />
      
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnLogout}
        onPress={() => setShowConfirmation(true)}
      />
      <Loading show={show} text="Actualizando" />
      <Success show={showSuccess} text="Confirmado" />
      <Error show={showError} text="Error" />
      <Confirmation show={showConfirmation} 
        onConfirm={()=> auth.signOut()} 
        onCancel={()=> setShowConfirmation(false)}
      text="¿Estás seguro de cerrar sesión?" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "white",
  },
  btnLogout: {
    width: "75%",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 50,
    backgroundColor: "tomato",
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30,
  },
  avatar: {
    marginRight: 16,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
