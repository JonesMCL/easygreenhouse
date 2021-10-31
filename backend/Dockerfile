#syntax=docker/dockerfile:1
FROM ubuntu:20.04
ADD . /code
WORKDIR /code
COPY ["package.json", "package-lock.json*", "./"]

RUN apt update
RUN apt install -y curl
RUN apt install -y nodejs
# confirm that it was successful 
RUN node -v

RUN apt install -y npm

# npm installs automatically 
RUN npm -v

RUN npm install 
RUN npm ci --only=production

COPY . .
#TODO UPDATE PORTS
EXPOSE 4000 

CMD [ "npm", "start" ]