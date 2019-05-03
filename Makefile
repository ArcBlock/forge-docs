TOP_DIR=.
OUTPUT_FOLDER=./dist/forge
VUEPRESS=../node_modules/vuepress/bin/vuepress.js

VERSION=$(strip $(shell cat version))

build: $(OUTPUT_FOLDER)
	@cd src; DOC_VERSION=latest $(VUEPRESS) build
	@cd src; DOC_VERSION=$(VERSION) $(VUEPRESS) build
	@echo "All slides are built."

all: build
	@aws s3 sync $(S3_FOLDER) s3://docs.arcblock.io/forge --region us-west-2 --profile prod

init:
	@npm install

travis-init: init
	@echo "Initialize software required for travis (normally ubuntu software)"

clean:
	@rm -rf dist
	@echo "All slides are cleaned."

$(OUTPUT_FOLDER):
	@mkdir -p $@

watch:
	@make build
	@echo "Watching templates and slides changes..."
	@fswatch -o src/ | xargs -n1 -I{} make build

copy-js-docs:
	@cp -f ~/Develop/arcblock/forge-js/packages/graphql-client/docs/README.md src/sdk/javascript/graphql_client.md
	@cp -f ~/Develop/arcblock/forge-js/packages/grpc-client/docs/README.md src/sdk/javascript/grpc_client.md
	@cp -f ~/Develop/arcblock/forge-js/packages/forge-util/docs/README.md src/sdk/javascript/forge_util.md
	@cp -f ~/Develop/arcblock/forge-js/packages/forge-wallet/docs/README.md src/sdk/javascript/forge_wallet.md
	@cp -f ~/Develop/arcblock/forge-js/packages/forge-message/docs/README.md src/sdk/javascript/forge_message.md
	@cp -f ~/Develop/arcblock/forge-js/packages/mcrypto/docs/README.md src/sdk/javascript/mcrypto.md
	@cp -f ~/Develop/arcblock/abt-did-js/packages/did/docs/README.md src/sdk/javascript/abt_did.md
	@cp -f ~/Develop/arcblock/abt-did-js/packages/util/docs/README.md src/sdk/javascript/did_util.md
	@cp -f ~/Develop/arcblock/abt-did-js/packages/auth/docs/README.md src/sdk/javascript/did_auth.md

dev:
	@cd src; $(VUEPRESS) dev

run:
	@http-server ./dist -p 8008 -c-1

travis-deploy: release
	@echo "Deploy the software by travis"

include .makefiles/release.mk

.PHONY: all clean $(DIRS) build run watch
