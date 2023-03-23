import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { ListItem, Icon } from '@rneui/base'
import {initial, map} from 'lodash'
import Modal from '../../../../kernel/components/Modal'

import ChangeAddress from './components/ChangeAddress'
import ChangeDisplayName from './components/ChangeDisplayName'
import ChangePassword from './components/ChangePassword'

export default function AccountOptions(props) {
  const {userInfo} = props;
  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)
  const [nameUser, setnameUser] = useState(userInfo.displayName)
  
  const selectComponent =(key)=>{
    switch(key){
      case 'displayName': 
        setRenderComponent(<ChangeDisplayName name={nameUser} />)
        setShowModal(true)

        break;
      case 'password': 
        setRenderComponent(<ChangePassword />)
        setShowModal(true)
        break;
      case 'address': 
        setRenderComponent(<ChangeAddress setShowModal={setShowModal} />)
        setShowModal(true)
        break;
        default:
            setRenderComponent(null)
            setShowModal(false)
          break;
    }
  }

  const menuOption= generateOptions(selectComponent)
  
  return (
    <View>
      {map(menuOption, (menu, index)=>(
        <ListItem containerStyle={styles.menuItem} key={index} onPress={menu.onPress}>
        <Icon
          name={menu.iconLeft}
          type={menu.iconType}
          color={menu.iconLeftColor}
        />
        <ListItem.Content>
          <ListItem.Title>{menu.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron/>
      </ListItem>
      )) }
      {renderComponent && (
        <Modal show={showModal} setShow={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  menuItem:{
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E3"
  },
})

const generateOptions = (selectComponent)=>{
  return [
    {
    title: 'Actualizar nombre completo',
    iconType: 'material-community',
    iconLeft: 'account-circle',
    iconLeftColor: 'tomato',
    onPress: (()=> selectComponent("displayName"))
    },
    {
      title: 'Actualizar contraseña',
      iconType: 'material-community',
      iconLeft: 'lock-reset',
      iconLeftColor: 'tomato',
      onPress: (()=> selectComponent("password"))
      },
      {
        title: 'Actualizar ubicación',
        iconType: 'material-community',
        iconLeft: 'map-marker',
        iconLeftColor: 'tomato',
        onPress: (()=> selectComponent("address"))
        }
  ]
}