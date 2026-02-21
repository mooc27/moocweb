import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuDto } from "../types/menu";

interface PermissionState {
  menuItems: Array<MenuDto> | null;
  permissions: Array<string> | null;
}

const getInitialState = (): PermissionState => {
  return {
    permissions: [],
    menuItems: [
      {
        id: 1,
        title: "Course Management",
        permission: "Mooc",
        menuType: 1,
        mark: "",
        orderNum: 1,
        route: "",
        componentPath: undefined,
        parentId: undefined,
        level: 0,
        children: [
          {
            id: 20,
            title: "Demo",
            permission: "Demo",
            menuType: 2,
            mark: "",
            orderNum: 0,
            route: "/Demo",
            componentPath: "./pages/demo/index.jsx",
            parentId: 18,
            level: 0,
            children: [],
          },
        ],
      },
      {
        id: 100,
        title: "User Management",
        permission: "Admin",
        menuType: 2,
        mark: "",
        orderNum: 2,
        route: "/user-management",
        componentPath: "./pages/UserManagement.tsx",
        parentId: undefined,
        level: 0,
        children: [],
      },
    ],
  };
};

const permissionSlice = createSlice({
  name: "permission",
  initialState: getInitialState(),
  reducers: {
    setPermissions(
      state,
      action: PayloadAction<{
        menuItems: Array<MenuDto>;
        permissions: Array<string>;
      }>
    ) {
      state.menuItems = action.payload.menuItems;
      state.permissions = action.payload.permissions;
      localStorage.setItem(
        "user_menuItems",
        JSON.stringify(action.payload.menuItems)
      );
      localStorage.setItem(
        "user_permissions",
        JSON.stringify(action.payload.permissions)
      );
    },
    clearPermissions(state) {
      state.menuItems = null;
      state.permissions = null;
      localStorage.removeItem("user_menuItems");
      localStorage.removeItem("user_permissions");
    },
  },
});

export const { setPermissions, clearPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;
