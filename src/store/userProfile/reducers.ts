import { createAsyncThunk } from '@reduxjs/toolkit'
import { Params } from 'react-router-dom'
import { Api } from '../../api/api'
import { User } from '../../types/types'
import { userQuery } from '../../utils/data'

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (id: string | Readonly<Params<string>>, { rejectWithValue }) => {
    try {
      const query = userQuery(id)
      return await Api.fetch(query).then((data) => {
        return data[0]
      })
    } catch (e) {
      return rejectWithValue('request problem')
    }
  }
)

export const updateUserStatus = createAsyncThunk<
  void,
  string,
  {
    state: {
      userProfile: {
        userProfile: User
      }
    }
  }
>('user/updateUserStatus', async (userId: string, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    await Api.patch(userId, { status: state.userProfile.userProfile.status })
  } catch (e) {
    return rejectWithValue('request problem')
  }
})
