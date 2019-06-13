TOP_DIR=.
OUTPUT_FOLDER=./dist/forge
VUEPRESS=../node_modules/vuepress/bin/vuepress.js

VERSION=$(strip $(shell cat version))

build: $(OUTPUT_FOLDER)
	@rm -rf $(OUTPUT_FOLDER)/*
	@cd src; DOC_VERSION=latest $(VUEPRESS) build
	# @cd src; DOC_VERSION=$(basename $(VERSION)) $(VUEPRESS) build
	@echo "All slides are built."

all: build
	@aws s3 sync $(OUTPUT_FOLDER) s3://docs.arcblock.io/forge --region us-west-2 --profile prod

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

dev:
	@cd src; DOC_VERSION=latest $(VUEPRESS) dev

run:
	@http-server ./dist -p 8008 -c-1

travis: build

travis-deploy: release
	@echo "Deploy the software by travis"

include .makefiles/release.mk

.PHONY: all clean $(DIRS) build run watch
