/* eslint-disable @typescript-eslint/no-explicit-any */
interface IHTTPSuccessOutputDTO {
  data: any;
  offset?: number;
  limit?: number;
}

interface IHTTPErrorOutputDTO {
  error: any;
}

export { IHTTPSuccessOutputDTO, IHTTPErrorOutputDTO };
