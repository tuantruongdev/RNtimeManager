import React, {useState} from 'react';
import {View, TouchableOpacity,Text,StatusBar,Image} from 'react-native';
import {Agenda,LocaleConfig} from 'react-native-calendars';
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from 'react-redux'
import {setValueAgenda,removeAgendaValue} from '../../Store/Agenda/agendaSlice'


LocaleConfig.locales['vi'] = {
  monthNames: ['Tháng một','Tháng hai','Tháng ba','Tháng tư','Tháng năm','Tháng sáu','Tháng bảy','Tháng tám','Tháng chín','Tháng mười','Tháng mười một','Tháng mười hai'],
  monthNamesShort: ['Th1','Th2.','Th3','Th4','Th5','Th6','Th7','Th8','Th9','Th10','Th11','Th12'],
  dayNames: ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'],
  dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
  today: 'Hôm nay'
};

LocaleConfig.defaultLocale = 'vi';
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};


const IndexExampleContainer = () => {
  const agendaStore  = useSelector(state =>state.reducer);
  const dispatch=useDispatch();
  function readTextFile() {
    let json = require("./result.json");
      console.log(json, 'the json obj');
}

//usage:



  const loadItems = (day) => {
    
    setTimeout(() => {
      var tempAgendaData=JSON.parse(JSON.stringify(agendaStore));
      let json = require("./result.json");
      for (let i = -15; i < 150; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        
       // console.log(strTime+"\n");

        
        if (!agendaStore[strTime]) {
          if(json.tasks[strTime]!=null){
           // console.log(strTime+"\n");
          var tempDayTask=json.tasks[strTime];
        //  console.log(Object.keys(tempDayTask).length);
      
            tempAgendaData[strTime] = [];
          //random activities
        //  const numItems = Math.floor(Math.random() * 3+1);
          for (let j = 0; j < Object.keys(tempDayTask).length; j++) {
          
           
            tempAgendaData[strTime].push({
              name: tempDayTask[j].title+'',
              desc: tempDayTask[j].desc,
              startAt:tempDayTask[j].startAt,
              finishAt:tempDayTask[j].finishAt,
              key: tempDayTask[j].key,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              date: time,
            });
          }
      
      
        }
       
          else{
            tempAgendaData[strTime] = [];
         
            tempAgendaData[strTime].push({
              name: "Hôm nay bạn rảnh!",
              desc: "",
              startAt:"",
              finishAt:"",
              key: "none",
              height: Math.max(50, Math.floor(Math.random() * 150)),
             date:time,
            });
          }
        
      }
      }
      const newItems = {};
      Object.keys(tempAgendaData).forEach((key) => {
        newItems[key] = tempAgendaData[key];
      });
    const action=  setValueAgenda(newItems);
     dispatch(action);
      
    }, 1000);
  };
  const checkTime= (time)=>{
   
   // console.log(timeToString(time));
 // console.log("current date "+getCurrentDate());

  if(getCurrentDate()==timeToString(time)){
 //   console.log("today timestamp is "+time);
  //  console.log("today date is "+getCurrentDate());
    return "#f6ab58";
    }
   // console.log("tmr timestamp "+getTomorrowTimestamp());
   // console.log(time + 86400000);
    
   if(getTomorrowTimestamp()==time ){
 //   console.log("match tmr");
    return "#9b58b5";
  }
      return "#12b195"  
  }
  function toTimestamp(year,month,day){
    var datum = new Date(Date.UTC(year,month,day,0,0,0));
    return datum.getTime()+86400000;
   }
   function getTomorrowTimestamp() {
    var date = new Date().getDate();
    var month = new Date().getMonth() ;
    var year = new Date().getFullYear();
    return(toTimestamp(year,month,date));
   }

  const renderItem = (item) => {
    
    if(item.key!="none"){
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17,backgroundColor:checkTime(item.date),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius:5 
      }}>
       
            <View
              style={{
                marginTop:10,
                marginBottom:10,
                marginLeft:20,
                marginRight:10,
                flexDirection: "column",
                justifyContent: 'space-between',
               
              }}>
                <View style={{}}>
              <Text style={{fontWeight:"700",color:"#fffae9"}}>{item.name}</Text>
              <View style={{height:1,backgroundColor:"#fffae9",marginLeft:0,marginRight:10,marginTop:3}}></View>
              </View>
              <Text style={{fontSize:14,marginLeft:5,color:"#fffae9"}}>{item.desc}</Text>
            </View>
       
      </TouchableOpacity>
    );}
    else{
      return (
        
        <TouchableOpacity style={{marginRight: 10, marginTop: 30,backgroundColor:checkTime(item.date),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:5 
        }}>
         
              <View
                style={{
                  marginTop:18,
                  marginBottom:18,
                 
                  flexDirection: "column",
                  justifyContent: 'space-between',
                 
                }}>
                <Text style={{color:"#fffae9",textAlign:"center"}}>{item.name}</Text>
             
              </View>
         
        </TouchableOpacity>
      );
    }
      

  };


  const getNextDay=()=>{

  }
  const displayAlert =()=>{
    
      alert("clicked");

  }
  const removevalue=()=>{
    removeAgendaValue();
  }
  const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    if(date<10){
      date="0"+date;
    }
    if(month<10){
      month="0"+month;
    }
    return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
}
  return (
    <View style={{flex: 1}}>
    <StatusBar
        animated={true}
        backgroundColor="#09958a"
       // barStyle={statusBarStyle}
         />
   
     <View
     style={{height:40, backgroundColor:"#09958a",
      flexDirection:"row"
     ,
     
     justifyContent:"space-between",
     alignItems:'center'
    ,paddingLeft:15,
    paddingRight:15
    }}
    
     >
       <Icon
    style={{}} 
       color="#FFF"
       name="refresh"
       onPress={()=>{
      const action=removeAgendaValue();
      dispatch(action);
      
      console.log(agendaStore);

       }}
       ></Icon>

       <Text style={{fontSize:16,fontWeight:"bold",color:"white",  marginBottom:5,alignSelf:"center",alignItems :"center"
    }}>Lịch cá nhân</Text>
  <Icon
   
       color="#FFF"
       name="add"
      onPress={()=>{
      //   loadItems({timestamp:getTomorrowTimestamp()-86400000});
      //  dispatch(action);

      }}
      style={{ }} 
      ></Icon>
     </View>
      <Agenda
        items={agendaStore}
     loadItemsForMonth={loadItems}
        selected={getCurrentDate()}
        renderItem={renderItem}
       // renderEmptyDate={renderEmptyItem}
      //  renderEmptyData={renderEmptyItem}
      
      />
    </View>
  );
};

export default IndexExampleContainer;