---
title: '用 Docker 来运行 Forge'
description: '用 Docker 来运行 Forge'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'install'
  - 'docker'
---

## Fast Start

No matter which OS you are using, you have to install [Docker client](https://www.docker.com/products/docker-desktop)

And then get forge image.

```shell
docker pull arcblock/forge-release
docker run -p 8210:8210 --rm forge-release
```

wait some time. and you can visit [http://localhost:8210/dashboard](http://localhost:8210/dashboard) to explore your own chain.

## Advanced Usage

### choose forge version

```shell
docker pull arcblock/forge-release:v0.22.1
docker run -p 8210:8210 --rm forge-release:v0.22.1
```

you can get forge versions at [Docker Hub](https://hub.docker.com/r/arcblock/forge)

### save your data in your disk

```shell
docker run -p 8210:8210 -v {your local disk}:/home/arcblock/.forge_release/ --rm forge-release:latest
```

and you can find your data in your local disk.

### custom your config

```shell
docker run -p 8210:8210 -v {your custom forge_release.yaml}:/home/arcblock/forge_release.yaml --rm forge-release:latest
```

Fore more detailed explanation of forge configuration, please check out [configuration](../../configuration)

Enjoy!
