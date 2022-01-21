###################################################
## Build                                         ##
###################################################
FROM            node:14.2.0
ENV             APP=/home/auth/
WORKDIR         /home
RUN             npm i -g webpack-cli --silent
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

###################################################
## Serve                                         ##
###################################################
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
RUN             npm config set registry http://registry.npmjs.org/ &&\
                npm i -g webpack-cli --silent
WORKDIR         $APP
COPY            --from=0     /home/auth/dist/    $APP/dist/
USER            app
