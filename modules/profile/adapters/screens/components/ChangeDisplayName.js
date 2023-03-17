import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Image, Icon} from "@rneui/base";
import React from 'react'
import { getAuth } from "firebase/auth";
export default function ChangeDisplayName() {
const auth = getAuth();
const user = auth.currentUser;

console.log("displayName", user.displayName)
  return (
    <View>
      <Input
          label="Nombre completo"
          containerStyle={styles.input}
          //onChange={(event) => setEmail(event.nativeEvent.text)} 
          //errorMessage={error.name}
          value={user.displayName}
        />

        <Button
          title="Guardar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          //onPress={}
          icon={{
            type: 'material-community',
            name: 'content-save',
            color: '#fff'
          }}
        />

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginVertical: 15,
  },
  btn: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
  },
})