import app from "./src/app.js";
import { connectDB } from "./src/db/database.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received, shutting down");
      server.close(() => process.exit(0));
    });
    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down");
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
