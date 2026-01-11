export class CreateUserRequest {
  name!: string;
  email!: string;
  password!: string;
}

export class UpdateUserRequest extends CreateUserRequest {}