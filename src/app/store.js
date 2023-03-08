import {configureStore, createSelector} from '@reduxjs/toolkit'
import userReducer, {selectUserLoading} from '../features/user/userSlice'
import resumeReducer, {selectResumeLoading} from "../features/resume/resumeSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    resume: resumeReducer
  }
})

export const loading = createSelector(
  [selectUserLoading, selectResumeLoading],
  (...values) => values.reduce((curr, prev) => curr || prev, false)
)