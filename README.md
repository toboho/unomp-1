## #关于
```
Modify the theme style
原版来自 https://github.com/UNOMP/unified-node-open-mining-portal
```
-------
## #安装
```
sudo apt-get update
sudo apt-get install build-essential libssl-dev npm nodejs nodejs-legacy redis-server curl git
curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh
source ~/.profile
nvm install 0.10.48
nvm use 0.10.48
nvm alias default 0.10.48
nvm use default
git clone https://github.com/rice-mouse/unomp.git unomp
cd unomp
npm update

node init.js

如果端口端口 <1024 请用sudo node init.js
```
-------
## #永久开启矿池方法，安装forever
```
sudo npm install forever -g
sudo forever start init.js 开启矿池
sudo forever stop init.js  关闭矿池
```  
-------
## #设置Swap交换分区大小
```
查看系统内 Swap 分区大小
free -m
	
创建一个 Swap 文件，这里设置的是4G大小即 count=？，一般设置内存的1-1.5倍
sudo dd if=/dev/zero of=/mnt/swap bs=1M count=4000
	
把生成的文件转换成 Swap 文件
sudo mkswap /mnt/swap
	
把生成的swap 文件加入到系统中
sudo swapon /mnt/swap
	
卸载Swap
sudo swapoff /mnt/swap

添加配置，重启系统，自动激活
输入
sudo nano /etc/fstab

在最后一行加入下面
/mnt/swap none swap sw 0 0
	
Ctrl+o 保存
Ctrl+x 退出
```
-------
### #算法
```
✓ SHA256 (Bitcoin, Peercoin/PPCoin, Terracoin, etc..)(I've gotten reports Freicoin is not working)
✓ Scrypt (Litecoin, Dogecoin, Feathercoin, etc..)
✓ Scrypt-Jane (YaCoin, CopperBars, Pennies, Tickets, etc..)
✓ Scrypt-N (Vertcoin [VTC])
✓ Quark (Quarkcoin [QRK])
✓ X11 (Darkcoin [DRK], Hirocoin, Limecoin)
✓ X13 (MaruCoin, BoostCoin)
✓ NIST5 (Talkcoin)
✓ Keccak (Maxcoin [MAX], HelixCoin, CryptoMeth, Galleon, 365coin, Slothcoin, BitcointalkCoin)
✓ Skein (Skeincoin [SKC])
✓ Groestl (Groestlcoin [GRS])
```
