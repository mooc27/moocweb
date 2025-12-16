import { MenuType } from "./enum";
import { BaseEntityDto } from "./types";

export interface MenuDto extends BaseEntityDto {
  title: string;
  permission: string;
  mark: string;
  orderNum: number;
  menuType: MenuType;
  route?: string;
  componentPath?: string;
  parentId?: number;
  level: number;
  icon?: string;
  children: MenuDto[];
}

export interface UserPermissionDto {
  menuDtos: Array<MenuDto>;
  permissions: Array<string>;
}
