import express from "express";
import cors from "cors";
import { config } from "dotenv";
import client from "prom-client";
import resposneTime from "response-time";
import { createLogger } from "winston";
import LokiTransport from "winston-loki";

const LOKI_HOST = "https://loki.p-gokul.dev";
const VERSION = " = V1  =";

export const logger = createLogger({
  transports: [
    new LokiTransport({
      host: LOKI_HOST,
      json: true,
    }),
  ],
});

config();

const app = express();
app.use(express.json());

// Require ORIGIN to be defined
const ORIGIN1 = process.env.ORIGIN1!;
const ORIGIN2 = process.env.ORIGIN2!;
const ORIGIN3 = process.env.ORIGIN3!;
const ORIGIN4 = process.env.ORIGIN4!;

console.log(ORIGIN1);
console.log(ORIGIN2);

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "This tells how much time is taken by request and response.",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

const totalReqCounter = new client.Counter({
  name: "total_req",
  help: "Tells total request count.",
});

app.use(
  resposneTime((req, res, time) => {
    totalReqCounter.inc();
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

app.use(
  cors({
    origin: [ORIGIN1, ORIGIN2, ORIGIN3, ORIGIN4],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  })
);
import todoRouter from "./routes/todo.route";
app.use("/api", todoRouter);

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

app.get("/", (req, res) => {
  logger.info("GET /");
  res.send({ message: `Backend is up ${VERSION}` });
});

app.get("/health", (req, res) => {
  logger.info("GET /health.");
  res.send({ message: `Backend is healthy and running ${VERSION}` });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is up and running in the port ${PORT} . ${VERSION}`);
});
