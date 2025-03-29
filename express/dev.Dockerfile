FROM node:23.10.0-slim

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# For development with hot-reloading
# Assuming you have a "dev" script in package.json that uses nodemon or similar
CMD ["pnpm", "start:dev"]
