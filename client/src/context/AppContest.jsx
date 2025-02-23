import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const  AppContest = createContext()

export const AppContestProvider = (props)=>{
    
    axios.defaults.withCredentials=true;
    const backendUrl =  import.meta.env.VITE_BACKEND_URL
    const [isLoggedin , setIsLoggedin] = useState(false)
    const [userData , setIsUserData] = useState(false)
    const getAuthState =async ()=>{
        try {
            const {data} =await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
                
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const getUserData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setIsUserData(data.userData) : toast.error(data.message)
            
        } catch (error) {
            toast.error(data.message)
        }
    }
    useEffect(()=>{
        getAuthState();
    },[])


    const value={
        backendUrl,isLoggedin,setIsLoggedin,userData,setIsUserData,getUserData
    }
    return (
        <AppContest.Provider value={value}>{props.children}</AppContest.Provider>
    )

}