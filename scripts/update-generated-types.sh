#!/bin/bash

# Update generated types
# Commit the output if the pipeline passes

yarn generate

if git diff-index --quiet HEAD --; then
  echo "No changes after updating types, exiting"
  exit 0
else
  echo "Changes to capital.ts detected, running checks"
  yarn verify || exit 1
  git pull origin "$BITBUCKET_BRANCH"
  git commit -m "[skip ci] Update capital.ts generated types"
  git push origin "$BITBUCKET_BRANCH"
fi
