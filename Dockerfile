# ------------------------------DEVELOPMENT STAGE------------------------------

FROM node:22-alpine AS development
RUN apk add --no-cache libc6-compat openssl
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

# ---------------------------------BUILD STAGE---------------------------------
FROM node:22-alpine AS build
RUN apk add --no-cache libc6-compat openssl
WORKDIR /usr/src/app

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# COPY --chown=node:node .env .env

RUN npx prisma generate
RUN npm run build
RUN npm install --production
RUN npm cache clean --force

USER node

# -------------------------------PRODUCTION STAGE------------------------------
FROM node:22-alpine AS production
RUN apk add --no-cache libc6-compat openssl
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/prisma prisma
COPY --chown=node:node --from=build /usr/src/app/public ./public
COPY --chown=node:node --from=build /usr/src/app/.next/standalone ./
COPY --chown=node:node --from=build /usr/src/app/.next/static ./.next/static

USER node

EXPOSE 3000

# Consider environment variable injection for .env files
# ENV HOSTNAME "0.0.0.0"  # Optional, depending on your needs

# CMD ["node", "server.js"]
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]