FROM node:18-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN set -ux \
	npm install \
	&& npm install react-scripts@5.0.1 --location=global
COPY . .
# start app
CMD ["npm", "run", "start"]
