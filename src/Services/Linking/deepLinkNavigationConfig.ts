import { LinkingOptions } from '@react-navigation/native';

import { MainScreens, TopScreens, TabScreens } from '@/Navigators/NavigatorTypes';
import { WalletScreens } from '@/Navigators/Wallet/WalletNavigatorTypes';

export const linkingConfig = ({
  getInitialURL,
  subscribe,
}: Pick<
  LinkingOptions<ReactNavigation.RootParamList>,
  'getInitialURL' | 'subscribe'
>): LinkingOptions<ReactNavigation.RootParamList> => ({
  prefixes: [
    'clearspend://',
    //  'https://clearspend.com' // TODO: support web links
  ],
  // Custom function to get the URL which was used to open the app
  getInitialURL,
  // Custom function to subscribe to incoming links
  subscribe,
  // Deep link configuration
  config: {
    screens: {
      [TopScreens.Main]: {
        screens: {
          [MainScreens.Tabs]: {
            screens: {
              [TabScreens.Wallet]: {
                screens: {
                  [WalletScreens.TransactionDetails]: {
                    path: 'transaction/:transactionId',
                    exact: true,
                  },
                },
              },
            },
          },
        },
      },
      // NotFound: '*', // TODO implement not found screen
    },
  },
});
