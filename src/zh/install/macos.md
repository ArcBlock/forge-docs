# 在MacOS上安装Forge



全新centos机器缺少几个Forge所需的依赖。如果您在MacOS下运行Forge时遇到问题，请往下读。





## 基础设置



1. 设置编译基础设施



```bash

$ xcode-select --install

```



2. 安装[Homebrew](https://brew.sh/)



```bash

$ /usr/bin/ruby -e &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)&quot;

```



如果您的Mac上已经安装了`Homebrew`，可以运行`brew update`升级您的Homebrew。



3. 安装必要的系统包

```bash

brew install automake libtool pkg-config libffi gmp openssl

```



## 安装Node.js



```bash

brew install node

```



为了确保您正确地安装了Node，请在终端输入`node -v`。您应该可以看到：

```bash

$ node -v

v10.5.0

```



为了确保您正确地安装了NPM，请在终端输入`npm -v`。您应该可以看到：

```bash

$ npm -v

6.1.0

```



您也可以运行`brew upgrade node`升级您的`Node`和`npm`



## 安装Forge CLI



```bash

$ npm install -g @arcblock/forge-cli

```

在您的电脑上安装forge可能需要一些时间



## 运行Forge



安装forge后，您可以试着运行它。



### 启动Forge



首先，运行`forge init`，初始化您主目录下的`.forge_cli`文件夹和`.forge_release`文件夹。所有的forge数据都存储在`.forge_release`下，可在之后进行配置。

```bash

$ cd ~

$ forge init

```



### 启动Forge



然后运行`forge start`以启动forge。



```bash

$ forge start

✔ Forge daemon successfully started

┌───────────────┬──────────┬───────────────┬───────────────┬────────────────────┐

│ Name │ PID │ Uptime │ Memory │ CPU │

├───────────────┼──────────┼───────────────┼───────────────┼────────────────────┤

│ starter │ 4104 │ 16.1s │ 61.6 MB │ 0.00 % │

│ forge │ 4357 │ 12.7s │ 433 MB │ 0.00 % │

│ ipfs │ 4670 │ 6.7s │ 27.1 MB │ 0.00 % │

│ tendermint │ 4677 │ 6.6s │ 22.6 MB │ 0.00 % │

└───────────────┴──────────┴───────────────┴───────────────┴────────────────────┘



ℹ If you want to access interactive console, please run /home/forge/.forge\_cli/release/forge/0.18.6/bin/forge remote\_console

forge@forge-cli:~$ forge status

──────────────

✔ Chain Info

──────────────

{

id: &#39;99cd4f098ed96c5d3ae1391a2858ab4fbf3db799&#39;,

network: &#39;forge&#39;,

moniker: &#39;forge&#39;,

consensusVersion: &#39;0.30.2&#39;,

synced: true,

appHash: &#39;bc40d2b84429b70564bf1aa51aefa956b636674b78d6511851d5a2721e151cb3&#39;,

blockHash: &#39;d9ddd9d5873a155be66aa553574a7b53a7f9154713875ebf7e4dfca4cd526798&#39;,

blockHeight: 2,

blockTime: &#39;2019-03-16T17:52:32.000Z&#39;,

address: &#39;zystc5rNpeE462e3DokUC4nR7PUsrL5zM38J&#39;,

votingPower: 10,

totalTxs: 0,

version: &#39;0.18.6&#39;,

dataVersion: &#39;1.4&#39;,

forgeAppsVersion: {},

supportedTxs: [

&#39;fg:t:update\_asset&#39;,

&#39;fg:t:transfer&#39;,

&#39;fg:t:sys\_upgrade&#39;,

&#39;fg:t:stake&#39;,

&#39;fg:t:exchange&#39;,

&#39;fg:t:declare\_file&#39;,

&#39;fg:t:declare&#39;,

&#39;fg:t:consensus\_upgrade&#39;,

&#39;fg:t:create\_asset&#39;,

&#39;fg:t:consume\_asset&#39;,

&#39;fg:t:poke&#39;,

&#39;fg:t:account\_migrate&#39;

]

}



──────────────

✔ Forge State

──────────────

{

address: &#39;forge\_state&#39;,

consensus: {

maxBytes: 150000,

maxGas: -1,

maxValidators: 64,

maxCandidates: 256,

pubKeyTypes: [

&#39;ed25519&#39;

],

validators: [

{

address: &#39;zystc5rNpeE462e3DokUC4nR7PUsrL5zM38J&#39;,

power: 10

}

],

validatorChanged: false,

paramChanged: false

},

tasks: {},

stakeSummary: {},

version: &#39;0.18.6&#39;,

dataVersion: &#39;1.4&#39;,

forgeAppHash: &#39;&#39;,

token: {

name: &#39;ArcBlock&#39;,

symbol: &#39;ABT&#39;,

unit: &#39;arc&#39;,

description: &#39;Forge token ABT&#39;,

decimal: 16,

initialSupply: 93000000,

totalSupply: 186000000,

inflationRate: 0

}

}



──────────────

✔ Net Info

──────────────

{

listening: true,

listeners: [

&#39;Listener(@)&#39;

],

nPeers: 0,

peers: []

}



──────────────

✔ Validators Info

──────────────

{

blockHeight: 3,

validators: [

{

address: &#39;766D728A8CD7204FF7631912B963B8AE860D6DF6&#39;,

votingPower: 10,

proposerPriority: &#39;0&#39;,

name: &#39;&#39;

}

]

}



──────────────

✔ Forge Web

──────────────

ℹ forge web started at: http://localhost:8210

ℹ graphql endpoint at: http://localhost:8210/api

ℹ graphql playground at: http://localhost:8210/api/playground

```



### 休息一下，享受成果吧！
