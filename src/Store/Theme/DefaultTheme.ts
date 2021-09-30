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
      return { theme: payload.theme, darkMode: payload.darkMode, ...rest };
    }
    return { theme, darkMode, ...rest };
  },
};
