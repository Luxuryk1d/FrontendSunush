import { createSlice } from "@reduxjs/toolkit";
import axiosApi from '@/helpers/axiosInstance';

const getQuestionSlice = createSlice({
    name: "getQuestionSlice",
    initialState: null,
    reducers: {
      getQuestionSuccess: (state, action) => {
        return action.payload;
      },
    },
  });

export const { getQuestionSuccess } = getQuestionSlice.actions;

export const getQuestion = (id) => async (dispatch) => {
    const response = await axiosApi.get('/questions/' + id);
    dispatch(getQuestionSuccess(response.data))
}

export default getQuestionSlice.reducer