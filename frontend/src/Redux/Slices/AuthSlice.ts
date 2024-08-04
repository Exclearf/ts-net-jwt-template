import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReceiptRussianRuble } from "lucide-react";

const initialState = {
  state: {
    isFetching: false,
  },
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
};

export const logIn = createAsyncThunk(
  "auth/LogIn",
  async (userObj: { userName: string; password: string }, thunkAPI) => {
    thunkAPI.dispatch(setIsFetching(true));
    const response = await fetch(import.meta.env.VITE_API_HOST + "auth/login", {
      method: "POST",
      body: JSON.stringify({
        userName: userObj.userName,
        password: userObj.password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // fetch user, set token
    thunkAPI.dispatch(setIsFetching(false));
    return await response.json();
  }
);

export const signUp = createAsyncThunk(
  "auth/SignUp",
  async (userObj: { userName: string; password: string }, thunkAPI) => {
    thunkAPI.dispatch(setIsFetching(true));
    const response = await fetch(
      import.meta.env.VITE_API_HOST + "auth/signup",
      {
        method: "POST",
        body: JSON.stringify({
          userName: userObj.userName,
          password: userObj.password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // fetch user, set token
    thunkAPI.dispatch(setIsFetching(false));
    return await response.json();
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setIsFetching(true));
    if (
      !thunkAPI.getState().auth.accessToken ||
      !thunkAPI.getState().auth.refreshToken
    ) {
      return Promise.reject("There has been an error.");
    }
    const response = await fetch(
      import.meta.env.VITE_API_HOST + "token/refresh",
      {
        method: "POST",
        body: JSON.stringify({
          accessToken: thunkAPI.getState().auth.accessToken,
          refreshToken: thunkAPI.getState().auth.refreshToken,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // fetch user, set token
    thunkAPI.dispatch(setIsFetching(false));
    return await response.json();
  }
);

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setIsFetching: (state, action) => {
      state.state.isFetching = action.payload ?? !state.state.isFetching;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload?.accessToken;
      state.refreshToken = action.payload?.refreshToken;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.isAuthenticated = false;
      state.state.isFetching = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload?.accessToken;
      state.refreshToken = action.payload?.refreshToken;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isAuthenticated = false;
      state.state.isFetching = false;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      if (action.payload?.accessToken) {
        state.accessToken = action.payload.accessToken;
      }
      if (action.payload?.refreshToken) {
        state.refreshToken = action.payload?.refreshToken;
      }
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.isAuthenticated = false;
      state.state.isFetching = false;
    });
  },
});

export const { setIsFetching, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
