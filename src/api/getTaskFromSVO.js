import React ,{Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getTaskFromSVO() {
  
   
   
    let userData =null;
   // await  AsyncStorage.removeItem("userInfo");
  await  AsyncStorage.getItem("userInfo",(err,result)=>{
       userData= JSON.parse(result);
      })

    if(userData==null){
        console.log("not login yet!");
        return "error";
    }
    

    const taskLink="https://api.dhdt.vn/calendar/task";

    try{
    var response=await  fetch(taskLink, {
        method: 'POST',
        headers: {
                    'Content-Type':'application/json;charset=UTF-8',
                    'Accept': 'application/json, text/plain, */*',
                    'sso_token':userData.sso_token,
                    'refresh_token': userData.refresh_token,
                    'if-none-match': '"W/\"b5b-3+NZGVqGPC6cHnb+39bL/VlxSY4\"',
                    'agent': '{\"brower\":\"SVOapp\",\"version\":\"6.1.3\",\"device_name\":\"ReacNativeApp\",\"unique_device_id\":\"8DA9BD10 - B0D0 - 4808 - AB34 - 4AF30AA044EC\",\"user_agent\":\"Mozilla / 5.0(iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit / 605.1.15(KHTML, like Gecko) Mobile / 15E148\",\"system_name\":\"iOS\",\"device_model\":\"iPhone 7\",\"system_version\":\"13.6.1\"}'
        
        },
        body: JSON.stringify({
            "force_update" :"true",
           
        })
      });
    }catch(error){}
      const json = await response.json(); 
      AsyncStorage.setItem("taskslist",JSON.stringify(json));
}



async function login(userName,passWord) {
    const loginLink="https://api.dhdt.vn/account/login/passwd";
    console.log("_id="+userName);
    try{
    var response=await  fetch(loginLink, {
        method: 'POST',
        headers: {
                    'Content-Type':'application/json;charset=UTF-8',
                    'Accept': 'application/json, text/plain, */*',
                    'sso_token':'undefined',
                    'refresh_token': 'undefined',
                    'if-none-match': '"W/\"b5b-3+NZGVqGPC6cHnb+39bL/VlxSY4\"',
                    'agent': '{\"brower\":\"SVOapp\",\"version\":\"6.1.3\",\"device_name\":\"ReacNativeApp\",\"unique_device_id\":\"8DA9BD10 - B0D0 - 4808 - AB34 - 4AF30AA044EC\",\"user_agent\":\"Mozilla / 5.0(iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit / 605.1.15(KHTML, like Gecko) Mobile / 15E148\",\"system_name\":\"iOS\",\"device_model\":\"iPhone 7\",\"system_version\":\"13.6.1\"}'
        
        },
        body: JSON.stringify({
            "type" :"user",
            "_id" : userName,
            "passwd":passWord
            
        })
      });
     
      const json = await response.json();
     // console.log(json);
      if(Object.keys(json).length>2){
      let returnLogin= json;
      
        return returnLogin;

      }

      return "error";

     
    }catch(error){
        console.error(error);
        return "error";
    }
}

async function checkSmartName(smartName) {
    const smartNameLink="https://api.dhdt.vn/account/login/check-smartname";
try{
  var response=await  fetch(smartNameLink, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
                    'Accept': 'application/json, text/plain, */*',
                    'sso_token':'undefined',
                    'refresh_token': 'undefined',
                    'if-none-match': '"W/\"b5b-3+NZGVqGPC6cHnb+39bL/VlxSY4\"',
                    'agent': '{\"brower\":\"SVOapp\",\"version\":\"6.1.3\",\"device_name\":\"ReacNativeApp\",\"unique_device_id\":\"8DA9BD10 - B0D0 - 4808 - AB34 - 4AF30AA044EC\",\"user_agent\":\"Mozilla / 5.0(iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit / 605.1.15(KHTML, like Gecko) Mobile / 15E148\",\"system_name\":\"iOS\",\"device_model\":\"iPhone 7\",\"system_version\":\"13.6.1\"}'
        
        },
        body: JSON.stringify({
            "smartname" : smartName,
            "acc_type" : "user"
        })
      });
     
      const json = await response.json();
     // console.log((Object.keys(json.list_acc).length));
      //console.log(json.list_acc[0]);
      if(Object.keys(json.list_acc).length>0){
       let returnObj=json.list_acc[0];
      
        return returnObj;

      }

    //  console.error("error");
      let returnObj="error";
      return returnObj;
  


    }catch(error){
        console.error("error");
        let returnObj="error";
        return returnObj;
    }

}

export  {checkSmartName,login,getTaskFromSVO};