#!/bin/bash

# Script to kick off the nightly build
# - bump build numbers
# - tag build
# - merge branches
# - generate changelog and post to slack
# - todo update ticket status as well

# Pre checks - must be run on main and must have new changes between main and dev
if [ "$BITBUCKET_BRANCH" != 'main' ]; then echo "This pipeline must be run on main branch" && exit 1; fi
git fetch --unshallow
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin
git diff --quiet origin/main..origin/builds/dev ':!src/generated/capital.ts' && echo "No changes between main and dev, exiting" && exit 0 || echo "New changes in main not present in dev"

# Install deps
yarn
apt-get update
apt-get install -y jq

# Bump build numbers and assign outputs
echo "Bumping build numbers"
bump_build_output=$(yarn bump-build-number | tail -2 | head -1)
read -r -a build_details <<<"$bump_build_output"
export MARKETING_VERSION="${build_details[0]}"
export BUILD_NUMBER="${build_details[1]}"
# Commit and tag the version bump
PREV_BUILD_TAG="$(git describe --tags --abbrev=0)"
NEXT_BUILD_TAG="release/${MARKETING_VERSION}/build/${BUILD_NUMBER}"
MERGE_COMMIT_MSG="Release ${MARKETING_VERSION} (Build ${BUILD_NUMBER})"

git pull
git commit -am "[skip ci] Bump to Version ${MARKETING_VERSION} (Build ${BUILD_NUMBER})"
git tag "$NEXT_BUILD_TAG"

# Merge and push branches and tags
git push origin main
git push origin "release/${MARKETING_VERSION}/build/${BUILD_NUMBER}"

# main -> builds/saucelabs-ios
git checkout --track origin/builds/saucelabs-ios
git merge -X theirs main -m "$MERGE_COMMIT_MSG"

# main -> builds/dev
git checkout --track origin/builds/dev
git merge -X theirs main -m "$MERGE_COMMIT_MSG"
# builds/dev -> builds/uat
git checkout --track origin/builds/uat
git merge -X theirs builds/dev -m "$MERGE_COMMIT_MSG"
# builds/uat -> builds/release
git checkout --track origin/builds/release
git merge -X theirs builds/uat -m "$MERGE_COMMIT_MSG"

git push origin builds/saucelabs-ios
git push origin builds/dev
git push origin builds/uat
git push origin builds/release

echo "Generating Changelog"
./node_modules/.bin/jira-changelog --range "$PREV_BUILD_TAG..$NEXT_BUILD_TAG" > changelog.txt

# Setup messages
fallback_message="Fallback placeholder message"
markdown_message=$(<changelog.txt)

# Convert markdown message to correct format for jq parse
printf -v markdown_message_unescaped %b "$markdown_message"

# Create the json string
slack_json=$(jq -nr \
  --arg jq_fallback_message "$fallback_message" \
  --arg jq_section_type "section" \
  --arg jq_markdown_type "mrkdwn" \
  --arg jq_markdown_message "$markdown_message_unescaped" \
  '{
        text: $jq_fallback_message,
        blocks: [
            {
                type: $jq_section_type,
                text: {
                    type: $jq_markdown_type,
                    text: $jq_markdown_message
                }
            }
        ]
    }')

# Echo and send to slack
echo "Posting slack message"
echo "$slack_json"
curl -X POST -H 'Content-type: application/json' --data "$slack_json" "$CHANGELOG_SLACK_WEBHOOK"

echo "Done 🚀"
