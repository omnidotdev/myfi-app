FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS builder
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
