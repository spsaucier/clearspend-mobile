import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mixpanel } from '../../Services/utils/analytics';

export interface Session {
  userId?: string;
  accessToken?: string;
  expiresAt?: string;
  refreshToken?: string;
}

const initialSessionState = {
  userId: undefined,
  accessToken: undefined,
  expiresAt: undefined,
  refreshToken: undefined,
} as Session;

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    updateSession(state, action: PayloadAction<Session>) {
      const { accessToken, expiresAt, refreshToken, userId } = action.payload;
      mixpanel.identify(userId || '');
      return {
        ...state,
        accessToken,
        expiresAt,
        refreshToken,
        userId,
      };
    },
    killSession: () => initialSessionState,
  },
});

export const { updateSession, killSession } = sessionSlice.actions;
export default sessionSlice.reducer;
