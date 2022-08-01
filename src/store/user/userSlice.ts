import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/types'
import { getUser } from './reducers'

const initialState = {
  user: {} as User
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
