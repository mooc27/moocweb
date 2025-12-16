import { BaseEntityDto } from "./types";

export interface TestDto extends BaseEntityDto {
  title: string;
  count: number;
}

export interface CreateOrUpdateTestBaseDto {
  id: number;
  title: string;
  count: number;
}

export interface CreateTestDto extends CreateOrUpdateTestBaseDto {}

export interface UpdateTestDto extends CreateOrUpdateTestBaseDto {}
