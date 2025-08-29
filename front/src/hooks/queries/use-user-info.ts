import { useQuery } from "@tanstack/react-query";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { IUser } from "@/interfaces/IUser";
import { getUserInfo } from "@/services/user.service";

export const getUserInfoQueryKey = () => ["user_info"] as const;

export const useUserInfoQuery = () => {
  return useQuery<IUser | null, Error>({
    queryKey: getUserInfoQueryKey(),
    queryFn: async () => {
      const response: IApiResponse<IUser | null> = await getUserInfo();


      if (response) {

        return response.data;
      }

      return null

    }
  });
};