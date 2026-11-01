FROM node:22.23.4-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN CSP_MODE=${CSP_MODE:-report} pnpm build

FROM caddy:2-alpine
COPY --from=build /app/dist /srv/dist
COPY --from=build /app/deploy/generated /etc/caddy/generated
COPY deploy/Caddyfile.docker /etc/caddy/Caddyfile
USER 1000
EXPOSE 8080
