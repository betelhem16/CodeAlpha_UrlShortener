import express, { Request, Response, NextFunction } from "express";
import urlRoutes from "./routes/urls";
import redirectRoutes from "./routes/redirect";
const app = express();
const PORT = process.env.PORT || 3000;

// Global middleware
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api", urlRoutes);
// Health check — trivial, but every real service should have one
app.use("/", redirectRoutes);  
// Routes will be mounted here as we build them


// 404 handler — catches any request that didn't match a route above
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler — must have exactly 4 params for Express to recognize it
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
