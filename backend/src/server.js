import dotenv from "dotenv";
dotenv.config();
import aiRoutes from "./routes/aiRoutes.js";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

