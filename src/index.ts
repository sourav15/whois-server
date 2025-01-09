import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { connectRedis } from "./connections/redisClient";
import router from "./routes/lookupRouter";

const app: Express = express();
const port = 8000;
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(router);
connectRedis();

app.use(async (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err && err.statusCode) {
    res
      .status(err.statusCode)
      .send({ status: err.statusCode, message: err.message });
  } else if (err) {
    res.status(500).json(err.message);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
