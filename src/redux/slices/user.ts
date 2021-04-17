import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "../../utils/types";

interface UserState {
  isAuthenticated: boolean;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  validTill: Date;
}

const initialState: UserState = {
  isAuthenticated: false,
  token: "",
  firstName: "",
  lastName: "",
  email: "",
  id: "",
  validTill: new Date(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<LoginPayload>) => {
      // Also save the token in localstorage
      localStorage.setItem(
        "TOKEN",
        JSON.stringify({
          token: action.payload.token,
          validTill: action.payload.issuedAt + action.payload.validTime,
        })
      );
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName ?? "";
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.validTill = new Date(
        action.payload.issuedAt + action.payload.validTime
      );
    },
    removeUser: (state) => {
      // Remove the token from localstorage
      localStorage.removeItem("TOKEN");
      state.isAuthenticated = false;
      state.token = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.id = "";
      state.validTill = new Date();
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
