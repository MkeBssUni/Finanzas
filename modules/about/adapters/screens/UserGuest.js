import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image,Button } from '@rneui/base'

export default function UserGuest(props) {
    const {navigation} = props; //Para poer navegar a diferentes zonas del stack
  return (
    <View style={style.container} >
        <ScrollView style={style.mx} centerContent={true}>
            <Image 
                source={require("../../../../assets/presupuesto.png")}
                resizeMode='contain'
                style={style.img}
            />
            <Text style={style.title} >Bienvenido a MiCochi</Text>
            <Text style={style.description} >¿Te gustaría ahorrar dinero?
                Nosotros te ayudamos, crea o inicia sesión en nuestra app y descubre la mejor manera de ahorrar
            </Text>
            <View style={style.viewBtnContainer}>
                <Button
                    title='Iniciar Sesión'
                    icon={{
                        name:'log-in',
                        type:'feather',
                        size:15,
                        color:'white'
                    }}
                    buttonStyle={style.btn}
                    containerStyle={style.btnContainer}
                    onPress={()=> navigation.navigate('profileStack')}
                />
            </View>
        </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%'
        
    },
    mx:{
        marginLeft: 32,
        marginRight:32,
        marginTop: 150
    },
    img:{
        width: '100%',
        height: 200,
        
    },
    title:{
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      margin: 16
    },
    description:{
        textAlign: 'center',
        marginBottom:16
    },
    viewBtnContainer:{
        flex: 1,
        alignItems: 'center'
    },
    btn:{
        backgroundColor: 'tomato',
        color: '#fff'
    },

    btnContainer:{
        width: '70%'
    },
})