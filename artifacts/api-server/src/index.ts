import app from "./app";
import { logger } from "./lib/logger";

// Vercel serverless: needs the Express app exported as default handler
export default app;

// Local / Replit / container: start the HTTP server when PORT is provided
const rawPort = process.env["PORT"];
if (rawPort) {
  const port = Number(rawPort);
  if (Number.isNaN(port) || port <= 0) {
    logger.error({ rawPort }, "Invalid PORT value");
    process.exit(1);
  }
  app.listen(port, () => {
    logger.info({ port }, "Server listening");
  });
}
