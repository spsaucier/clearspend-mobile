[![Build status](https://build.appcenter.ms/v0.1/apps/348fdd6b-755a-4285-a825-ac20cb8dffab/branches/main/badge)](https://appcenter.ms)

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

### Set up .env files

The app is built for 3 different environments: DEV, UAT and PROD. 
Each of these variants sources its environment variables from files named `.env.dev`, `.env.uat` and `.env.prod` respectively.

Follow the instructions in `.env.example` to create each of these files, no env files or values should be committed to version control.

Values for different environments can be found in 1Password or App Center.

Each of the different variants has yarn command for each platform:

```
 yarn ios/android -> DEV
 yarn ios-uat/android-uat -> UAT
 yarn ios-prod/android-prod -> PROD 
```
**Important:** The yarn commands set up the correct environment file for each build. Running a build in XCode/Android studio or with `react-native-cli` directly will use variables from the `.env` file. 
This is how the variables are provided during App Center builds.

## Feature Flags

See [Feature Flags Document](./docs/feature_flags.md)

## Build Process

See [Build Process Document](./docs/build_process.md)

## Setup Issues

M1 Macs:

- If the pod install fails due to ruby-related issues, might using a rosetta terminal and installing ffi solve the problem: https://dev.to/javascriptcentric/setup-react-native-and-run-app-on-mac-m1-32kk
- Android:
  - To launch emulator, must be using Studio Artic Fox (2020.3) which has Apple Silicon support (21/10/2021, https://stackoverflow.com/a/65176867)
  - Emulator appearing offline on M1 Mac after the last update of arm64-v8a (https://stackoverflow.com/a/67261231/1118721)
  - Failed to create sdcard in the AVD folder.
    - Go to AVD > Show advanced settings > Memory and Storage > No SD Card

# Styling

## Tailwind

This project uses tailwind-react-native-classnames for styling: https://github.com/jaredh159/tailwind-react-native-classnames/tree/master#readme

**Search style names:**

- Easily search https://tailwindcss.com/docs to find the names of all default Tailwind styles

#### Edit/Customize Tailwind Styles:

- Restart metro and rebuild project

#### Fonts

- Fonts are located in the src/assets/fonts directory and linked in tailwind.config.js
- Use custom fonts with e.g. 'font-montreal' or 'font-telegraf'
- Set weight with e.g. 'font-bold'

# Testing

## Unit testing
- Jest
- React Native Testing Library
- MSW for mocking requests

See `@Helpers/testing` for custom test helpers

## Integration/Device testing
- TBC

## Snyk tests - Security checks

Test new packages that are added with `snyk test packagename`

# Backend types mapping

## Generate a new capital.ts file

1. Terminal > `yarn generate`

# Local Server

## Setup

1. Open terminal in `restserver` directory (`cd restserver`)
2. Install modules with `yarn install`

## Run local REST Server

(Assumes the setup steps have been done)

1. Run the `yarn restserver` script from the main directory. Alternately, run `node index.js` from the `restserver` directory to start local server.
2. You should see output `REST server listening on port 8000!`
3. `yarn restserver` runs the server with `nodemon` so changes made in the `restserver` directory should cause the server to restart and reflect the changes.
