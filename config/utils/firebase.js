import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
    apiKey: "AIzaSyBhW8N52RyUL2GvReJJfJ-ZtW3_OQM49Vg",
    authDomain: "finanzas-f41fa.firebaseapp.com",
    projectId: "finanzas-f41fa",
    storageBucket: "finanzas-f41fa.appspot.com",
    messagingSenderId: "481788418291",
    appId: "1:481788418291:web:9075105e550789a455bf86"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = initializeAuth(app,{persistence: getReactNativePersistence(AsyncStorage)})