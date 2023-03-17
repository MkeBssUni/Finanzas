import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Icon } from '@rneui/base'
import { Divider } from '@rneui/themed';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { isEmpty, size } from 'lodash'
import Loading from '../../../../../kernel/components/Loading'
import Success from '../../../../../kernel/components/Success'
import Error from '../../../../../kernel/components/Error'

export default function ChangePassword() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [error, setError] = useState({ oldPassword: '', password: '', confirmPassword: '' })
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(true)
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)
  const [show, setShow] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const changePassword = () => {
    if (!isEmpty(oldPassword) && !isEmpty(password) && !isEmpty(confirmPassword)) {
      if (password === confirmPassword) {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        reauthenticateWithCredential(user, credential)
          .then(() => {
            if (size(password) >= 6) {
              setShow(true);
              updatePassword(user, password)
                .then(() => {
                  setError({ oldPassword: '', password: '', confirmPassword: '' })
                  setShow(false);
                  setShowSuccessAlert(true);
                  setTimeout(() => {
                    setShowSuccessAlert(false);
                    auth.signOut()
                  }, 3000);
                })
                .catch((error) => {
                  setShow(false);
                  setShowErrorAlert(true);
                  console.log(error);
                });
            } else {
              setShow(false);
              setError({ password: 'La contraseña debe tener al menos 6 caracteres',
              confirmPassword: 'La contraseña debe tener al menos 6 caracteres' });
            }
          })
          .catch((error) => {
            setShow(false);
            setError({ oldPassword: 'Contraseña incorrecta' });
            console.log(error);
          });
      } else {
        setShow(false);
        setError({ 
          password: 'Las contraseñas no coinciden',
          confirmPassword: 'Las contraseñas no coinciden' });
      }
    } else {
      setShow(false);
      setError({ oldPassword: 'Campo obligatorio', password: 'Campo obligatorio', confirmPassword: 'Campo obligatorio' });
    }
  };

  return (
    <View>
      <Input
        label="Contraseña actual"
        containerStyle={styles.input}
        onChange={(event) => setOldPassword(event.nativeEvent.text)}
        autoCapitalized="none"
        errorMessage={error.oldPassword}
        secureTextEntry={showOldPassword}
        rightIcon={
          <Icon
            type='material-community'
            name={
              showOldPassword ? 'eye-outline' : 'eye-off-outline'
            }
            onPress={() => setShowOldPassword(!showOldPassword)}
          />
        }
      />
      <Input
        label="Nueva contraseña"
        containerStyle={styles.input}
        onChange={(event) => setPassword(event.nativeEvent.text)}
        autoCapitalized="none"
        errorMessage={error.password}
        secureTextEntry={showPassword}
        rightIcon={
          <Icon
            type='material-community'
            name={
              showPassword ? 'eye-outline' : 'eye-off-outline'
            }
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        label="Confirmar contraseña"
        containerStyle={styles.input}
        onChange={(event) => setConfirmPassword(event.nativeEvent.text)}
        autoCapitalized="none"
        errorMessage={error.confirmPassword}
        secureTextEntry={showConfirmPassword}
        rightIcon={
          <Icon
            type='material-community'
            name={
              showConfirmPassword ? 'eye-outline' : 'eye-off-outline'
            }
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
      />
      <Button
          title="Guardar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={changePassword}
          icon={{
            type: 'material-community',
            name: 'content-save',
            color: '#fff'
          }}
        />
      <Loading show={show} text={"Cambiando contraseña"}/>
        <Success show={showSuccessAlert} text={'Contraseña actualizada'} />
        <Error show={showErrorAlert} text={'Ha ocurrido un error'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
  },
  btn: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
  },
})