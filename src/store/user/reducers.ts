import { createAsyncThunk } from '@reduxjs/toolkit'
import { Params } from 'react-router-dom'
import { Api } from '../../api/api'
import { userQuery } from '../../utils/data'

export const getUser = createAsyncThunk(
  'user/getUser',
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
