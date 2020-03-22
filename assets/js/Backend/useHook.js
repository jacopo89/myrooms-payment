import {useState} from "react";

export function useCreateHook(Client, url, method, defaultDataValue){

    const [data, setData] = useState(defaultDataValue);
    const successMessage = url + " SUCCESS";
    const errorMessage = url + " ERROR";
    const defaultSuccessCallback = () => {/*console.log(successMessage);*/};
    const defaultErrorCallback = (e) => {/*console.error(errorMessage, e);*/};
    let requestHandler;

    const defaultCallbacks = {
        successCallback: defaultSuccessCallback,
        errorCallback: defaultErrorCallback,
        dataManipulationFunction: null
    };


    switch(method){
        case "get":
        {
            let startUrl = url;
            requestHandler = (getParameters, callbacks = defaultCallbacks ) => {
                //console.log("Get Parameters", getParameters);
                if(Array.isArray(getParameters)){
                    getParameters.forEach((parameter)=>{url += "/" + parameter });
                }else{
                    if(getParameters!==undefined){

                        url+="/"+getParameters;
                    }
                }
                //console.log("Get Url", url);

                Client.get(url)
                    .then(response => {

                        //Data Manipulation
                        if(callbacks.dataManipulationFunction){
                            let manipulatedData = callbacks.dataManipulationFunction(response.data);
                            setData(manipulatedData);
                        }else{
                            setData(response.data);
                        }
                        //Success Callback
                        if(callbacks.successCallback!==undefined){
                            callbacks.successCallback(response.data);
                        }else{
                            defaultCallbacks.successCallback();
                        }
                    })
                    .catch(()=>{
                        //ErrorCallback
                        // console.log("Is callback undefined", callbacks.errorCallback===undefined);
                        if(callbacks.errorCallback!==undefined){
                            callbacks.errorCallback();
                        }else{
                            defaultCallbacks.errorCallback()
                        }
                    })

                //Clearing the url so the url can be used afterwards
                url = startUrl;
            }
            return [data, requestHandler];
        }
        case "post":
        {
            requestHandler = (formData, callbacks = defaultCallbacks) => {

                Client.post(url, formData)
                    .then(response => {
                        //Data Manipulation
                        //console.log(callbacks);
                        if(callbacks.dataManipulationFunction){
                            let manipulatedData = callbacks.dataManipulationFunction(response.data);
                            //console.log("Manipulating data");
                            setData(manipulatedData);
                        }else{
                            //console.log("Setting data", response.data);
                            setData(response.data);
                        }
                        //Success Callback
                        if(callbacks.successCallback!==undefined){
                            //  console.log("Success callback");
                            callbacks.successCallback(response.data);
                        }else{
                            //console.log("Default success callback");
                            defaultCallbacks.successCallback();
                        }
                    })
                    .catch((e)=>{
                        //ErrorCallback
                        if(callbacks.errorCallback!==undefined){
                            callbacks.errorCallback();
                        }else{
                            defaultCallbacks.errorCallback(e);
                        }
                    })
            };
            return [data,requestHandler];
        }
        case "delete":
        {
            let startUrl = url;
            requestHandler = (getParameters, callbacks = defaultCallbacks ) => {
                //console.log("Get Parameters", getParameters);
                if(Array.isArray(getParameters)){
                    getParameters.forEach((parameter)=>{url += "/" + parameter });
                }else{
                    if(getParameters!==undefined){

                        url+="/"+getParameters;
                    }
                }
                //console.log("Get Url", url);

                Client.delete(url)
                    .then(response => {

                        //Data Manipulation
                        if(callbacks.dataManipulationFunction){
                            let manipulatedData = callbacks.dataManipulationFunction(response.data);
                            setData(manipulatedData);
                        }else{
                            setData(response.data);
                        }
                        //Success Callback
                        if(callbacks.successCallback!==undefined){
                            callbacks.successCallback(response.data);
                        }else{
                            defaultCallbacks.successCallback();
                        }
                    })
                    .catch(()=>{
                        //ErrorCallback
                        // console.log("Is callback undefined", callbacks.errorCallback===undefined);
                        if(callbacks.errorCallback!==undefined){
                            callbacks.errorCallback();
                        }else{
                            defaultCallbacks.errorCallback()
                        }
                    })

                //Clearing the url so the url can be used afterwards
                url = startUrl;
            }
            return [data, requestHandler];
        }
    }


}