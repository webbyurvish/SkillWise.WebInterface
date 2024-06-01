import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Define the Credentials interface
interface Credentials {
  email: string;
  password: string;
}

interface LoginUserPayload {
  credentials: Credentials;
  navigate: (path: string) => void;
}

// Define the error response type
interface ErrorResponse {
  message: string;
}

// Async thunk for user login
export const loginUser = createAsyncThunk<any, LoginUserPayload, {}>(
  "loginuser",
  async ({ credentials, navigate }: LoginUserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/authentication/login",
        JSON.stringify(credentials),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return rejectWithValue({
          message: "An unknown error occurred",
        } as ErrorResponse);
      }
    }
  }
);

export interface AuthState {
  user: Object;
  isLoading: boolean;
  error: any;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {},
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = jwtDecode(action.payload.accessToken);
        localStorage.setItem("acessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
