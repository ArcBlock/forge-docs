# 在Ubuntu安装Forge

全新ubuntu机器缺少几个Forge所需的依赖。如果您在Ubuntu上运行Forge时遇到问题，请往下读。本指南通过了在每月5美元的Digital Ocean机器上对ubuntu 16.04和18.04的测试。

::: 警告

我们不建议您在Ubuntu 14.04或更低版本上运行Forge。本指南可能不适用于Ubuntu 14.04（至少您无法在该版本上安装nodejs \&gt;10）。

:::

## 设置用户

首先，我们创建一个sudo用户。有的云提供商（如digital ocean）提供的是带root用户的ubuntu，因此我们需要将其禁用。如果您已经是sudo用户，可以跳过此步骤。

创建一个名为`arcblock`的用户，您可选择其他用户名：

```bash

adduser arcblock

```

然后将用户添加至sudo用户组并删除密码：

```bash

usermod -aG sudo arcblock

sudo passwd -d arcblock

```

然后，您可以进行`visudo`，这样sudo用户便不需要密码：

```

%sudo ALL=(ALL:ALL) NOPASSWD:ALL

```

::: 建议

如果您更熟悉vim，`update-alternatives --config editor`可以修改默认编辑器。

:::

从现在起，我们可以将用户交换为此sudo用户。

::: 建议

如果您之前通过root账户ssh至主机，又想在最新创建的`arcblock`账户进行ssh，您可运行以下命令：

```bash

cat ~/.ssh/id\_rsa.pub | ssh root@host &quot;mkdir -p ~arcblock/.ssh &amp;&amp; touch ~arcblock/.ssh/authorized\_keys &amp;&amp; chown -R arcblock ~arcblock/.ssh &amp;&amp; chmod -R go= ~arcblock/.ssh &amp;&amp; cat \&gt;\&gt; ~/.ssh/authorized\_keys&quot;

```

:::

## 安装nodejs 10/11

Forge CLI需要nodejs运行时间，所以我们应该安装最新的10.x或11.x节点。如果是ubuntu，请参考以下指南：[NodeSource Node.js Binary Distributions](https://github.com/nodesource/distributions/blob/master/README.md).

基本来说，您需要：

```bash

sudo apt-get update

sudo apt-get install -y build-essential

curl -sL https://deb.nodesource.com/setup\_11.x | sudo -E bash -

sudo apt-get install -y nodejs

```

如果您想安装nodejs 10，仅需将`setup_11.x`替换为`setup_10.x`。

完成后，请检查nodejs版本是否为理想版本：

```bash

$ node -v

v11.12.0

```

尽管nodejs提供npm，但我们强烈推荐您安装yarn：

```bash

curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo &quot;deb https://dl.yarnpkg.com/debian/ stable main&quot; | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update &amp;&amp; sudo apt-get install -y yarn

```

## 安装最新的openssl

ubuntu 16.04搭配的openssl版本太老，我们应按照更新版本：

```bash

cd /tmp

wget https://www.openssl.org/source/openssl-1.1.1.tar.gz

tar xvf openssl-1.1.1.tar.gz

cd openssl-1.1.1

./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)'

make

sudo make install

```

然后，您需要将openssl路径放入您的`$PATH`：

```

sudo vim /etc/environment

```

在`/usr/local/bin`之后添加`/usr/local/ssl/bin`：

```

PATH=&quot;/usr/local/sbin:/usr/local/bin:/usr/local/ssl/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games&quot;

```

现在，登出后再次登录，以激活`$PATH`修改。查看您的openssl版本：

```bash

$ openssl version

OpenSSL 1.1.1 11 Sep 2018

```

### 安装erlang crypto（可选）

在ubuntu 16.04，您需要安装erlang crypto，确保erlang版本可和您安装的openssl一起使用：

```bash

sudo apt-get install -y erlang-crypto

```

::: 警告

如果错过这一步，Forge版本会崩溃，且会出现以下错误信息：

\&gt; libcrypto.so.1.1: cannot open shared object file: No such file or directory

:::

## 安装Forge CLI

让我们使用yarn安装forge cli。请注意，我们进行全球安装，以便不同用户使用。


```bash

sudo yarn global add @arcblock/forge-cli

```

## 添加非特权用户并安装Forge

我们不推荐您在sudo用户上运行forge。所以，让我们创建一个新用户：

```bash

sudo adduser forge

```

然后删除其密码：

```bash

sudo passwd -d forge

```

sudo用户`arcblock`仅应被用于ssh以安装软件，而普通用户`forge`仅应被用于运行forge。

让我们向用户`sudo su forge`sudo，然后初始化forge：

```bash

cd ~

forge init

```

正如我们在[简介](../intro)中讨论的那样，这将创建`.forge_cli`文件夹，并将forge assets放入其中。在默认设置中，它会将forge数据存储在`.forge_release`下，您可按需修改此设置

然后，您便可以运行`forge start`了。您可以通过`forge status`查看forge状态：

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

id: '99cd4f098ed96c5d3ae1391a2858ab4fbf3db799',

network: 'forge',

moniker: 'forge',

consensusVersion: '0.30.2',

synced: true,

appHash: 'bc40d2b84429b70564bf1aa51aefa956b636674b78d6511851d5a2721e151cb3',

blockHash: 'd9ddd9d5873a155be66aa553574a7b53a7f9154713875ebf7e4dfca4cd526798',

blockHeight: 2,

blockTime: '2019-03-16T17:52:32.000Z',

address: 'zystc5rNpeE462e3DokUC4nR7PUsrL5zM38J',

votingPower: 10,

totalTxs: 0,

version: '0.18.6',

dataVersion: '1.4',

forgeAppsVersion: {},

supportedTxs: [

'fg:t:update\_asset',

'fg:t:transfer',

'fg:t:sys\_upgrade',

'fg:t:stake',

'fg:t:exchange',

'fg:t:declare\_file',

'fg:t:declare',

'fg:t:consensus\_upgrade',

'fg:t:create\_asset',

'fg:t:consume\_asset',

'fg:t:poke',

'fg:t:account\_migrate'

]

}



──────────────

✔ Forge State

──────────────

{

address: 'forge\_state',

consensus: {

maxBytes: 150000,

maxGas: -1,

maxValidators: 64,

maxCandidates: 256,

pubKeyTypes: [

'ed25519'

],

validators: [

{

address: 'zystc5rNpeE462e3DokUC4nR7PUsrL5zM38J',

power: 10

}

],

validatorChanged: false,

paramChanged: false

},

tasks: {},

stakeSummary: {},

version: '0.18.6',

dataVersion: '1.4',

forgeAppHash: '',

token: {

name: 'ArcBlock',

symbol: 'ABT',

unit: 'arc',

description: 'Forge token ABT',

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

'Listener(@)'

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

address: '766D728A8CD7204FF7631912B963B8AE860D6DF6',

votingPower: 10,

proposerPriority: '0',

name: ''

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

享受成果吧！
