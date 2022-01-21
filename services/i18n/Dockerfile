FROM            node:14.2.0
ENV             APP=/home/i18n/
WORKDIR         /home
RUN             npm install npm@6.14.4 --silent &&\
                rm -rf /usr/local/lib/node_modules/npm &&\
                mv node_modules/npm /usr/local/lib/node_modules/npm &&\
                npm config set registry http://registry.npmjs.org/ &&\
                npm i -g webpack-cli --silent
WORKDIR         $APP
COPY            package.json \
                package-lock.json \
                $APP
RUN             npm install &&\
                npm cache clean --force
COPY            src/    $APP/src/
COPY            test/    $APP/test/
COPY            \
                .env \
                tsconfig.json \
                $APP
RUN             npm run build

FROM            browserless/chrome
LABEL           maintainer="Robert H. Hameetman" \
                com.example.data.name="@microfrontend-example/shell" \
                com.example.data.description="The client-side entrypoint of the application" \
                com.example.data.url="https://www.robhameetman.com/" \
                com.example.data.version="0.0.1" \
                com.example.data.docker.cmd="docker-compose up mfe-service-shell" \
                com.example.data.docker.cmd.devel="" \
                com.example.data.docker.cmd.test=""
ENV             APP=/home/app/
WORKDIR         /home
RUN             useradd --user-group --create-home --shell /bin/false app &&\
                chmod 1777 /tmp &&\
                npm install npm@6.14.4 --silent &&\
                rm -rf /usr/local/lib/node_modules/npm &&\
                mv node_modules/npm /usr/local/lib/node_modules/npm &&\
                npm config set registry http://registry.npmjs.org/ &&\
                npm i -g webpack-cli --silent
WORKDIR         $APP
COPY            --from=0     --chown=app:app     /home/i18n/dist/    $APP/dist/
USER            app
