import { ChangeTemperature, Weather_Data } from "./contsant"

export const weatherDataAction = (data)=>{
    return {
        type: Weather_Data,
        data
    }
}

export const ChangeTemp = (temptype) =>{
    return{
        type: ChangeTemperature,
        temptype
    }
}