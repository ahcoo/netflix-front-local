FROM node
WORKDIR usr/src/components/app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"/]