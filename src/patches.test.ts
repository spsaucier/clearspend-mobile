import packageJson from '../package.json';

it('Custom patches should be reviewed when upgrading', () => {
  // Patches the native android add to wallet button to use drawable XMLs for add to google pay over PNGs
  expect(packageJson.dependencies['@stripe/stripe-react-native']).toEqual('^0.8.0');
});
