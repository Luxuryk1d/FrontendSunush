import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from '@/helpers/constants';

const initialState = [];

export const fetchRegions = createAsyncThunk(
  "getRegions/fetchRegions",
  async () => {
    const response = await axios.get(`${API_URL}/regions`);
    return response.data;
  }
);

export const getRegionsSlice = createSlice({
  name: "getRegions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegions.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default getRegionsSlice.reducer;
