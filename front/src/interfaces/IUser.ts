export interface ILoginInputDTO {
  email: string;
  password: string;
}
export interface ILoginOutputDTO {
  access_token: string;
  expires_in: number;
  expires_at: string;
}

export interface ICreateUserInputDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cellnumber?: string;
}

export interface ICreateUserOutputDTO {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  cellnumber?: string;
  created_at: string;
}



