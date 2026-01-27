# ---------- Stage 1: Dependencies ----------
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ---------- Stage 2: Tests ----------
FROM deps AS test

COPY . .

RUN npm run test -- --watch=false --coverage

# ---------- Stage 3: Build ----------
FROM test AS build

COPY . .

RUN npm run build -- --configuration=production

# ---------- Stage 4: Runtime (nginx) ----------
FROM nginx:alpine AS runtime

RUN rm /etc/nginx/conf.d/default.conf

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/heroesPlatform/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
