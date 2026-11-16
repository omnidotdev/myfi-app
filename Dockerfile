FROM oven/bun:1.4.4 AS base
WORKDIR /app

FROM base AS builder
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.output ./.output

EXPOSE 3000
# Raise the max request-header size so large many-workspace auth cookies do not trip HTTP 431
CMD ["node", "--max-http-header-size=65536", ".output/server/index.mjs"]
