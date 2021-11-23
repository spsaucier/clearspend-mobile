import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper';
import DefaultTheme from '@/Store/Theme/DefaultTheme';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('startup/init', async (args, { dispatch }) => {
    // Timeout to fake waiting some process. Use to display splash or fancy loading
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await dispatch(DefaultTheme.action({ theme: 'default', darkMode: null }));
  }),
  reducers: buildAsyncReducers({ itemKey: null }),
};
