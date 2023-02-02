import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import About from '../../modules/about/adapters/screens/About';
const Stack = createNativeStackNavigator();

export default function AboutStack() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#FF5A60'}
        }}
    >
        <Stack.Screen
            name = 'aboutStack'
            options={{title: 'Conócenos'}}
            component={About}
        />
    </Stack.Navigator>    
  )
}