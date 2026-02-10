import { Role } from './role.model';

export interface LoginResponse {
  token: string;
  userId: number;
  email: string;
  roles: Role[];
  authorities : string[]
}
