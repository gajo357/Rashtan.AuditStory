FROM alpine as builder

# install Node and yarn
RUN apk add nodejs yarn

# Work directory where we copy the code
WORKDIR /app
COPY . .
# Install dependencies and build the app
RUN yarn install
RUN yarn build

# start from a light base
FROM nginx:alpine
# copy only the content of the build folder
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]