#!/bin/bash
# remove dist
echo "removing dist"
rm -rf ./dist

# transpile to js
echo "transpiling"
npx tsc --project ./tsconfig.json

# fix extensions
echo "fixing extensions"
node ./scripts/fixExtensions.js