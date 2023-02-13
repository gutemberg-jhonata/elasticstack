FROM node:latest
COPY . .
RUN npm i pnpm -g
RUN pnpm i
CMD ["pnpm", "start"]
