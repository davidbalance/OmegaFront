# ------------------------------DEVELOPMENT STAGE------------------------------
FROM node:23-alpine AS builder

RUN apk add --no-cache libc6-compat openssl bash

WORKDIR /usr/src/app

<<<<<<< HEAD
# Set environment variable for build stage
ENV NODE_ENV=build

# Copy only the package.json and package-lock.json first to leverage Docker cache for dependencies
COPY --chown=node:node package*.json ./
=======
COPY ./package*.json ./
>>>>>>> main

# Install dependencies 
RUN npm ci

# Copy the rest of the application files
COPY --chown=node:node . ./

# Generate Prisma client, build the project, and remove dev dependencies
RUN npx prisma generate && npm run build && npm prune --omit=dev

# ---------------------------------BUILD STAGE---------------------------------
FROM node:23-alpine AS production
    
RUN apk add --no-cache libc6-compat openssl bash

WORKDIR /usr/src/app

<<<<<<< HEAD
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /usr/src/app/public ./public
COPY --from=builder --chown=node:node /usr/src/app/.next/standalone ./
COPY --from=builder --chown=node:node /usr/src/app/.next/static ./.next/static
COPY --from=builder --chown=node:node /usr/src/app/prisma ./prisma
=======
COPY --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

COPY --chown=node:node .env .env

RUN npm run build
RUN npm install --production
RUN npm cache clean --force

USER node

# -------------------------------PRODUCTION STAGE------------------------------
FROM node:22-alpine AS production
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/public ./public

COPY --chown=node:node --from=build /usr/src/app/.next/standalone ./
COPY --chown=node:node --from=build /usr/src/app/.next/static ./.next/static
>>>>>>> main

USER node

EXPOSE 3000

# Consider environment variable injection for .env files
# ENV HOSTNAME "0.0.0.0"  # Optional, depending on your needs

CMD ["node", "server.js"]
