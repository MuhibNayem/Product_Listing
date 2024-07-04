import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware for logging requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `
      method: ${req.method}
      url: ${req.url} 
      body:${req.body} 
      headers:${JSON.stringify(req.headers)}
      query: ${JSON.stringify(req.query)}
    `
  );
  next();
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
