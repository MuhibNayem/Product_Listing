import { Router, Request, Response } from "express";

import data from "../data/products.json";
import { Product } from "../types/product";
import { authenticateToken } from "../utils/authentication";

const router = Router();

router.get("/", authenticateToken, (req: Request, res: Response) => {
  const search = req?.query?.search?.toString().toLowerCase();
  const products: Product[] = data?.products;
  const filteredProducts = search
    ? products.filter((product) => product.title.toLowerCase().includes(search))
    : data?.products;
  res.json(filteredProducts);
});

router.get("/:id", authenticateToken, (req: Request, res: Response) => {
  const productId = parseInt(req?.params?.id);
  const products: Product[] = data?.products;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

export default router;
