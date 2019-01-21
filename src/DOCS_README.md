# Docs Build Workflow

The documentation for Forge Framework is hosted at:

- https://docs.arcblock.io/forge/

## README

The [README.md](./README.md) is also the landing page for the documentation
on the website. During the Jenkins build, the current commit is added to the bottom
of the README.

## Config.js

The [config.js](./.vuepress/config.js) generates the sidebar and Table of Contents
on the website docs. Note the use of relative links and the omission of
file extensions. Additional features are available to improve the look
of the sidebar.

## Links

**NOTE:** Strongly consider the existing links - both within this directory
and to the website docs - when moving or deleting files.

Links to directories _MUST_ end in a `/`.

Relative links should be used nearly everywhere, having discovered and weighed the following:

### Relative

Where is the other file, relative to the current one?

- works both on GitHub and for the VuePress build
- confusing / annoying to have things like: `../../../../myfile.md`
- requires more updates when files are re-shuffled

### Absolute

Where is the other file, given the root of the repo?

- works on GitHub, doesn't work for the VuePress build
- this is much nicer: `/docs/hereitis/myfile.md`
- if you move that file around, the links inside it are preserved (but not to it, of course)

### Full

The full GitHub URL to a file or directory. Used occasionally when it makes sense
to send users to the GitHub.

## Building Locally

To build and serve the documentation locally, run:

```
# from this directory
npm install
npm install -g vuepress
```

then change the following line in the `config.js`:

```
base: "/docs/",
```

to:

```
base: "/",
```

Finally, go up one directory to the root of the repo and run:

```
# from root of repo
vuepress build docs
cd dist/docs
python -m SimpleHTTPServer 8080
```

then navigate to localhost:8080 in your browser.
