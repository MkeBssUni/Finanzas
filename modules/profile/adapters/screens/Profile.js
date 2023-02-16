import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../../../../kernel/components/Loading";
import UserGuest from "../../../about/adapters/screens/UserGuest";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
import UserLogged from "./UserLogged";
import { useNavigation } from "@react-navigation/native";


//useEffect va despues de la renderizacion
export default function Profile() {
  const auth = getAuth();
  const navigation=useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async ()=>{
      try {
        const value = await AsyncStorage.getItem('@session')
        console.log("session: "+value)
        if(value !== null) {
          setUser(true);
        }else{
          setUser(false);
        }
      } catch(e) {
        console.log("error al obtener la sesion", e);

      }
    })()
  }, []);

  if(user===null) return <Loading />;
  return user ? <UserLogged /> : <UserGuest navigation={navigation}/>; //Si el usuario esta logueado, muestra el componente UserLogged, sino, muestra el componente UserGuest
  
}

const styles = StyleSheet.create({});
