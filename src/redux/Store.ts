import { configureStore } from '@reduxjs/toolkit'
import { reduxSlice } from './ReduxSlice'

export const Store = configureStore({
  reducer: {
    globlestate:reduxSlice.reducer
  }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;