import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";
import {educationalEntries, professionalEntries, skills} from "../../app/constants";

const initialState = {
  professionalEntries: professionalEntries,
  educationalEntries: educationalEntries,
  skills: skills,
  status: 'idle',
  error: null
}

export const fetchResume = createAsyncThunk('resume/fetchResume', async () => {
  const professionalResponse = await client('api/v1/resume/professional')
  const educationResponse = await client('api/v1/resume/educational')
  const skillsResponse = await client('api/v1/resume/skills')
  return {professional: professionalResponse.data, educational: educationResponse.data, skills: skillsResponse.data}
})

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchResume.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.professionalEntries = action.payload.professional
        state.educationalEntries = action.payload.educational
        state.skills = action.payload.skills
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default resumeSlice.reducer

export const selectProfessionalEntries = (state) => state.resume.professionalEntries;
export const selectEducationalEntries = (state) => state.resume.educationalEntries;
export const selectSkillEntries = (state) => state.resume.skills;
export const selectResumeStatus = (state) => state.resume.status;
export const selectResumeError = (state) => state.skiresumells.error;
export const selectResumeLoading = (state) => state.resume.status === 'loading';