FROM node:20.13.1-alpine3.18 as builder

# Install PM2
RUN npm install -g pm2

# Set working directory
RUN mkdir -p /var/www/nest-demo
WORKDIR /var/www/nest-demo

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/nest-demo/node_modules/.bin:$PATH
# create user with no password
RUN adduser --disabled-password demo

# Copy existing application directory contents
COPY . /var/www/nest-demo
# install and cache app dependencies
COPY package.json /var/www/nest-demo/package.json
COPY package-lock.json /var/www/nest-demo/package-lock.json

# grant a permission to the application
RUN chown -R demo:demo /var/www/nest-demo
USER demo

# clear application caching
RUN npm cache clean --force
# install all dependencies
RUN npm install --force

EXPOSE 3002

#CMD ./setup-dev.sh
CMD [ "npm", "run", "start:dev" ]
