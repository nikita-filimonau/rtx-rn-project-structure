import {mainSplitApi} from '../mainSplitApi';

export interface User {
  id: number;
  name: string;
  token: string;
}

const NAME_API = 'current';

export const userApi = mainSplitApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, number>({
      query: () => NAME_API,
    }),
    login: builder.query<User, number>({
      query: () => NAME_API,
    }),
  }),
});

// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#createapi
export const useGetUserQuery = userApi.endpoints.getUser.useQuery;
export const useLoginQuery = userApi.endpoints.login.useQuery;
