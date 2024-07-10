#!/bin/bash

./scripts/fresh-build.sh

# Run the project
echo "run project"
node dist/src/main.js
