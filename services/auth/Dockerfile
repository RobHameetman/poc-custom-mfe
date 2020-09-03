FROM            node:14.2.0

LABEL           maintainer="Robert H. Hameetman" \
                com.example.data.name="@microfrontend-example/auth" \
                com.example.data.description="A portal for managing users, groups, and roles" \
                com.example.data.url="https://www.robhameetman.com/" \
                com.example.data.version="0.0.1" \
                com.example.data.docker.cmd="docker-compose up mfe-service-auth" \
                com.example.data.docker.cmd.devel="" \
                com.example.data.docker.cmd.test=""

ENV             APP=/home/data/

WORKDIR         /home

RUN             useradd --user-group --create-home --shell /bin/false app &&\
                chmod 1777 /tmp &&\
                npm install npm@6.14.4 --silent &&\
                rm -rf /usr/local/lib/node_modules/npm &&\
                mv node_modules/npm /usr/local/lib/node_modules/npm &&\
                npm config set registry http://registry.npmjs.org/ &&\
                npm i -g webpack-cli --silent

WORKDIR         $APP

COPY            package.json \
                package-lock.json \
                $APP

RUN             npm install &&\
                npm cache clean --force &&\
                chown -R app:app $APP/node_modules

COPY            --chown=app:app     src/    $APP/src/

COPY            --chown=app:app     test/    $APP/test/

COPY            --chown=app:app     typings/    $APP/typings/

COPY            --chown=app:app \
                tsconfig.json \
                $APP

RUN             npm run build

USER            app
