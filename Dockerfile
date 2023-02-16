FROM node:18
COPY . .
RUN npm i pnpm -g
RUN pnpm i
CMD ["pnpm", "start"]
