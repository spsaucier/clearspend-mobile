import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper';
import DefaultTheme from '@/Store/Theme/DefaultTheme';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('startup/init', async (args, { dispatch }) => {
    await dispatch(DefaultTheme.action({ theme: 'default', darkMode: null }));
  }),
  reducers: buildAsyncReducers({ itemKey: null }),
};
