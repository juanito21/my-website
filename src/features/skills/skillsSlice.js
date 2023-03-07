import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";
import {skills} from "../../app/constants";

const initialState = {
  skills: skills,
  status: 'idle',
  error: null
}

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const response = await client('api/v1/skills')
  return response.data
})

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSkills.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.skills = action.payload
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default skillsSlice.reducer

export const selectSkills = (state) => state.skills.skills;
export const selectSkillsStatus = (state) => state.skills.status;
export const selectSkillsError = (state) => state.skills.error;
export const selectSkillsLoading = (state) => state.skills.status === 'loading';