#!/bin/bash

./scripts/fresh-build.sh

# Run the tests
echo "running tests"
node --test ./dist/
