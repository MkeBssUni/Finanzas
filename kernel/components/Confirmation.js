import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { Overlay, Image, Button } from '@rneui/base'

export default function Confirmation(props) {
    const {show, text} = props;
  return (
    <Overlay
    isVisible={show}
    windowsBackgroundColor= 'rgb(0,0,0,0.5)'
    overlayBackgroundColor='transparent'
    overlayStyle={styles.overlay}
    >
        <View style={styles.container} >
            <Image
            source={{uri:'https://media.giphy.com/media/xT0xeuOy2Fcl9vDGiA/giphy.gif'}}
            style={styles.gif}
            />
            {text && <Text style={styles.text} >{text}</Text>}

            <View style={styles.row}>
                <Button
                    title='Aceptar'
                    onPress={props.onConfirm}
                    style={styles.btnConfirm}
                    icon={{
                        type:'material-community',
                        name:'check',
                        color:'#fff',
                    }}
                    iconPosition='right'
                />
                <Button
                    title='Cancelar'
                    onPress={props.onCancel}
                    style={styles.btnCancel}
                    icon={{
                        type:'material-community',
                        name:'close',
                        color:'#fff',
                    }}
                    iconPosition='right'
                />
            </View>
        </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay:{
        height:250,
        width:300,
        backgroundColor:'#fff',
        borderColor:'#fff',
        borderWidth:2,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color: '#000',
        textTransform: 'uppercase',
        marginTop: 15,
        textAlign: 'center',
    },
    gif:{
        width:100,
        height:100,
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'100%',
        marginTop:20,
    },
    btnConfirm:{
        width:10,
    },
    btnCancel:{
        width:10,
    }
})