import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import {TOKEN} from '../constants/asyncStorage';
import {getItem} from '../utils/asyncStorage';
import {RootState} from './store';

const MAIN_API = Config.API_URL;

export const TAG_TYPES = {
  DATA: 'Data',
};

const baseQuery = fetchBaseQuery({
  baseUrl: MAIN_API,
  prepareHeaders: async (headers, {getState}) => {
    let token = (getState() as RootState).appInfo.token;
    if (!token) {
      token = await getItem(TOKEN);
    }
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 2});

export const mainSplitApi = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
});

export const splitApi = mainSplitApi as any;
