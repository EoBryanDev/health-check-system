interface ITokenGenerator {
  generate(
    payload: object,
    expiresIn?: string | number
  ): { access_token: string; expiresIn: number };
  validate(token: string): object | null;
}

export { ITokenGenerator };
