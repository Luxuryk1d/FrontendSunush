import { createSlice } from "@reduxjs/toolkit";
import { API_URL, localStorageCheck } from "@/helpers/constants";
import axiosApi from '@/helpers/axiosApi';

const loginSlice = createSlice({
  name: "login",
  initialState: {
    dataLogin: [],
    error: '',
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.dataLogin = action.payload.data;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.dataLogin = [];
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.dataLogin = [];
      state.error = '';
    },
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axiosApi.post(`${API_URL}/users/sessions`, credentials);

    if (response.status === 200) {
      const data = response.data;
      dispatch(loginSuccess({ data }));
    } else {
      const errorMessage = response.data && response.data.error;
      dispatch(loginFailure({ error: errorMessage }));
    }
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.error;
    dispatch(loginFailure({ error: errorMessage || "Ошибка при входе" }));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  if(localStorageCheck) {
    localStorage.removeItem('user');
  }
};

export default loginSlice.reducer;
