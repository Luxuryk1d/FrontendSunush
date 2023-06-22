import { createSlice } from "@reduxjs/toolkit";
import axiosApi from "@/helpers/axiosInstance";

const addAnswerSLice = createSlice({
    name: "addAnswerSlice",
    initialState: [],
    reducers: {
        addAnswerSucces: (state, action) => {
            state.response = action.payload
        }
    }
});

export const { addAnswerSucces } = addAnswerSLice.actions;

export const addAnswer = (data) => async (dispatch) => {
    try {
        const response = await axiosApi.post("/answers", data);
        dispatch(addAnswerSucces(response.data));
    } catch (e) {
        console.log(e);
    };
};

export default addAnswerSLice.reducer