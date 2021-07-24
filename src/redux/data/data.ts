import {mainSplitApi, TAG_TYPES} from '../mainSplitApi';

export interface Data {
  id: number;
}

type DataResponse = Data[];

const NAME_API = 'data';
const TAG_TYPE = TAG_TYPES.DATA;

export const dataApi = mainSplitApi.injectEndpoints({
  endpoints: builder => ({
    getData: builder.query<DataResponse, void>({
      query: () => NAME_API,
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({type: TAG_TYPE, id} as const)),
              {type: TAG_TYPE, id: 'LIST'},
            ]
          : [{type: TAG_TYPE, id: 'LIST'}],
    }),
    addData: builder.mutation<Data, Partial<Data>>({
      query(body) {
        return {
          url: NAME_API,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{type: TAG_TYPE, id: 'LIST'}],
    }),
    getExactData: builder.query<Data, number>({
      query: id => `${NAME_API}/${id}`,
      providesTags: (result, error, id) => [{type: TAG_TYPE, id}],
    }),
    updateData: builder.mutation<Data, Partial<Data>>({
      query(data) {
        const {id, ...body} = data;
        return {
          url: `${NAME_API}/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, {id}) => [{type: TAG_TYPE, id}],
    }),
    deleteData: builder.mutation<{success: boolean; id: number}, number>({
      query(id) {
        return {
          url: `${NAME_API}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{type: TAG_TYPE, id}],
    }),
  }),
});

// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#createapi
export const useGetDataQuery = dataApi.endpoints.getData.useQuery;
export const useAddDataMutation = dataApi.endpoints.addData.useMutation;
export const useGetExactDataQuery = dataApi.endpoints.getExactData.useQuery;
export const useUpdateDataMutation = dataApi.endpoints.updateData.useMutation;
export const useDeleteDataMutation = dataApi.endpoints.deleteData.useMutation;
