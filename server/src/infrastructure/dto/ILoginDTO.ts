interface ILoginInputDTO {
  email: string;
  password: string;
}
interface ILoginOutputDTO {
  access_token: string;
  expires_in: number;
  expires_at: string;
}

export { ILoginInputDTO, ILoginOutputDTO };
