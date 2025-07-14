import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import testRouter from "./routers/test.router.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use("/test-router", testRouter);

app.get("/healthcheck", (req, res) => {
  res.status(200);
  res.send({
    message: "Healthcheck passed!",
  });
});

// Not sure if this reporting issue but it never get to this point
// Note: You only see this route if you are running the server locally
app.get("/", (req, res) => {
  res.status(200);
  res.send({
    message: "Hello from Express!",
  });
});

export default app;
