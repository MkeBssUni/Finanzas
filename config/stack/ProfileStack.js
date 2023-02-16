import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../../modules/profile/adapters/screens/Profile';
import UserGuest from '../../modules/about/adapters/screens/UserGuest';
import Login from '../../modules/auth/adapters/screens/Login';
import CreateUser from '../../modules/user/CreateUser';
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
        initialRouteName='createUserStack'
        screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#FF5A60'}
        }}
    >
        <Stack.Screen
            name = 'profileStack'
            options={{title: 'Perfil'}}
            component={Profile}
        />

        <Stack.Screen
            name = 'userGuestStack'
            options={{title: 'Bienvenido'}}
            component={UserGuest}
        />

        <Stack.Screen
            name = 'loginStack'
            options={{title: 'Inicio de Sesión'}}
            component={Login}
        />
        <Stack.Screen
            name = 'createUserStack'
            options={{title: 'Crea tu cuenta'}}
            component={CreateUser}
        />
    </Stack.Navigator>    
  )
}