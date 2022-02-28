/* eslint-disable import/no-extraneous-dependencies */
import plist from 'plist';
import fs from 'fs';
import { execSync } from 'child_process';

const MAIN_INFO_PLIST_PATH = './ios/ClearSpendMobile/Info.plist';
const IOS_VERSION_PLIST_PATHS = [MAIN_INFO_PLIST_PATH, './ios/ClearSpendMobileTests/Info.plist'];
const ANDROID_BUILD_GRADLE_PATH = './android/app/build.gradle';

const plistData = plist.parse(fs.readFileSync(MAIN_INFO_PLIST_PATH, 'utf8'));

// @ts-ignore
const currentBuildNumber = parseInt(plistData.CFBundleVersion, 10);
const nextBuildNumber = currentBuildNumber + 1;

// @ts-ignore
const marketingVersion = plistData.CFBundleShortVersionString;

console.log(`Last build number: ${currentBuildNumber} | Next build number ${nextBuildNumber}`);

IOS_VERSION_PLIST_PATHS.forEach((plistPath) => {
  const plistData = plist.parse(fs.readFileSync(plistPath, 'utf8'));
  // @ts-ignore
  plistData.CFBundleVersion = nextBuildNumber.toString();
  // Should match xcode plist formatting
  const newPlist = plist.build(plistData, {
    indent: '	', // Tab character
    offset: -1,
    newline: '\n',
  });
  console.log(`Writing ${plistPath}`);
  // Add newline at EOF to match xcode
  fs.writeFileSync(plistPath, newPlist + '\n');
});

console.log(`Writing ${ANDROID_BUILD_GRADLE_PATH}`);

// won't work on macOS unless "" is added after -i
execSync(
  `sed -i "s/versionCode[ ][0-9]*$/versionCode "${nextBuildNumber}"/g" ${ANDROID_BUILD_GRADLE_PATH}`,
);

// Write the build name and number stdout so the pipeline script can pick up the build number
// This will be the second to last line of output when the script is run via yarn
console.log(`${marketingVersion} ${nextBuildNumber}`);
