export interface IApiResponse<T> {
    success: boolean;
    data: T;
    offset?: number,
    limit?: number,
    error?: string;
}