import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchProducts = {
   typeFilter?: string[];
   producerFilter?: string[];
   colorFilter?: string[];
   searchValue?: string;
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params?: FetchProducts) => {
   const queryParams = params ? '?' : '';
   if (params?.searchValue) {
      const { data } = await axios.get(`http://localhost:4200/api/catalog${queryParams}searchTerm=${params.searchValue}`);
      return data;
   }
   const typeFilter = params?.typeFilter?.length !== 0 && params?.typeFilter?.length !== undefined ? `typeFilter=${params?.typeFilter}&` : '';
   const producerFilter =
      params?.producerFilter?.length !== 0 && params?.producerFilter?.length !== undefined ? `modelFilter=${params?.producerFilter}&` : '';
   const colorFilter = params?.colorFilter?.length !== 0 && params?.colorFilter?.length !== undefined ? `colorsFilter=${params?.colorFilter}&` : '';
   const { data } = await axios.get(`http://localhost:4200/api/catalog${queryParams}${typeFilter}${producerFilter}${colorFilter}`);
   return data;
});

interface IProducts {
   products: {
      _id: string;
      title: string;
      info: string;
      mode: string;
      price: number;
      colors: string[];
      power: string;
      cub: string;
      year: string;
      type: string;
      img: string;
   }[];
   status: 'loading' | 'success' | 'error';
}

const initialState: IProducts = {
   products: [],
   status: 'loading', // loading | success | error
};

export const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
         state.status = 'loading';
         state.products = [];
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.status = 'success';
         state.products = action.payload;
      });
      builder.addCase(fetchProducts.rejected, (state) => {
         state.status = 'error';
         state.products = [];
      });
   },
});

//Alternative to useSelector
export const getProducts = (state: RootState) => state.products.products;
export const productsStatus = (state: RootState) => state.products.status;

export const { updateStatus } = productsSlice.actions;

export default productsSlice.reducer;
