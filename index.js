/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from '@/App';
import { name as appName } from './app.json';
import 'intl';
import 'intl/locale-data/jsonp/en';

AppRegistry.registerComponent(appName, () => App);
