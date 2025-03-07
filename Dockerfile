# ------------------------------DEVELOPMENT STAGE------------------------------
FROM node:23-alpine AS builder

RUN apk add --no-cache libc6-compat openssl

WORKDIR /usr/src/app

# Set environment variable for build stage
ENV NODE_ENV=build

# Copy only the package.json and package-lock.json first to leverage Docker cache for dependencies
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY --chown=node:node . ./

# Generate Prisma client, build the project, and remove dev dependencies
RUN npm run build && npm prune --omit=dev

# ---------------------------------BUILD STAGE---------------------------------
FROM node:23-alpine AS production
    
RUN apk add --no-cache libc6-compat openssl

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/public ./public
COPY --chown=node:node --from=build /usr/src/app/.next/standalone ./
COPY --chown=node:node --from=build /usr/src/app/.next/static ./.next/static

USER node

EXPOSE 3000

# Consider environment variable injection for .env files
# ENV HOSTNAME "0.0.0.0"  # Optional, depending on your needs

CMD ["node", "server.js"]