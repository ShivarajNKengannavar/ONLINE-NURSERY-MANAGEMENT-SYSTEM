import { Router } from "express";
const router = Router();

// Example route
router.post("/login", (req, res) => {
  res.send("Login route");
});

export default router;
