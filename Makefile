TOP_DIR=.
OUTPUT_FOLDER=./dist

VERSION=$(strip $(shell cat version))

build:
	@cd src; vuepress build
	@echo "All slides are built."

all: build
	@aws s3 sync dist s3://docs.arcblock.io/forge --region us-west-2 --profile prod

init:
	@npm install -g vuepress
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
	@cd src; vuepress dev
run:
	@http-server $(OUTPUT_FOLDER) -p 8008 -c-1

travis-deploy: release
	@echo "Deploy the software by travis"

include .makefiles/release.mk

.PHONY: all clean $(DIRS) build run watch
