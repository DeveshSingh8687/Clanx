import { ChangeTemperature, Weather_Data } from "./contsant"

export const weatherDataReducer  = (data=[],action)=>{
    switch(action.type){
        case Weather_Data:
            return action.data ? action.data :''
        default:
            return data
    }
}

export const ChangeTempratureType = (data=[],action)=>{
    switch(action.type){
        case ChangeTemperature:
            return [action.temptype]
        default:
            return data
    }
}