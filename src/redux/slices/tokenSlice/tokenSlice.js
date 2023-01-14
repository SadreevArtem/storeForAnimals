/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const tokenSlice = createSlice({
  name: 'token',
  initialState: getInitialState().token,
  reducers: {
    setToken(state, action) {
      state.value = `${action.payload}`
    },
    removeToken(state) {
      state.value = ''
    },
  },
})

export const { setToken, removeToken } = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer
