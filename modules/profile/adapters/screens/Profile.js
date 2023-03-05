import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Loading from "../../../../kernel/components/Loading";
import UserGuest from "../../../about/adapters/screens/UserGuest";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserLogged from "./UserLogged";
import { useNavigation } from "@react-navigation/native";


//useEffect va despues de la renderizacion
export default function Profile() {
  const navigation=useNavigation();
  const [user, setUser] = useState(null);
  const [session, setSession]= useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (credential)=>{
      setUser(credential);
      !credential ? setSession(false) : setSession(true);
    });
  }, [])

  //Usar en SIRA
  /* if(user===null) return <Loading />;
  return user ? <UserLogged user={session} /> : <UserGuest navigation={navigation}/>; */ //Si el usuario esta logueado, muestra el componente UserLogged, sino, muestra el componente UserGuest
  if(session === null) return <Loading show={true} text="Cargando"/>
  return session ? (
    <UserLogged user={user} />
  ): (
    <UserGuest navigation={navigation} />
  )
}
