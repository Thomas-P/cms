#!/usr/bin/env sh
npx openapi-generator-cli generate \
  -i ./.contracts/editor.yaml \
  -g typescript-angular \
  -o ./projects/editor/data/src/lib/generated
