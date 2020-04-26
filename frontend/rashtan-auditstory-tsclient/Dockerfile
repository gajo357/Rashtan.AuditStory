FROM node:10 as builder

# install Node and yarn
# RUN apk add nodejs yarn

# Work directory where we copy the code
WORKDIR /app

# Install dependencies
COPY package.json ./package.json
RUN yarn install

COPY . .
# Build the app
RUN yarn build

# start from a light base
FROM nginx:alpine
# copy only the content of the build folder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]