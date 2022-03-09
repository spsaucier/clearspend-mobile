import { Mixpanel } from 'mixpanel-react-native';
import Config from 'react-native-config';

export const mixpanel = new Mixpanel(Config.MIXPANEL_PROJECT_TOKEN);
