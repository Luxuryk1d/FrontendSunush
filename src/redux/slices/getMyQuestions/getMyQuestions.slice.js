import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from '@/helpers/axiosInstance';

const getMyQuestionsSlice = createSlice({
    name: "getMyQuestionsSlice",
    initialState: [],
    reducers: {
        getMyQuestionsSuccess: (state, action) => {
            return action.payload;
        }
    }
});

export const {getMyQuestionsSuccess} = getMyQuestionsSlice.actions;

export const getMyQuestions = (id) => async (dispatch) => {
    const response = await axiosApi.get('/questions/myQuestions/' + id);
    dispatch(getMyQuestionsSuccess(response.data));
}

export default getMyQuestionsSlice.reducer;