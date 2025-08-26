# IAM Monorepo

[![CI](https://github.com/OWNER/iam-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/iam-monorepo/actions/workflows/ci.yml)

A full-stack workspace managed with [Nx](https://nx.dev) and [pnpm](https://pnpm.io). It contains a
Next.js frontend, an Express API, and several shared TypeScript packages.

## Project Structure

```text
apps/
  frontend/
    web-app/        # Next.js frontend
    web-app-e2e/    # Playwright end-to-end tests
  backend/
    web-app-api/    # Express REST API
    web-app-api-e2e/# API end-to-end tests
packages/
  config/           # configuration utilities
  shared-constants/ # cross-project constants
  shared-dto/       # shared DTO definitions
  shared-untils/    # common utility functions
```

## Getting Started

### Install dependencies

```sh
pnpm install
```

### Run the apps

```sh
pnpm dev:fe   # start the Next.js frontend
pnpm dev:be   # start the Express API
```

### Useful scripts

```sh
pnpm lint         # run eslint across the repo
pnpm test         # run unit tests
pnpm build        # build all projects
pnpm format       # format files with Prettier
pnpm format:check # verify formatting
```

Use `pnpm nx graph` to visualize project dependencies, or install the
[Nx Console](https://nx.dev/getting-started/editor-setup) extension for an IDE experience.

## Learn more

- [Nx Documentation](https://nx.dev)
- [pnpm Documentation](https://pnpm.io)
