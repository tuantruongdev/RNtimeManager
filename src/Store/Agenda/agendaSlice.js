import { createSlice,createAction } from "@reduxjs/toolkit";

const agendaSlice= createSlice({
    name:"agendaSlice",
    initialState:{},
    reducers:{
        setValueAgenda(state,action){
            console.log("set value");
           return action.payload;

        },
        removeAgendaValue(state){
            console.log("removed all value");
            return {};
        },
        createEmptyArray(state,action){
            state[action.payload.date]=[];


        }
        ,
        pushAgenda(state,action){
            
            
            state[action.payload.date].push(action.payload);


        }


    }


});
const {actions,reducer}=agendaSlice;
export const {setValueAgenda,removeAgendaValue,createEmptyArray,pushAgenda}=actions;
export default reducer;