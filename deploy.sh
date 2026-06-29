#!/bin/bash

# PRODUCTION
git reset --hard
git checkout master
git pull origin master

npm i yarn -g
pnpm global add serve
pnpm 
pnpm  run build
pm2 start "pnpm  run start:prod" --name=MONITO-REACT