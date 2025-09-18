FROM harbor.untitled.ninja/docker-hub/library/node:20-alpine AS build
ARG PNPM_VERSION=9.10.0
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_LK_URL
ARG NEXT_PUBLIC_DOCS_URL
ARG NEXT_PUBLIC_RELEASE_DATE

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install --global pnpm@${PNPM_VERSION}
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build
CMD pnpm run start
