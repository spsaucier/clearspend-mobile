# Setup

Follow general React Native setup: (React Native CLI Quickstart): https://reactnative.dev/docs/environment-setup

- Install Homebrew

- Install node: `brew install node`

- Install watchman: `brew install watchman`

- Install Xcode and Xcode Command Line Tools

- Install cocoapods: `sudo gem install cocoapods`

- Install modules: `yarn install`

- Install pods: `yarn podinstall` (Defined in package.json)

- Start the metro bundler, in a dedicated terminal `yarn start`

- Run the iOS app (remember to start a simulator or connect a device): `yarn ios`

- Run the Android app (remember to start a simulator or connect a device): `yarn android`

## Setup Issues

#### TBC

# Styling

### Tailwind

This project uses tailwind-react-native-classnames for styling: https://github.com/jaredh159/tailwind-react-native-classnames/tree/master#readme

When ready, we will move over to the V2 version: https://github.com/jaredh159/tailwind-react-native-classnames/tree/v2#api

**Search style names:**

- Easily search https://tailwindcss.com/docs to find the names of all default Tailwind styles

#### Edit/Customize Tailwind Styles:

- Edit tailwind.config.js to customize tailwind. Override styles or extend styles here.
- Then run `npx trnc-create-styles`
  - This command will create a `tw-rn-styles.json` file in the root of your project dir.
  - This file contains the info the package needs to generate customized react-native styles.
  - It should be checked in to source control, and regenerated whenever you change your `tailwind.config.js` file

#### Fonts

##### Add or modify fonts

- Add (or remove) font files (.ttf or .otf) to the `src/Assets/Fonts` directory
- Run `yarn react-native link` or `npx react-native link`
- Add/modify `tailwind.config.js` with the font changes & run `npx trnc-create-styles`
- Restart metro and rebuild project

### Snyk tests - Security checks

Test new packages that are added with `snyk test packagename`
