#!/usr/bin/env sh

# https://vitejs.dev/guide/static-deploy.html#github-pages

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

echo > .nojekyll

# git init
git checkout main
git add -A
git commit -m 'deploy'

# deploy to https://oneminch.github.io/tinkers
git push -f git@github.com:oneminch/tinkers.git main:gh-pages

cd -
