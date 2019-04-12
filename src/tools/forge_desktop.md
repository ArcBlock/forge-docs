# Forge Desktop

Also known as **ABT Chain Node**, is a non-developer friendly application that can start/manage a forge node.

Forge desktop manages node start/stop automatically, currently we have 2 builds for forge desktop, then both share the same set of features.

## Clean Build

Uses forge framework v0.22.3, just download and install, everything should work out of the box, links here:

- Darwin: [http://arcblock.oss-cn-beijing.aliyuncs.com/forge/0.7.0/ABTChainNode-0.7.0.dmg](http://arcblock.oss-cn-beijing.aliyuncs.com/forge/0.7.0/ABTChainNode-0.7.0.dmg)
- Ubuntu: [https://arcblock.oss-cn-beijing.aliyuncs.com/forge/0.7.0/ABTChainNode_0.7.0_amd64.deb](https://arcblock.oss-cn-beijing.aliyuncs.com/forge/0.7.0/ABTChainNode_0.7.0_amd64.deb)

## Nightly Build

Uses forge framework v0.22.4 which requires a data compress lib that must be installed before install forge desktop:

```shell
brew install zstd
```

Once we have `zstd` installed, feel free to download/install and try!

- Darwin: [https://arcblock.oss-cn-beijing.aliyuncs.com/forge/0.6.0/ABTChainNode-0.6.0.dmg](https://arcblock.oss-cn-beijing.aliyuncs.com/forge/0.6.0/ABTChainNode-0.6.0.dmg)
- Ubuntu: [https://arcblock.oss-cn-beijing.aliyuncs.com/forge/0.6.0/ABTChainNode_0.6.0_amd64.deb](https://arcblock.oss-cn-beijing.aliyuncs.com/forge/0.6.0/ABTChainNode_0.6.0_amd64.deb)

## Features

### Join a network

From application menu, select "Join Another Network", then follow instructions to complete.

### Reset chain state

From application menu, select "Reset Chain State", then follow instructions to complete.
