import React from 'react'
import {View, TouchableOpacity,Text,StatusBar,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IndexExampleContainer } from '@/Containers'
import { Icon } from "react-native-elements";
const Tab = createBottomTabNavigator()
function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}
// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#09958a',
    }}
    >
      <Tab.Screen options={{
        tabBarIcon: ({ color, size }) => (

            <Icon name="home" color={color}  size={30} />
          ),
         
        }}
           name="Home"  component={IndexExampleContainer} />
      <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (

            <Icon name="person" color={color}  size={30} />
          ),
         
        }}
      
      name="User" component={Notifications} />
    </Tab.Navigator>
  )
}

export default MainNavigator
