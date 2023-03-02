import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Button,Avatar } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../../kernel/components/Loading';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getAuth, updateProfile } from "firebase/auth";
import * as Imagepicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function UserLogged(props) {
  const {setReload, user} = props;
  const [show, setShow] = useState(false)
  const removeValue = async () => {
    try {
      console.log("Elimando sesión")
      setShow(true)
      await AsyncStorage.removeItem('@session')
      setShow(false)
      setReload(true)
    } catch(e) {
    }
    console.log('Done.')
  }

  const uploadImage = async (uri) =>{
    setShow(true)
    const response = await fetch(uri);
    console.log("response",response)
    const {_bodyBlob} = response;
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/${user.uid}`);
    return uploadBytes(storageRef, _bodyBlob)
  }

  const changeAvatar = async () =>{
    const resultPermission= await Permissions.askAsync(Permissions.CAMERA)
    if(resultPermission.permissions.camera.status !== 'denied'){
      let result = await Imagepicker.launchCameraAsync({
        mediaTypes: Imagepicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1, //cuantas imagenes se van a guardar
        //base64: true, para convertir a base64 y guardar en la BD, si no lo pongo me devuelve un uri
      })
      if(!result.canceled){
        uploadImage(result.assets[0].uri).then((response)=>{
          console.log("Imagen actualizada")
          setShow(false)
        }).catch((err)=>{
          console.log("Error al actualizar la imagen",err)
        })
      }else{
        console.log("Cancelado")
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Avatar
          size={'xlarge'}
          rounded
          source={{ uri: "https://firebasestorage.googleapis.com/v0/b/finanzas-f41fa.appspot.com/o/avatar%2Fr5S1k4JtpjXHH863lUL9v1UFmhn2.jpg?alt=media&token=e83f3306-0c84-4b75-8bd3-8e4eda76d6e6" }}
          containerStyle={styles.avatar}
        >
          <Avatar.Accessory size={40} 
            onPress={changeAvatar}
          />
        </Avatar>
        <View>
          <Text style={styles.displayName}>{user ? user.providerData[0].displayName :'Castor Asesino' }</Text>
          <Text>{user ? user.providerData[0].email: 'sin email'}</Text>
        </View>
      </View>
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnLogout}
        onPress={removeValue}
      />
      <Loading show={show} text="Cerrando Sesión"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    minHeight: "100%",
    backgroundColor: "white"
  },
  btnLogout:{
    width: "75%",
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 50,
    backgroundColor:"tomato"
  },
  infoContainer:{
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30,
  },
  avatar:{
    marginRight: 16,
  },
  displayName:{
    fontWeight: "bold",
    paddingBottom: 5,
  },
})