# -------- Base --------
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN corepack enable

# -------- Prune --------
FROM base AS pruner
COPY . .
# Extract only the 'api' app and its workspace dependencies
RUN npx turbo prune api --docker

# -------- Dependencies --------
FROM base AS deps
# Copy the pruned lockfile and package.json
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

# -------- Build --------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=api

# -------- Production --------
FROM node:22-alpine AS runner
WORKDIR /app
RUN corepack enable

ENV NODE_ENV=production
# Optional: Set the port to match your main.ts default if not provided
ENV PORT=5000

# Security: Non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy pruned production dependencies and build output
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
# Install only production dependencies
RUN yarn install --prod --frozen-lockfile

# Copy the build output (NestJS monorepo builds usually go to dist/apps/api)
COPY --from=builder /app/apps/api/dist ./apps/api/dist

USER app

EXPOSE 5001

# The path to main.js depends on your NestJS config, but usually it's dist/main
CMD ["node", "apps/api/dist/main.js"]
