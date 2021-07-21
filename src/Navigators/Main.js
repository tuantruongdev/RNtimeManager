import React from 'react'
import {View, TouchableOpacity,Text,StatusBar,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IndexExampleContainer } from '@/Containers'
import { Icon } from "react-native-elements";
import {checkSmartName,login,getTaskFromSVO} from '../api/getTaskFromSVO';
const Tab = createBottomTabNavigator()
function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
    style={{backgroundColor:"#09958a",borderRadius:5,marginBottom:25}}
    onPress={async()=>{
      getTaskFromSVO();
      return;

      let returnObject= checkSmartName("DTC1854801030076","123").then(
        returnObj=>{
         
          if(returnObj._id!=undefined){
            console.log(returnObj._id);
          login(returnObj._id,"Leminh771").then(
            returnLogin=>{
            if(returnLogin!="error"){
              console.log(returnLogin.stt);
              AsyncStorage.setItem("userInfo",JSON.stringify(returnLogin));
            console.log("login successfully")
         //done
            }else{
              console.log("passWord err");
            }

            }

          )
         
        }
          else{
            console.log("userName err");
          }
      
        }
        

      );
     
     
    
    
    }}
    >
      <Text style={{margin:10,color:"white",fontWeight:"700",fontSize:20}}>
     cac3

      </Text>

    </TouchableOpacity>



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
           name="Home"  component={Notifications} />
      <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (

            <Icon name="person" color={color}  size={30} />
          ),
         
        }}
      
      name="User" component={IndexExampleContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
