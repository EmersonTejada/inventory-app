import express from "express";
import cors from "cors";
import "dotenv/config";
import { CategoryRouter } from "./routes/CategoryRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { productRouter } from "./routes/productRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use("/categories", CategoryRouter);
app.use("/products", productRouter)
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on http://localhost:${PORT}`);
});
