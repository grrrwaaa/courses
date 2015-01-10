#! /usr/bin/env bash
# echo hello $1

#./make.js

echo Updating site
cd _site
git pull
git add *
git status
git commit -a -m 'site update'
git push
git status
echo Updating master
cd ..
git pull
git commit -a -m 'site update'
git status
git push
git status