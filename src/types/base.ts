export interface IRegsiter {
  password: string;
  telephone: string;
  username: string;
}

export interface IResponse {
  error_code: number;
  message: string;
  data: any;
}