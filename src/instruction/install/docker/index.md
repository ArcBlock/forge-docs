---
title: 'Explore Forge With Docker'
description: 'Explore Forge With Docker'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'install'
  - 'docker'
---

## Fast Start

No matter which OS you are using, you have to install [Docker client]("https://www.docker.com/products/docker-desktop")

And then get forge iamge.

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

you can get forge versions at [Dockerhub](https://cloud.docker.com/u/arcblock/repository/docker/arcblock/forge-release/tags)

### save your data in your disk

```shell
docker run -p 8210:8210 -v {your local disk}:/home/arcblock/.forge_release/ --rm forge-release:latest
```

and you can find your data in your local disk.

### custom your config

```shell
docker run -p 8210:8210 -v {your custom forge_release.yaml}:/home/arcblock/forge_release.yaml --rm forge-release:latest
```

detail config you can find at [Config file](../core/configuration)

enjoy it!
