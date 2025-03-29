FROM node:22-alpine

RUN npm install -g pnpm --unsafe-perm

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

RUN pnpm build

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "node dist/index.js"]