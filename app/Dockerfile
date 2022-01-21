FROM            node:14.2.0
ENV             APP=/home/app/
WORKDIR         /home
RUN             npm i -g webpack-cli --silent
WORKDIR         $APP
COPY            package.json \
                package-lock.json \
                $APP
RUN             npm install &&\
                npm cache clean --force &&\
                chown -R app:app $APP/node_modules
COPY            --chown=app:app     src/    $APP/src/
COPY            --chown=app:app     test/    $APP/test/
COPY            --chown=app:app \
                .env \
                tsconfig.json \
                $APP
RUN             npm run build

FROM            browserless/chrome
LABEL           maintainer="Robert H. Hameetman" \
                com.example.app.name="@microfrontend-example/shell" \
                com.example.app.description="The client-side entrypoint of the application" \
                com.example.app.url="https://www.robhameetman.com/" \
                com.example.app.version="0.0.1" \
                com.example.app.docker.cmd="docker-compose up mfe-service-shell" \
                com.example.app.docker.cmd.devel="" \
                com.example.app.docker.cmd.test=""
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
COPY            --from=0     --chown=app:app     /home/app/dist/    $APP/dist/
USER            app
