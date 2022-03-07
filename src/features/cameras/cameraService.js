import axios from 'axios'

const API = '/rest'
const baseURL=process.env.REACT_APP_BASE_URL
//Get all user cameras
const getUserCameras = async (token)=>{
    const config ={
        headers:{
            baseURL:baseURL,
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API+'/v2.4/cameras',config)
    return response.data
}


//Get user camera by cameraId

const getUserCameraById = async (cameraId,token)=>{
    const config ={
        headers:{
            baseURL:baseURL,
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API+`/v2.4/cameras/${cameraId}`,config)
    return response.data
}


//Get user camera snapshot by cameraId

const getUserCameraSnapshotById = async (cameraId,token)=>{
    const config ={
        headers:{
            baseURL:baseURL,
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API+`/v2.4/cameras/${cameraId}/snapshot`,config)
    return response.data
}

//Get user camera device info by cameraId

const getUserCameraDeviceInfo = async (cameraId,token)=>{
    const config ={
        headers:{
            baseURL:baseURL,
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API+`/v2.4/cameras/${cameraId}/deviceInfo`,config)
    return response.data
}

//get camera location
const getUserCameraLocation = async (cameraId,token)=>{
    const config ={
        headers:{
            baseURL:baseURL,
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API+`/v2.4/cameras/${cameraId}/location`,config)
    return response.data
}

//get camera firmware version
const getUserCameraFirmware= async (cameraId,token)=>{
    const config ={
        headers:{
            baseURL:baseURL,
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API+`/v2.4/cameras/${cameraId}/firmware`,config)
    return response.data
}

//get camera status
const getUserCameraStatus= async (cameraId,token)=>{
    const config ={
        headers:{
            baseURL:baseURL,
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API+`/v2.4/cameras/${cameraId}/status`,config)
    return response.data
}


 

 

const cameraService={
    getUserCameras,
    getUserCameraById,
    getUserCameraSnapshotById,
    getUserCameraDeviceInfo,
    getUserCameraLocation,
    getUserCameraFirmware,
    getUserCameraStatus
}

export default cameraService