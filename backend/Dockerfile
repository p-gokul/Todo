FROM public.ecr.aws/docker/library/node:22.12.0 AS builder 

COPY package*.json .

RUN npm install -g bun

RUN bun install

COPY . .

RUN bunx prisma generate

RUN bun run build

FROM public.ecr.aws/docker/library/node:22.12.0 AS runner

COPY --from=builder ./dist ./dist
COPY --from=builder ./package*.json ./package*.json
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /prisma ./prisma


EXPOSE 5000

CMD ["node","dist/index.js"]

