import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mixpanel } from '../../Services/utils/analytics';

export interface Session {
  userId?: string;
  accessToken?: string;
  expiresAt?: string;
  refreshToken?: string;
  twoFactor?: {
    methods?: {
      id: string;
      lastUsed: boolean;
      method: 'sms' | 'email' | 'authenticator';
      mobilePhone?: string;
      email?: string;
    }[];
  };
}

const initialSessionState = {
  userId: undefined,
  accessToken: undefined,
  expiresAt: undefined,
  refreshToken: undefined,
  twoFactor: undefined,
} as Session;

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    updateSession(state, action: PayloadAction<Session>) {
      const { accessToken, expiresAt, refreshToken, userId, twoFactor } = action.payload;
      mixpanel.identify(userId || '');
      return {
        ...state,
        accessToken,
        expiresAt,
        refreshToken,
        userId,
        twoFactor,
      };
    },
    remove2FA({ twoFactor, ...rest }) {
      return { ...rest };
    },
    killSession: () => initialSessionState,
  },
});

export const { updateSession, remove2FA, killSession } = sessionSlice.actions;
export default sessionSlice.reducer;
