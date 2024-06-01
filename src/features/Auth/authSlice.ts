import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import createAxiosInstance from "../../Axios/axiosInstance";

// Create an instance of axios with interceptor
const axiosInstance = createAxiosInstance();

interface LoginUserPayload {
  credentials: {
    userName: string;
    password: string;
  };
  navigate: (path: string) => void;
}

interface SignupUserPayload {
  user: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    roles: Array<string>;
  };
  navigate: (path: string) => void;
}

interface ErrorResponse {
  message: string;
}

export const loginUser = createAsyncThunk<any, LoginUserPayload>(
  "loginuser",
  async ({ credentials, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "authentication/login",
        credentials
      );

      navigate("/");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as ErrorResponse);
      } else {
        return rejectWithValue({
          message: "An unknown error occurred",
        } as ErrorResponse);
      }
    }
  }
);

// Async thunk for user sign up
export const signupUser = createAsyncThunk<any, SignupUserPayload>(
  "signupUser",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("authentication", user);
      navigate("/");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as ErrorResponse);
      } else {
        return rejectWithValue({
          message: "An unknown error occurred",
        } as ErrorResponse);
      }
    }
  }
);

export interface AuthState {
  user: any;
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

// Retrieve token from localStorage
const token =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

// If token exists, decode it and store the data in the user
if (token) {
  const decodedToken = jwtDecode(token);
  initialState.user = decodedToken;
  initialState.isAuthenticated = true;
}

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
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = jwtDecode(action.payload.accessToken);
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
