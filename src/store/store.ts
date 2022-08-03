import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'
import { userProfileReducer } from './userProfile/userProfileSlice'

export const store = configureStore({
  reducer: { user: userReducer, userProfile: userProfileReducer }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
