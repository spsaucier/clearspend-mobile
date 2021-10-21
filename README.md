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

  - Alternatively, open the workspace in Xcode and build & run the app from there

- Run the Android app (remember to start a simulator or connect a device): `yarn android`

## Setup Issues

M1 Macs:

- If the pod install fails due to ruby-related issues, might using a rosetta terminal and installing ffi solve the problem: https://dev.to/javascriptcentric/setup-react-native-and-run-app-on-mac-m1-32kk
- Android:

  - To launch emulator, must be using Studio Artic Fox (2020.3) which has Apple Silicon support (21/10/2021, https://stackoverflow.com/a/65176867)

  - Emulator appearing offline on M1 Mac after the last update of arm64-v8a (https://stackoverflow.com/a/67261231/1118721)

  - Failed to create sdcard in the AVD folder.
    - Go to AVD > Show advanced settings > Memory and Storage > No SD Card

#### TBC

# Styling

## Tailwind

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

## Fonts

#### Add or modify fonts

- Add (or remove) font files (.ttf or .otf) to the `src/Assets/Fonts` directory
- Run `yarn react-native link` or `npx react-native link`
- Add/modify `tailwind.config.js` with the font changes & run `npx trnc-create-styles`
- Restart metro and rebuild project

#### Card font

- Kredit font is used for the cards: Downloaded from https://fontmeme.com/fonts/kredit-font/

# Testing

TBC

## Snyk tests - Security checks

Test new packages that are added with `snyk test packagename`

# Apollo Server

## Run local Apollo Server

1. Open terminal in `apolloserver` directory
2. Install modules `npm install`
3. Run `node index.js` from the `apolloserver` directory to start local server. Alternatively run the `yarn localserver` script from the main directory
4. You should see output `Server ready at http://localhost:4000/`
5. Follow the link to open the web server instance which will take you to https://studio.apollographql.com/sandbox/explorer. Here you can make test queries.
