import { Router } from "express";
const router = Router();

// Example route
router.get("/products", (req, res) => {
  res.send("Product list");
});

export default router;
