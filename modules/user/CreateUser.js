import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isEmpty, size } from "lodash";
import { Image, Input, Button, Icon } from "@rneui/base";
import Loading from "../../kernel/components/Loading";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from "../../kernel/validations";

export default function CreateUser(props) {
  const { navigation } = props;
  const payload = {
    email: "",
    password: "",
    repeatPassword: "",
  };
  const [show, setShow] = useState(false);
  const [error, setError] = useState(payload);
  const [data, setData] = useState(payload);
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);

  const changePayload = (e, type) => {
    setData({
      ...data,
      [type]: e.nativeEvent.text,
    });
  };

  const auth = getAuth();

  const createUser = () => {
    if (!(isEmpty(data.email) || isEmpty(data.password))) {
      if (validateEmail(data.email)) {
        if (size(data.password) >= 6) {
          if (data.password == data.repeatPassword) {
            setError(payload);
            console.log("listo pal registro");
            setShow(true);
            createUserWithEmailAndPassword(auth, data.email, data.password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Usuario creado")
                setShow(false);
                navigation.navigate('profileStack');
              })  
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                // ..
              });
          } else {
            setError({
              email: "",
              password: "Las contraseñas no coinciden",
              repeatPassword: "Las contraseñas no coinciden",
            });
          }
        } else {
          setError({
            email: "",
            password: "La contraseña debe tener al menos 6 caracteres",
            repeatPassword: "La contraseña debe tener al menos 6 caracteres",
          });
        }
      } else {
        setError({
          email: "Debe ser correo electronico",
          password: "",
          repeatPassword: "",
        });
      }
    } else {
      setError({
        email: "El correo es obligatorio",
        password: "La contraseña es obligatoria",
        repeatPassword: "La contraseña es obligatoria",
      });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../assets/presupuesto.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <View style={styles.container}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            rightIcon={
              <Icon type="material-community" name="email-outline" size={22} />
            }
            containerStyle={styles.input}
            onChange={(e) => changePayload(e, "email")}
            errorMessage={error.email}
            autoCapitalize="none"
          />
          <Input
            placeholder="Contraseña"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            secureTextEntry={showPassword}
            onChange={(e) => changePayload(e, "password")}
            errorMessage={error.password}
          />

          <Input
            placeholder="Repetir Contraseña"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name={showRepeatPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                onPress={() => setShowRepeatPassword(!showRepeatPassword)}
              />
            }
            secureTextEntry={showRepeatPassword}
            onChange={(e) => changePayload(e, "repeatPassword")}
            errorMessage={error.repeatPassword}
          />

          <Button
            title="Crear cuenta"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={createUser}
          />
        </View>
      </View>
      <Loading show={show} text="Creando cuenta" />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 30,
  },
  viewForm: {
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginVertical: 10,
  },
  btnContainer: {
    //marginVertical: 20,
    marginBottom: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680", //#28a745
  },
});
