FROM node:lts-alpine3.14

WORKDIR /app/backend

COPY . .

RUN yarn 

EXPOSE 2008



# CMD [ "/bin/ash", "-c", "yarn run prisma migrate deploy && yarn run ts-node ./prisma/seed.ts"]
CMD [ "/bin/ash", "-c", "yarn run dev"]
# CMD [ "/bin/ash", "-c", "yarn run prisma db push --accept-data-loss && yarn run dev  "]