---
title: 'Use Forge in a Docker Container'
description: 'Use Forge in a Docker Container'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'install'
  - 'docker'
---
# Use Forge in a Docker Container

This article will show you two ways you can use Forge in a Docker container.

## Quick Start

First, install the [Docker client]("https://www.docker.com/products/docker-desktop")

Obtain the Forge image by running:

```shell
docker pull arcblock/forge-release
docker run -p 8210:8210 --rm forge-release
```

Once you've finished obtaining the assets, visit [http://localhost:8210/dashboard](http://localhost:8210/dashboard) to explore your new chain.

## Advanced Start

Begin by choosing the version of Forge you want from the [Docker Hub](https://hub.docker.com/r/arcblock/forge).

You can obtain the appropriate images as follows (remember to update the version numbers):

```shell
docker pull arcblock/forge-release:v0.22.1
docker run -p 8210:8210 --rm forge-release:v0.22.1
```

You'll want to configure your data to be saved to your local disk:

```shell
docker run -p 8210:8210 -v {your local disk}:/home/arcblock/.forge_release/ --rm forge-release:latest
```

Finally, you can customize your Forge [configuration](../../configuration):

```shell
docker run -p 8210:8210 -v {your_custom_forge_release.yaml}:/home/arcblock/forge_release.yaml --rm forge-release:latest
```
