import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cameraService from './cameraService'

 

const initialState = {
  cameras: [],
  camera:{},
  cameraDeviceInfo:{},
  cameraFirmware:{},
  cameraLocation:{},
  cameraStatus:false,
  cameraSnapshot:'',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//get user cameras

export const getCameras = createAsyncThunk('cameras/getAll',async(_,thunkAPI)=>{
    try {
         const token = thunkAPI.getState().auth.user.access_token
        return await cameraService.getUserCameras(token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

})


//get a specific camera detail

export const getCameraById = createAsyncThunk('cameras/getCamera',async(cameraId,thunkAPI)=>{
  try {
      const token = thunkAPI.getState().auth.user.access_token
      return await cameraService.getUserCameraById(cameraId,token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})


//get camera snapshot

export const getCameraSnapshotById = createAsyncThunk('cameras/getCameraSnapshot',async(cameraId,thunkAPI)=>{
  try {
      const token = thunkAPI.getState().auth.user.access_token
      return await cameraService.getUserCameraSnapshotById(cameraId,token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})


 


//get camera deviceInfo

export const getCameraDeviceInfoById = createAsyncThunk('cameras/getDeviceInfo',async(cameraId,thunkAPI)=>{
  try {
      const token = thunkAPI.getState().auth.user.access_token
      return await cameraService.getUserCameraDeviceInfo(cameraId,token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})


//get camera location

export const getCameraLocation = createAsyncThunk('cameras/getLocation',async(cameraId,thunkAPI)=>{
  try {
      const token = thunkAPI.getState().auth.user.access_token
      return await cameraService.getUserCameraLocation(cameraId,token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})

//get camera firmware version

export const getCameraFirmware = createAsyncThunk('cameras/getFirmware',async(cameraId,thunkAPI)=>{
  try {
      const token = thunkAPI.getState().auth.user.access_token
      return await cameraService.getUserCameraFirmware(cameraId,token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})



//get camera status

export const getCameraStatus = createAsyncThunk('cameras/getStatus',async(cameraId,thunkAPI)=>{
  try {
      const token = thunkAPI.getState().auth.user.access_token
      return await cameraService.getUserCameraStatus(cameraId,token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})






export const cameraSlice= createSlice({
    name:'camera',
    initialState,
    reducers:{
        reset:(state)=> initialState
    },
    extraReducers: (builder) => {
        builder
        
          .addCase(getCameras.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getCameras.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.cameras=action.payload
          })
          .addCase(getCameras.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          .addCase(getCameraById.fulfilled, (state, action) => {
            return { ...state, camera: action.payload };
          })

          .addCase(getCameraSnapshotById.fulfilled, (state, action) => {
            return { ...state,   cameraSnapshot: action.payload };
          })
          .addCase(getCameraDeviceInfoById.fulfilled, (state, action) => {
            return { ...state,   cameraDeviceInfo: action.payload };
          })
          .addCase(getCameraLocation.fulfilled, (state, action) => {
            return { ...state,   cameraLocation: action.payload };
          })
          .addCase(getCameraFirmware.fulfilled, (state, action) => {
            return { ...state,   cameraFirmware: action.payload };
          })
          .addCase(getCameraStatus.fulfilled, (state, action) => {
            return { ...state,   cameraStatus: action.payload.online };
          })
       
      },
})

export const {reset}= cameraSlice.actions
export default cameraSlice.reducer
