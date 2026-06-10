FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# DATABASE_URL factice nécessaire uniquement pour que prisma generate et next build
# puissent s'initialiser — la vraie URL est injectée à l'exécution via docker-compose
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
ENV JWT_SECRET=build-placeholder

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
