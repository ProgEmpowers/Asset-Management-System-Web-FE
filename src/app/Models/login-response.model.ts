export interface LoginResponse{
  token : string;
  email : string;
  roles : string[];
  refreshToken: string;
}
