import { createSlice } from "@reduxjs/toolkit";
import axiosApi from "@/helpers/axiosInstance";

const modersSlice = createSlice({
  name: "moders",
  initialState: [],
  reducers: {
    getModersSuccess: (state, action) => {
      return action.payload;
    },
    createModerSuccess: (state, action) => {
      return action.payload;
    },
    deleteModerSuccess: (state, action) => {
      return action.payload;
    },
  },
});

export const { getModersSuccess, createModerSuccess, deleteModerSuccess } =
  modersSlice.actions;

export const getModers = () => async (dispatch) => {
  try {
    const response = await axiosApi.get("/admin/moderators");
    dispatch(getModersSuccess(response.data));
  } catch (e) {
    console.log(e);
  }
};

export const createModer = (data) => async (dispatch) => {
  try {
    await axiosApi.post("admin/moderator", data);
  } catch (e) {
    console.log(e);
  }
};

export const deleteModer = (id) => async (dispatch) => {
  try {
    await axiosApi.delete("admin/moderators/" + id);
    dispatch(deleteModerSuccess());
  } catch (e) {
    console.log(e);
  }
};

export default modersSlice.reducer;