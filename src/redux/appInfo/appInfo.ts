import {createSlice} from '@reduxjs/toolkit';
import {userApi} from '../user/user';

const initialState = {
  token: null,
} as {token: string | null};

const slice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token;
      },
    );
  },
});

export const {logout} = slice.actions;
export default slice.reducer;
