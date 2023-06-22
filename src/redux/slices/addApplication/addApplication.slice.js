import { createSlice } from "@reduxjs/toolkit";
import axiosApi from "@/helpers/axiosInstance";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    loading: false,
    error: null,
    response: null,
  },
  reducers: {
    postQuestionStart: (state) => {
      state.loading = true;
      state.error = null;
      state.response = action.payload;
    },
    postQuestionSuccess: (state, action) => {
      state.loading = false;
      state.response = action.payload;
    },
    postQuestionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { postQuestionStart, postQuestionSuccess, postQuestionFailure } =
  questionsSlice.actions;

export const postQuestion = (questionData) => async (dispatch) => {
  try {
    const response = await axiosApi.post("/questions", questionData);
    dispatch(postQuestionSuccess(response.data));
  } catch (error) {
    dispatch(postQuestionFailure(error.message));
  }
};

export default questionsSlice.reducer;
