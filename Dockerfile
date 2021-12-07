# Using node v15.x
# v16+ encountered errors with certificates
FROM node:15

# Set server home
WORKDIR /var/bookhouse

# Copy package files
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

# Install dependencies
RUN yarn install

# Expose ports
EXPOSE 3000
EXPOSE 8000

# Copy app
COPY src/ ./src/
COPY public/ ./public/
COPY container/start-container.sh ./start.sh

# Start command
CMD [ "/bin/sh", "./start.sh" ]