import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/types'
import { getUserProfile } from './reducers'

const initialState = {
  userProfile: {} as User
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.userProfile.status = action.payload
    }
  },
  extraReducers: {
    [getUserProfile.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload
    }
  }
})

export const userProfileReducer = userProfileSlice.reducer
export const userProfileActions = userProfileSlice.actions
