import { CreateUserRequest } from "../dto/create-user.request";

export interface User extends CreateUserRequest {
  id: number;
}