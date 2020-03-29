# what is say here is please install this package inside my little computer [this docker image]
FROM node:10
WORKDIR /usr/src/app

# the first dot is the current directory and the second dot is this image 
COPY package.json /usr/src/app/package.json

# once i installed nodejs i can run npm to insall all package dependances 
## Skip this and install the dependances from the global installed in my machine 
RUN npm install

# command to run my application
#Expose port and start application
# EXPOSE 3000
CMD [ "npm", "start" ]


# $ docker build -t foushware/slack_clone .    => this to build the image 
# docker run -p 3001:8081 foushware/slack_clone => to run the image inside the container  p=> specify port  port1:port2
# port1 => what i want to run in my computer    |  port2 => what i want to run in the container
