import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper'
import FetchOne from '@/Store/User/FetchOne'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import DefaultTheme from '@/Store/Theme/DefaultTheme'

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('startup/init', async (args, { dispatch }) => {
    // Timeout to fake waiting some process. Use to display splash or fancy loading
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Load the connected user etc.
    await dispatch(FetchOne.action('1'))
    await dispatch(DefaultTheme.action({ theme: 'default', darkMode: null }))

    // Navigate and reset to the main navigator
    navigateAndSimpleReset('Main')
  }),
  reducers: buildAsyncReducers({ itemKey: null }),
}
