import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  info: undefined,
  features: undefined,
  room: undefined,
  status: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload
    },
    setFeatures: (state, action) => {
      state.features = action.payload
    },
    setRoom: (state, action) => {
      state.room = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    }
  }
})

export const {setInfo, setFeatures, setRoom, setStatus} = userSlice.actions

export default userSlice.reducer
