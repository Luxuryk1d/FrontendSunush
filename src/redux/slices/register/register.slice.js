import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/helpers/constants";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    dataRegister: [],
    error: "",
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.dataRegister = action.payload.data;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.dataRegister = [];
      state.error = action.payload.error;
    },
  },
});

export const { registerSuccess, registerFailure } = registerSlice.actions;

export const registerUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/users`, credentials);

    if (response.status === 200) {
      const data = response.data;
      dispatch(registerSuccess({ data }));
      console.log(data)
    } else {
      const errorMessage = response.data && response.data.error;
      dispatch(registerFailure({ error: errorMessage }));
    }
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.error;
    dispatch(registerFailure({ error: errorMessage || "Ошибка при регистрации" }));
  }
};

export default registerSlice.reducer;
