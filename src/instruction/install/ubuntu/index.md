# How to Install Forge on Ubuntu

The following sections will show you how to install the Forge on a machine running Ubuntu (or a containerized environment running Ubuntu).

## Prerequisites

* Ubuntu 16.04 (or later)

## Step 1: Create a Sudo User

If you don't already have a sudo user, create one. In this tutorial, the user will be called **arcblock**, but you can use any name you'd like.

```shell
adduser arcblock
```

Add the user to the sudo group and remove its password:

```shell
usermod -aG sudo arcblock
sudo passwd -d arcblock
```

Finally, use **visudo** so that you're never prompted for a password from this user:

```shell
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL
```

Your new **arcblock** sudo user is ready and should be used to SSH to the host and install assets whenever necessary. If you've previously used the root account, you can switch to using the sudo user as follows:

```shell
cat ~/.ssh/id_rsa.pub | ssh root@host "mkdir -p ~arcblock/.ssh && touch ~arcblock/.ssh/authorized_keys && chown -R arcblock ~arcblock/.ssh && chmod -R go= ~arcblock/.ssh && cat >> ~/.ssh/authorized_keys"
```

## Step 2: Install Node.js

The Forge CLI requires Node.js, so we recommend installing the [latest distribution](https://github.com/nodesource/distributions/blob/master/README.md):

```shell
sudo apt-get update
sudo apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```

You can verify the version of Node.js you've installed by running `node -v`.

### Install Yarn

While Node.js ships with the **npm** package manager, we recommend that you install the **yarn** package manager as well:

```shell
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
```

## Step 3: Install OpenSSL

While OpenSSL ships with Ubuntu, the version included may not be sufficiently up-to-date. Update OpenSSL as follows:

```shell
cd /tmp
wget https://www.openssl.org/source/openssl-1.1.1.tar.gz
tar xvf openssl-1.1.1.tar.gz
cd openssl-1.1.1
./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)'
make
sudo make install
```

Add the OpenSSL path to your `$PATH` variable:

```shell
sudo vim /etc/environment
```

You'll also need to append `/usr/local/ssl/bin` to `/usr/local/bin`:

```shell
PATH="/usr/local/sbin:/usr/local/bin:/usr/local/ssl/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
```

At this point, you'll need to logout and login for the changes you've made to take affect. After doing so, you can check your OpenSSL configuration:

```shell
$ openssl version
OpenSSL 1.1.1  11 Sep 2018
```

## Step 4: Install Erlang crypto (Optional)

If you are using Ubuntu 16.04, you'll need to install Erlang [crypto](http://erlang.org/doc/man/crypto_app.html) so that the Erlang releases work with OpenSSL:

```shell
sudo apt-get install -y erlang-crypto
```

## Step 5: Install the Forge CLI

Using Yarn, install the Forge CLI:

```shell
sudo yarn global add @arcblock/forge-cli
```

### Add a Non-Privileged User

We don't recommend running Forge using a sudo user, so create a new non-Privileged user (in this case, we'll call it **forge**) and remove its password:

```shell
sudo adduser forge
sudo passwd -d forge
```

Switch to this user and initialize Forge:

```shell
sudo su forge
cd ~
forge init
```

## Step 6: Start Forge

At this point, you're ready to start and run Forge by creating a new chain:

```shell
forge chain:create [chain_name]
```

You'll need to provide responses to the provided prompts (you can simple press **Enter** to bypass the prompts).

Once done, you can start the chain with:

```shell
forge chain:create [chain_name]
```

You can check its status at any time:

```shell
forge status
```

You can also use the following command to open Forge Web so that you can work with your chain using the interactive web interface:

```shell
forge start [chain_name]
```
