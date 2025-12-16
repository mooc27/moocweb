import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
  user: any | null;
}

const getInitialState = (): AuthState => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      isAuth: false,
      user: null,
    };
  }
  let userInfoString = localStorage.getItem("userInfo");
  return {
    isAuth: true,
    user:
      userInfoString === "" || userInfoString == null
        ? null
        : (JSON.parse(userInfoString) as any),
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: any;
      }>
    ) {
      state.isAuth = true;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
    },

    reSetAvatar(state, action: PayloadAction<{ avatar: string}>) {
      state.user!.avatar = action.payload.avatar;
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
  },
});

export const { login, logout,reSetAvatar } = authSlice.actions;
export default authSlice.reducer;
