export interface LoggedUser {
  name: string;
  email: string;
  role: string;
}

export interface successLoggedUserResponse {
  message: string;
  user: LoggedUser;
  token: string;
}
export interface FaildLoggedUser {
  message: string;
  statusMsg: string;
}
