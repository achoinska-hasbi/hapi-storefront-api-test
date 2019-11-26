FROM xolocalvendors/nodebox:8-latest

MAINTAINER XO Group Team

# https://stackoverflow.com/a/55362112
RUN sed -i '/jessie-updates/d' /etc/apt/sources.list  # Now archived

# Port 3000 for server
EXPOSE 3000
EXPOSE 5858

ENTRYPOINT ["docker-shell"]

CMD ["-r"]

RUN apt-get update
RUN apt-get install -y -q --no-install-recommends git

ADD ./docker/docker-shell.sh /usr/bin/docker-shell
RUN chmod +x /usr/bin/docker-shell

ADD ./package.json $APPDIR/package.json
ADD ./.npmrc $APPDIR/.npmrc

RUN npm install

ADD . $APPDIR
