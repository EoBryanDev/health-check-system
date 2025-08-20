import { IQueryParams } from "../use_cases/interfaces/IQueryParams";

const queryParams = (params?: IQueryParams): IQueryParams => {
    const queryParams: IQueryParams = {
        active: params?.active ?? true,
        offset: params?.offset ?? 0,
        limit: params?.limit ?? 20
    }

    return queryParams;

}

export { queryParams }