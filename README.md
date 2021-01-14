[![Gitter](https://badges.gitter.im/ArcBlock/community.svg)](https://gitter.im/ArcBlock/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

The documentation for the Forge Blockchain Application framework can be accessed at [docs.arcblock.io/forge](http://docs.arcblock.io/forge).

## Getting Started

```bash
git clone https://github.com/ArcBlock/forge-docs.git
cd forge-docs
make init
```

Then create a config file `.env` in repo root directory with the following content:

```
GATSBY_ALGOLIA_APP_ID="FU81LCBN51"
GATSBY_ALGOLIA_ADMIN_KEY="this key is secret"
GATSBY_ALGOLIA_SEARCH_KEY="2e4d21878c80877e17a6f9c80722eaeb"
GATSBY_ALGOLIA_INDEX_NAME="forge-docs"
```

Then compile and server docs from local:

```
make run
```

Then, open http://localhost:8000/en/docs to preview.

## Contribution

For typos, new posts, please send pull requests.
