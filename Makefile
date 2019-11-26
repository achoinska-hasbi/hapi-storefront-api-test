NAME=xolocalvendors/service-marketplace-api
NAME_SHORT=marketplace-api
VERSION=$(shell git rev-parse HEAD | head -c7)
NODE_ENV=qa
OSTYPE := $(shell uname)
PLUGIN_NAME=xolocalvendors/hapi-marketplace-api-graphql

#Purely for Rest for Now
LOCAL_PLUGIN_DIR=$$(pwd)/../
DOCKER_PLUGIN_DIR=/opt/app/current/node_modules/
MOUNTED_PLUGINS=hapi-marketplace-api

CHANGED_FILES=$(shell git diff --name-only HEAD HEAD~1 -- '***.js')

define mounted_plugin_path
	-v $(LOCAL_PLUGIN_DIR)$(1):$(DOCKER_PLUGIN_DIR)$(1)
endef

define remove_plugin_node_modules
	@rm -rf $(LOCAL_PLUGIN_DIR)$(1)/node_modules
endef

define mounted_volumes
	$(foreach PLUGIN,$(MOUNTED_PLUGINS), $(call mounted_plugin_path,$(PLUGIN)))
endef


define eslint_fix
	node_modules/.bin/eslint $(1) --fix --ignore-pattern '!node_modules/*'
endef

#auto lints last commit
auto-lint:
	$(foreach file,$(CHANGED_FILES), \
		$(call eslint_fix,$(file)) \
	)

test:
	nyc --reporter=lcov --reporter=text-summary node_modules/.bin/mocha --exit ./test/ --recursive

