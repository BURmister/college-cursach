import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

import productsReducer from './slice/productsSlice'
import filtersSliceReducer from './slice/filtersSlice'
import oneProductReducer from './slice/oneProductSlice'
import deleteProductReducer from './slice/deleteProductSlice'
import authReducer from './slice/authSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersSliceReducer,
    oneProduct: oneProductReducer,
    deleteProduct: deleteProductReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


