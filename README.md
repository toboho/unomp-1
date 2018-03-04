## unified-node-open-mining-portal
Modify the theme style

-------
## #Install
```
sudo apt-get update
sudo apt-get install build-essential libssl-dev npm nodejs nodejs-legacy
curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh
source ~/.profile
nvm install 0.10.25
nvm use 0.10.25
git clone https://github.com/rice-mouse/unified-node-open-mining-portal.git unomp
cd unomp
npm update

node init.js
```
-------

## #永久开启矿池方法，安装forever
```
sudo npm install forever -g
sudo forever start init.js 开启矿池
sudo forever stop init.js  关闭矿池
```  
