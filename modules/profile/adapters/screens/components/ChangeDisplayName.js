import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Input, Image, Icon } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { isEmpty } from 'lodash'
import Success from '../../../../../kernel/components/Success'
import Error from '../../../../../kernel/components/Error'

export default function ChangeDisplayName(props) {
  const {nameUser} = props;
  const auth = getAuth();
  const [error, setError] = useState({ fullname: "" });
  const [fullname, setFullname] = useState("");
  const [show, setShow] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [reload, setReload] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("Entro al onAuthStateChanged y el usuario es: ", user.displayName)
      if (user) {
        setFullname(user.displayName);
        nameUser(user.displayName);
      }
      setReload(false);
    });
  }, [reload]);

  const changeDisplayName = () => {
    if(!isEmpty(fullname)) {
      setShow(true);
      updateProfile(auth.currentUser, {
        displayName: fullname,
      })
      .then(() => {
        setShow(false);
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
        setReload(true);
      })
      .catch((error) => {
        setShow(false);
        setShowErrorAlert(true);
        console.log(error);
      });
    } else {
      setShow(false);
      setError({fullname: 'Campo obligatorio'});
    }
  };

  return (
    <View>
      <Input
        placeholder="Nombre completo"
        keyboardType="text"
        containerStyle={styles.input}
        onChange={(event) => setFullname(event.nativeEvent.text)}
        autoCapitalized="none"
        errorMessage={error.fullname}
        value={fullname}
      />
      <Button
          title="Guardar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={changeDisplayName}
          icon={{
            type: 'material-community',
            name: 'content-save',
            color: '#fff'
          }}
        />
        <Success show={showSuccessAlert} text={'Nombre actualizado'} />
        <Error show={showErrorAlert} text={'Ha ocurrido un error'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 16,
  },
  
  btn: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
  },
});