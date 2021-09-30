import { createAction } from '@reduxjs/toolkit';
import { ThemeState } from '@/Store/Theme/ThemeState';

interface PayloadInterface {
  payload: Partial<ThemeState>;
}

export default {
  initialState: {},
  action: createAction<Partial<ThemeState>>('theme/changeTheme'),
  reducers(state: ThemeState, { payload }: PayloadInterface) {
    const { theme, darkMode, ...rest } = state;
    if (typeof payload.theme !== 'undefined') {
      theme = payload.theme;
    }
    if (typeof payload.darkMode !== 'undefined') {
      darkMode = payload.darkMode;
    }
    return { theme, darkMode, ...rest };
  },
};
