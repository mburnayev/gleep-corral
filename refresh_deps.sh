# manually run `nvm use 20`
echo "----- removing old dependencies -----"
rm package-lock.json
rm -rf node_modules
npm cache clean --force
rm -rf .next
echo "----- reinstalling dependencies -----"
npm install