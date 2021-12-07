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

**Search style names:**

- Easily search https://tailwindcss.com/docs to find the names of all default Tailwind styles

#### Edit/Customize Tailwind Styles:

- Restart metro and rebuild project

## Fonts

#### Add or modify fonts

- Add (or remove) font files (.ttf or .otf) to the `src/Assets/Fonts` directory
- Run `yarn react-native link` or `npx react-native link`
- Restart metro and rebuild project

#### Card font

- Kredit font is used for the cards: Downloaded from https://fontmeme.com/fonts/kredit-font/

- Space Grotesk font: https://fonts.google.com/specimen/Space+Grotesk

# Testing

TBC

## Snyk tests - Security checks

Test new packages that are added with `snyk test packagename`

# Local Server

## Setup

1. Open terminal in `restserver` directory (`cd restserver`)
2. Install modules with `npm install`

## Run local REST Server
(Assumes the setup steps have been done)

1. Run `node index.js` from the `restserver` directory to start local server. Alternatively run the `yarn restserver` script from the main directory
2. You should see output `REST server listening on port 8000!`
