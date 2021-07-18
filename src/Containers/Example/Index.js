import React, {useState} from 'react';
import {View, TouchableOpacity,Text} from 'react-native';
import {Agenda,LocaleConfig} from 'react-native-calendars';


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
  const [items, setItems] = useState({});

  function readTextFile() {
    let json = require("./result.json");
      console.log(json, 'the json obj');
}

//usage:



  const loadItems = (day) => {
    setTimeout(() => {
      let json = require("./result.json");
      for (let i = -15; i < 150; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
       // console.log(strTime+"\n");

        
        if (!items[strTime]) {
          if(json.tasks[strTime]!=null){
           // console.log(strTime+"\n");
          var tempDayTask=json.tasks[strTime];
        //  console.log(Object.keys(tempDayTask).length);
            
          items[strTime] = [];
          //random activities
        //  const numItems = Math.floor(Math.random() * 3+1);
          for (let j = 0; j < Object.keys(tempDayTask).length; j++) {
          
           
            items[strTime].push({
              name: tempDayTask[j].title+'',
              desc: tempDayTask[j].desc,
              startAt:tempDayTask[j].startAt,
              finishAt:tempDayTask[j].finishAt,
              key: tempDayTask[j].key,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
      
      
        }
          else{
            items[strTime] = [];
            items[strTime].push({
              name: "Hôm nay bạn rảnh!",
              desc: "",
              startAt:"",
              finishAt:"",
              key: "",
              height: Math.max(50, Math.floor(Math.random() * 150)),
             
            });
          }
        
      }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
     
      
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17,backgroundColor:"#FAFAFA",
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
                marginTop:15,
                marginBottom:15,
                marginLeft:10,
                marginRight:10,
                flexDirection: "column",
                justifyContent: 'space-between',
               
              }}>
              <Text>{item.name}</Text>
              <Text style={{fontSize:13}}>{item.desc}</Text>
            </View>
       
      </TouchableOpacity>
    );
  };
  const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
}
  return (
    <View style={{flex: 1}}>
     
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2021-04-04"}
        renderItem={renderItem}
      />
    </View>
  );
};

export default IndexExampleContainer;