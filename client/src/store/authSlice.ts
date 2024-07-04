import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          username,
          password,
        }
      );
      return response.data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        axios.isAxiosError(error) ? error.message : "failed to login"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          username,
          password,
        }
      );
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        axios.isAxiosError(error) ? error.message : "failed to login"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isAuthenticated = false;
      state.token = null;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
