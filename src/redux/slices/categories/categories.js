import axiosApi from '@/helpers/axiosInstance';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get("http://localhost:8000/categories");
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategory) => {
    const response = await axiosApi.post("http://localhost:8000/categories", newCategory);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId) => {
    await axiosApi.delete(`http://localhost:8000/categories/${categoryId}`);
    return categoryId;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      return state.filter((category) => category.id !== action.payload);
    });
  },
});

export default categoriesSlice.reducer;
