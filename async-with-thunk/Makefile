TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

NPM=$(shell npm bin)

BROWSERIFY_OPTS=\
  -e lib/client/main.js \
  -t babelify \
  -v -o bundle/bundle.js

.PHONY: build start watch bundle clean

build: clean lint bundle
	@echo $(TAG)$@$(END)

start: build
	@echo $(TAG)$@$(END)
	node lib/server

watch: node_modules
	@echo $(TAG)$@$(END)
	mkdir -p bundle
	BABEL_ENV="development" $(NPM)/parallelshell \
		'$(NPM)/watchify $(BROWSERIFY_OPTS) -d' \
		'$(NPM)/nodemon lib/server'

bundle: node_modules
	@echo $(TAG)$@$(END)
	mkdir -p $@
	BABEL_ENV="production" $(NPM)/browserify $(BROWSERIFY_OPTS)

lint: node_modules
	@echo $(TAG)$@$(END)
	$(NPM)/eslint 'lib/**/*.js'

clean:
	@echo $(TAG)$@$(END)
	rm -rf bundle

node_modules: package.json
	@echo $(TAG)$@$(END)
	yarn || npm install
