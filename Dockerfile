# ------------------------------DEVELOPMENT STAGE------------------------------

FROM node:22-alpine AS development
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

COPY ./package*.json .

RUN npm install

COPY --chown=node:node . .

USER node

# ---------------------------------BUILD STAGE---------------------------------
FROM node:22-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

COPY --chown=node:node .env.production .env.local

RUN npm run build
RUN npm install --production
RUN npm cache clean --force

USER node

# -------------------------------PRODUCTION STAGE------------------------------
FROM node:22-alpine AS production
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

COPY --chown=node:node --from=build /usr/src/app/public ./public

COPY --chown=node:node --from=build /usr/src/app/.next/standalone ./
COPY --chown=node:node --from=build /usr/src/app/.next/static ./.next/static

USER node

EXPOSE 3000

ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]