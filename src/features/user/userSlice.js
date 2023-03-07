import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";
import {user} from "../../app/constants";

const initialState = {
  user: user,
  status: 'idle',
  error: null
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await client('api/v1/user-info')
  return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default userSlice.reducer

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectUserLoading = (state) => state.user.status === 'loading';