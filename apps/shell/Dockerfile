# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/shell ./apps/shell
COPY packages ./packages

# Install and build
RUN pnpm install
RUN pnpm run build --filter=@soukconect/shell

# Production stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy only necessary files from builder
COPY --from=builder /app/apps/shell/.next ./apps/shell/.next
COPY --from=builder /app/apps/shell/public ./apps/shell/public
COPY --from=builder /app/apps/shell/package.json ./apps/shell/

# Copy packages for dependencies
COPY --from=builder /app/packages ./packages
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Install production dependencies
RUN cd apps/shell && pnpm install --prod

WORKDIR /app/apps/shell

EXPOSE 3000

CMD ["pnpm", "start"]
