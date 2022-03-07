import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import cameraReducer from './cameras/cameraSlice'
export const store = configureStore({
    reducer:{
        auth:authReducer,
        cameras:cameraReducer
    }
})