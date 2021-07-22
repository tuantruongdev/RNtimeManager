import React, {useState,useRef} from 'react';
import {View, TouchableOpacity,Text,StatusBar,Image,Keyboard} from 'react-native';
import {Agenda,LocaleConfig} from 'react-native-calendars';
import { Icon,Input ,Button } from "react-native-elements";
import { useDispatch, useSelector } from 'react-redux'
import {setValueAgenda,removeAgendaValue} from '../../Store/Agenda/agendaSlice'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { current } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  //console.log("timetostring : "+date.toISOString());

  return date.toISOString().split('T')[0];
};
const timeToFullString = (time) => {
  const date = new Date(time);
  //console.log("timetostring : "+date.toISOString());

  return date.toISOString();
};



const datetimeToTime= (time) => {
  const date = new Date(time);


  var h= date.toISOString().split('T')[1];
   h=h.split(':');
  const timeString=h[0]+":"+h[1];
  return timeString;
};

const IndexExampleContainer = () => {
 var bs= React.createRef();
 var fall= new Animated.Value(1);
  const agendaStore  = useSelector(state =>state.reducer);
  const dispatch=useDispatch();
  function readTextFile() {
    let json = require("./result.json");
      console.log(json, 'the json obj');
}

const plus7hour=(time)=>{
  const date = new Date(time);
  //console.log("timetostring : "+date.toISOString());

  var year= date.toISOString().split('T')[0].split('-')[0];
  var month= date.toISOString().split('T')[0].split('-')[1]-1;
  var day= date.toISOString().split('T')[0].split('-')[2]-1;
  var hour= date.toISOString().split('T')[1].split(':')[0];
  var min= date.toISOString().split('T')[1].split(':')[1];
  var timestamp= toTimestamp(year,month,day,hour,min);
 // console.log("plus7hour "+datetimeToTime(timestamp +25200000));

  return datetimeToTime( timeToFullString(timestamp +25200000));
}

//usage:
  const [timePickerTime,setTimePickerTime] = useState(datetimeToTime(getCurrentTimestamp()) );
  const [date, setDate] = useState(new Date(getTomorrowTimestamp()-86400000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [subjcetTitle,setSubjectTitle]=useState("");
  const [subjcetDesc,setSubjectDesc]=useState("");

  const ref_input2 = useRef();
 

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTimePickerTime(  plus7hour(currentDate) );
   
   
  //  console.log(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };






  const  loadItems = async(day) => {
    var json ={};
    await AsyncStorage.getItem("taskslist",(err,result)=>{
      json =JSON.parse(result);
     })
  //   let json = require("./result.json");
    setTimeout(() => {
      var tempAgendaData=JSON.parse(JSON.stringify(json));
    //  let json = require("./result.json");

     
      for (let i = -15; i < 150; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        
       // console.log(strTime+"\n");

        
        if (!agendaStore[strTime]) {
          if(json.tasks==undefined){
            continue;
          }
          if(json.tasks[strTime]!=undefined){
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


  if(getCurrentDate()==timeToString(time)){

    return "#f6ab58";
    }
   if(getTomorrowTimestamp()==time ){
 //   console.log("match tmr");
    return "#9b58b5";
  }
      return "#12b195"  
  }
  function toTimestamp(year,month,day,hour,min){
    var datum = new Date(Date.UTC(year,month,day,hour,min,0));
    return datum.getTime()+86400000;
   }
   function getTomorrowTimestamp() {
    var date = new Date().getDate();
    var month = new Date().getMonth() ;
    var year = new Date().getFullYear();
    return(toTimestamp(year,month,date,0,0));
   }

   function getCurrentTimestamp() {
    var date = new Date().getDate();
    var month = new Date().getMonth() ;
    var year = new Date().getFullYear();
    var hour = new Date().getHours();
    var minute =new Date().getMinutes();
    return(toTimestamp(year,month,date,hour,minute)-86400000);
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
  const renderHeader=()=>(
    <View 
    
    style={{marginTop:5,height:35,backgroundColor:"#FAFAFA",alignItems:"center",justifyContent:"center",borderTopLeftRadius:25,borderTopRightRadius:25,}}
    
   >

      <View
      
      style={{borderRadius:5,width:50,height:8,backgroundColor:"#999999"}}
      ></View>
    </View>
  );
  const renderInner=()=>(
    <View style={{backgroundColor:"#FAFAFA",height:"100%"}}>

    

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{justifyContent:"center",flexDirection:"row"}}>
    
    <TouchableOpacity
    style={{backgroundColor:"#09958a",borderRadius:5,marginBottom:25}}
    onPress={showTimepicker}
    >
      <Text style={{margin:10,color:"white",fontWeight:"700",fontSize:20}}>
      {timePickerTime}

      </Text>

    </TouchableOpacity>
    <TouchableOpacity
    style={{backgroundColor:"#09958a",borderRadius:5,marginBottom:25,marginLeft:10}}
    onPress={showDatepicker}
    >
      <Text style={{margin:10,color:"white",fontWeight:"700",fontSize:20}}>
     {timeToString(date)}

      </Text>

    </TouchableOpacity>
 
    </View>

      <Input
      returnKeyType="next"
      style={{}}
      containerStyle={{}}
      disabledInputStyle={{ background: "#ddd" }}
      inputContainerStyle={{marginLeft:20,marginRight:20}}
      inputStyle={{}}
      label="Tiêu đề"
      labelStyle={{marginLeft:20}}
      labelProps={{}}
      leftIcon={ <Icon
        color="#999999"
        name="subject"
       style={{ }}/>}
       onChangeText={(text)=>{
        setSubjectTitle(text);

       }}
      leftIconContainerStyle={{}}
      placeholder="Tiêu đề công việc"
      onSubmitEditing={() => ref_input2.current.focus()}
    />
       <Input
       ref={ref_input2}
      multiline={true}
      containerStyle={{marginTop:-10}}
      disabledInputStyle={{ background: "#ddd" }}
      inputContainerStyle={{marginLeft:20,marginRight:20}}
      inputStyle={{height:90}}
      label="Mô tả"
      labelStyle={{marginLeft:20}}
      labelProps={{}}
      leftIcon={ <Icon
        color="#999999"
        name="subject"
       style={{ }}/>}
       onChangeText={(text)=>{
        setSubjectDesc(text);

       }}


      leftIconContainerStyle={{justifyContent:"flex-start"}}
      placeholder="Mô tả thêm (Tùy chọn)"
    />
<View style={{flexDirection:"row",flex:1}}>
  <View   style={{flex:4}} >
<Button
      style={{}}
      buttonStyle={{ marginLeft:40,width: 120,alignSelf:"flex-end"}}
      containerStyle={{ margin: 5 }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00F"
      }}
      disabledTitleStyle={{ color: "#00F" }}
      linearGradientProps={null}
      icon={<Icon name="add" size={17} color="#0FF" />}
      iconContainerStyle={{ background: "#000" }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={ async()=>{
       // alert(subjcetTitle + " "+ subjcetDesc);
        Keyboard.dismiss();
        bs.current.snapTo(1);
try{

        var tasklist={};
        await  AsyncStorage.getItem("taskslist",(err,result)=>{
         tasklist=result;
         })


        var myTempAgendaData=JSON.parse(tasklist);
        if(myTempAgendaData.tasks==undefined){
          myTempAgendaData.tasks={};
        }

        if(myTempAgendaData.tasks[timeToString(date)]==undefined){
          myTempAgendaData.tasks[timeToString(date)]=[]
        }



       
      
        myTempAgendaData.tasks[timeToString(date)].push({
          title: subjcetTitle,
          desc: subjcetDesc,
          startAt:timeToString(date),
          finishAt:timeToString(date),
          key: "note",
          height: Math.max(50, Math.floor(Math.random() * 150)),
         date:timeToFullString(date),
        });

     
      
       await AsyncStorage.setItem("taskslist",JSON.stringify(myTempAgendaData));

      //  const action= setValueAgenda(myTempAgendaData);
      //  dispatch(action);
      }

      catch(error){
        console.error(error);
      }
     //   console.log(timeToString(date))
      }}
      title="Thêm"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />
    
</View>
<View  style={{flex:2,marginTop:10}}>
    <Icon
    onPress={()=>{ bs.current.snapTo(1);
      Keyboard.dismiss() }}

    style={{}} name="delete" size={30} color="#F55" />
    </View>
</View>

    </View>
  );

  return (
    <View style={{flex: 1}}>
    <StatusBar
        animated={true}
        backgroundColor="#09958a"
       // barStyle={statusBarStyle}
         />
   <BottomSheet
   ref={bs}
   snapPoints={[430,0]}
   initialSnap={1}
   callbackNode= {fall}
   enabledGestureInteraction={true}
   renderContent={renderInner}
   renderHeader={renderHeader}
   ></BottomSheet>
        <View
        style={{height:40, backgroundColor:"#09958a",
          flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
        ,paddingLeft:15,
        paddingRight:15
        }}>
              <Icon
                style={{}} 
              color="#FFF"
              name="refresh"
              onPress={()=>{
              const action=removeAgendaValue();
              dispatch(action);
              console.log(agendaStore);
              }}/>

       <Text style={{fontSize:16,fontWeight:"bold",color:"white",  marginBottom:5,alignSelf:"center",alignItems :"center"}}>Lịch cá nhân</Text>
       <Icon
       color="#FFF"
       name="add"
      onPress={()=> bs.current.snapTo(0)
      }
      style={{ }}/>
     </View>

     <Animated.View 
     
     style={{flex:1,
     opacity: Animated.add(0.7,Animated.multiply(fall,1.0)),
     
     }}
    
     >
      <Agenda
        items={agendaStore}
        loadItemsForMonth={loadItems}
        selected={getCurrentDate()}
        renderItem={renderItem}

      />
      </Animated.View>
    </View>
  );
};

export default IndexExampleContainer;