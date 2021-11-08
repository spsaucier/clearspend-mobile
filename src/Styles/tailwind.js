import { create } from 'twrnc';

// this function works just like the default package export
// except it is customized according to your `tailwind.config.js`
const tw = create(require('../../tailwind.config'));

export default tw;
