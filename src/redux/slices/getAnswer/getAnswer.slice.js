import { createSlice } from "@reduxjs/toolkit";
import axiosApi from '@/helpers/axiosInstance';

const getAnswerSlice = createSlice({
    name: "getAnswerSlice",
    initialState: null,
    reducers: {
      getAnswerSuccess: (state, action) => {
        return action.payload;
      },
    },
});
  
export const { getAnswerSuccess } = getAnswerSlice.actions;

export const getAnswer = (id) => async (dispatch) => {
    const response = await axiosApi.get('/answers/' + id);
  dispatch(getAnswerSuccess(response.data));
}

export default getAnswerSlice.reducer