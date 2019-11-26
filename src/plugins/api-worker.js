import  {API_KEY} from "../config.js";
import http from "axios";

export default function apiRequest(action, parameters){

    if(action && parameters){
        let responseRequest = [];
        if(!parameters['language']){
            parameters['language']="ru-RU";
        }
        let apiUrl = "https://api.themoviedb.org";
        let apiVersion = 3;
        let parametersString = Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
        return http.get(apiUrl+'/'+apiVersion+'/'+action+'?api_key='+API_KEY+"&"+parametersString)
    }else{
        return false
    }
}