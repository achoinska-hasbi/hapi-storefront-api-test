#!/usr/bin/env bash

DEV_MODE=dev
RUN_MODE=run
MODE=$RUN_MODE

#parse argument list
while [[ $# > 0 ]]
do
	ARG=$1
	case $ARG in
	-r|--run) MODE=$RUN_MODE ;;
	esac

	shift
done

#using pm2 watcher in development mode
if [ "$ENABLE_WATCHER" == "true" ]; then
	MODE=$DEV_MODE
fi

#set pwd
cd /opt/app/current

#echo out environment variables we care about
echo APPLICATION_VARIABLES
echo NODE_ENV=$NODE_ENV

#check for port on pg box
waitOnResources()
{
	while ! nc -z pgbox 5432; do
		sleep 1
		echo WAITING FOR pgbox:5432
	done

	 #check for yellow/green status when es cluster consist of only a single box
	ES=$(curl -s "esbox:9200/_cat/health?h=status" | tr -d '[:space:]')
	while [[ "green" != $ES && "yellow" != $ES ]]; do
		sleep 1
		echo WAITING FOR esbox:9200 status: $ES
		ES=$(curl -s "esbox:9200/_cat/health?h=status" | tr -d '[:space:]')
	done
}

#execution based on argument
if [ $MODE == $RUN_MODE ]; then
	echo RUNNING SERVICE
	pm2 start src/service.js --no-daemon
fi
if [ $MODE == $DEV_MODE ]; then
	echo RUNNING DEV SERVICE
	pm2 start src/service.js --watch node_modules/ --watch src/ --ignore-watch="^.*\.log$ \.git npm-debug\.log" --no-daemon
fi
