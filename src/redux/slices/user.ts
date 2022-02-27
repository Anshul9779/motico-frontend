import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "../../utils/types";
import jwt_decode from "jwt-decode";

interface UserState {
  isAuthenticated: boolean;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  companyId: string;
  roles: string[];
  validTill: Date;
}

const initialState: UserState = {
  isAuthenticated: false,
  token: "",
  firstName: "",
  lastName: "",
  email: "",
  id: "",
  companyId: "",
  roles: [],
  validTill: new Date(),
};

type DecodedToken = {
  id: number;
  firstName: string;
  lastName: string;
  personalNumber?: any;
  roles: string[];
  email: string;
  teamId?: any;
  companyId: number;
  settingsId: number;
  createdAt: Date;
  validTime: number;
  iat: number;
  exp: number;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<LoginPayload>) => {
      const decoded: DecodedToken = jwt_decode(action.payload.token);
      // Also save the token in localstorage
      localStorage.setItem(
        "TOKEN",
        JSON.stringify({
          token: action.payload.token,
          validTill: decoded.exp * 1000,
        })
      );
      state.isAuthenticated = true;
      if (action.payload.roles.includes("PASSWORD_RESET")) {
        state.isAuthenticated = false;
      }
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName ?? "";
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.companyId = action.payload.companyId;
      state.roles = action.payload.roles;
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
      state.roles = [];
      state.companyId = "";
      state.validTill = new Date();
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
