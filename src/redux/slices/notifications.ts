import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  created: Date;
  data: string;
  id: number;
  /**
   * If true, then user has seen the notification
   */
  read: boolean;
}

interface NoticationState {
  notifications: Notification[];
}

const initialState: NoticationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    removeNotification: (state, action: PayloadAction<Notification["id"]>) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
  },
});

export const {
  addNotification,
  removeNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
