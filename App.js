import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import Login from './modules/auth/adapters/screens/Login';
import Navigation from './config/navigation/Navigation';
import { initializeApp } from "firebase/app";

export default function App() {
  
  const firebaseConfig = {
    apiKey: "AIzaSyBhW8N52RyUL2GvReJJfJ-ZtW3_OQM49Vg",
    authDomain: "finanzas-f41fa.firebaseapp.com",
    projectId: "finanzas-f41fa",
    storageBucket: "finanzas-f41fa.appspot.com",
    messagingSenderId: "481788418291",
    appId: "1:481788418291:web:9075105e550789a455bf86"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  