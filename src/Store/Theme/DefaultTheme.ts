import { createAction } from '@reduxjs/toolkit';
import { ThemeState } from './ThemeState';

interface PayloadInterface {
  payload: ThemeState;
}
export default {
  initialState: {},
  action: createAction<ThemeState>('theme/setDefaultTheme'),
  reducers(state: ThemeState, { payload }: PayloadInterface) {
    const { theme, darkMode, ...rest } = state;
    if (!state.theme) {
      theme = payload.theme;
      darkMode = payload.darkMode;
    }
    return { theme, darkMode, ...rest };
  },
};
