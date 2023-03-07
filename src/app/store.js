import {configureStore, createSelector} from '@reduxjs/toolkit'
import userReducer, {selectUserLoading} from '../features/user/userSlice'
import skillsReducer, {selectSkillsLoading} from '../features/skills/skillsSlice'
import resumeReducer, {selectResumeLoading} from "../features/resume/resumeSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    skills: skillsReducer,
    resume: resumeReducer
  }
})

export const loading = createSelector(
  [selectUserLoading, selectSkillsLoading, selectResumeLoading],
  (...values) => values.reduce((curr, prev) => curr || prev, false)
)