debug-test:
	node_modules/.bin/mocha ./src/plugins/*/test/ --debug-brk --recursive

docker-build-test:
	@docker build -t $(PLUGIN_NAME) -f docker/Dockerfile.test .

run: docker-build-test
	@docker-compose -f docker/docker-compose.yml run --rm pluginDev

install-code-climate:
	@curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
	@chmod +x ./cc-test-reporter

jenkins-cover: install-code-climate
	GIT_COMMIT=$(git log | grep -m1 -oE '[^ ]+$')
	./cc-test-reporter before-build && \
	make test && \
	./cc-test-reporter after-build --id 0af439aa31cdac609a4afbccda6dd1e3f594b8b6f0d62ab4bc22152f3765db8b --exit-code 0

jenkins-run:
	make docker-clean ; \
	make docker-build-test && \
	docker-compose -f docker/docker-compose.yml run --rm pluginDev

clean:
	@rm -f npm-shrinkwrap.json
	docker build -t $(NAME) -f docker/Dockerfile.build . --no-cache
	docker create --name extract $(NAME)
	docker cp extract:/opt/app/current/npm-shrinkwrap.json .
	docker rm -f extract

install:
	@rm -rf ./node_modules
	npm install

docker-build:
	docker build -t $(NAME) -f docker/Dockerfile .

docker-run: docker-build
	docker run --rm -it -p 3000:80 \
	--env=NODE_ENV=$(NODE_ENV) \
	--env=SLOW_QUERY_THRESHOLD=$(SLOW_QUERY_THRESHOLD) $(NAME)

docker-run-dev: docker-build
	$(foreach PLUGIN,$(MOUNTED_PLUGINS), $(call remove_plugin_node_modules,$(PLUGIN)))
	@echo "\033[92m\n MOUNTED PLUGINS: \n $(MOUNTED_PLUGINS)\033[0m";
	docker run --rm -it -p 3000:80 $(call mounted_volumes) \
	-v $$(pwd)/src:/opt/app/current/src \
	--env=DEBUG_HANDLER_QUERIES=true \
	--env=NODE_ENV=$(NODE_ENV) \
	--env=ENABLE_WATCHER=true \
	--env=SLOW_QUERY_THRESHOLD=$(SLOW_QUERY_THRESHOLD) $(NAME)

docker-clean:
	@echo "Removing images"
ifeq ($(OSTYPE),Darwin)
	docker ps -aq | xargs docker rm -f
	docker images -f "dangling=true" -q | xargs docker rmi
else
	docker ps -aq | xargs -r docker rm -f
	docker images -f "dangling=true" -q | xargs -r docker rmi
endif

jenkins-build:
	sed "s/_NameOfYourServer_/Locals__$(NAME_SHORT)__$(NODE_ENV)/g" deployment/.ebextensions/newrelic.config.template > deployment/.ebextensions/newrelic.config
	docker build -t $(NAME):$(VERSION) -f docker/Dockerfile .
	docker tag $(NAME):$(VERSION) $(NAME):latest
	docker tag $(NAME):$(VERSION) $(NAME):$(BUILD_ENV) 2>/dev/null

jenkins-push:
	docker push $(NAME):$(VERSION)

jenkins-clean:
	docker rmi -f $(NAME)

aws-build:
	cat docker/Dockerrun.aws.json.template | sed "s/{version}/$(VERSION)/" > deployment/Dockerrun.aws.json

release_qa:
	@node deploy/release.js --type=$(type)

release_prod:
	@node deploy/create_release.js
	git checkout qa && git pull
	git checkout production && git pull
	git merge qa --no-ff --no-edit
	git push

pull_request: run
	@node deploy/create_pull_request.js

generate_release_notes:
	github_changelog_generator  --unreleased-only

update_api:
	@node deploy/update_plugins.js

lint:
	node_modules/.bin/eslint --fix src/ test/

.PHONY: clean install docker-build docker-run jenkins-build jenkins-push jenkins-clean aws-build lint test debug-test run deploy jenkins-cover

###############    Kubernetes Info    ################

env?=qa
# Pod names change on deploy.
# Get the current pod name by running `make get_pods env=production` in your console (e.g. for production).
pod?='no-pod-selected'
datetime:=$(shell /bin/date "+%Y%m%d%H%M%S")
version?=$(VERSION)
image_name:=marketplace-api:$(env)-$(version)
force_build?=false
ifeq ($(env), production)
	container?='marketplace-api-production'
  k8_cluster=prod
  env_prefix=prod-
else
	container?='marketplace-api-qa'
  k8_cluster=preprod
  env_prefix=qa-
endif

git_hash=$(shell git rev-parse HEAD)
name_short=$(NAME_SHORT)
tag?=$(git_hash)
repository:=xogroup/$(env_prefix)marketplace-api
tagged_image:=$(repository):$(tag)
namespace=localvendorstech
k8_docker_secret=docker-xolocalci
cname=marketplace-api.localsolutions.theknot.com
application=marketplace-api
role=api
stack=marketplace-discovery


# CNAME is created in Route 53, under your team name (localsolutions in this case).
# https://console.aws.amazon.com/route53/home#resource-record-sets:Z22FWLKR79P1L4
# QA   Cname is an alias of preprod-public.us-east-1.elb.clusters.xogrp.com
# PROD Cname is an alias of prod-public.us-east-1.elb.clusters.xogrp.com

###### Debugging Kubernetes #######

rollback:
	ENV=$(env) \
	K8_CLUSTER=$(k8_cluster) \
	CONTAINER=$(container) \
	sh ./build/scripts/k8s/rollback.sh

get_pods:
	K8_CLUSTER=$(k8_cluster) \
	NAMESPACE=$(namespace) \
	sh ./build/scripts/k8s/get_pods.sh

get_pod:
	K8_CLUSTER=$(k8_cluster) \
	NAMESPACE=$(namespace) \
	APPLICATION=$(application) \
	sh ./build/scripts/k8s/get_pod.sh

ssh_pod:
	K8_CLUSTER=$(k8_cluster) \
	NAMESPACE=$(namespace) \
	POD=$(pod) \
	CONTAINER=$(container) \
	sh ./build/scripts/k8s/ssh_pod.sh

log_pod:
	K8_CLUSTER=$(k8_cluster) \
  NAMESPACE=$(namespace) \
	POD=$(pod) \
	CONTAINER=$(container) \
	sh ./build/scripts/k8s/pod_logs.sh

###### Jenkins CI Commands ########

clean_helm_images:
	docker ps -aq --no-trunc -f status=exited | xargs docker rm || true && \
	docker rmi xogroup/xo-helm:prod -f || true && \
	docker rmi xogroup/xo-helm:preprod -f || true

build_image:
	IMAGE_NAME=$(image_name) \
	TAGGED_IMAGE=$(tagged_image) \
	ENV=$(env) \
	sh ./build/scripts/build-app.sh

tag:
	IMAGE_NAME=$(image_name) \
	TAGGED_IMAGE=$(tagged_image) \
	sh ./build/scripts/k8s/tag.sh

push:
	TAGGED_IMAGE=$(tagged_image) \
	sh ./build/scripts/k8s/push.sh

deploy:
	ENV=$(env) \
	K8_CLUSTER=$(k8_cluster) \
	REPOSITORY=$(repository) \
	TAG=$(tag) \
	ENV_PREFIX=$(env_prefix) \
	NAMESPACE=$(namespace) \
	K8_DOCKER_SECRET=$(k8_docker_secret) \
	CNAME=$(cname) \
	APPLICATION=$(application) \
	ROLE=$(role) \
	STACK=$(stack) \
	NAME=$(name_short) \
	sh ./build/scripts/k8s/deploy.sh


############ Checking Kubernetes from command line commands. ############

get_secrets:
	docker run -it --rm xogroup/xo-helm:$(k8_cluster) kubectl get secrets -n $(namespace) -o wide
