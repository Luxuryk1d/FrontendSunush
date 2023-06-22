import { createSlice } from "@reduxjs/toolkit";
import axiosApi from '@/helpers/axiosInstance';

const getUnpublishedSlice = createSlice({
    name: "getUnpublishedSlice",
    initialState: null,
    reducers: {
      getUnpublishedSuccess: (state, action) => {
        return action.payload;
      },
    },
});
  
export const { getUnpublishedSuccess } = getUnpublishedSlice.actions;

export const getUnpublished = () => async (dispatch) => {
    const response = await axiosApi.get('/questions//unpublished/all');
    dispatch(getUnpublishedSuccess(response.data));
};

export default getUnpublishedSlice.reducer;