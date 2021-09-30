import { create } from 'tailwind-react-native-classnames';
import styles from '../../tw-rn-styles.json';

// this function works just like the default package export
// except it is customized according to your `tailwind.config.js`
const tw = create(styles);

export default tw;
