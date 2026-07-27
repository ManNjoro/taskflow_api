import pino from "pino";
import { env } from "../config/env.js";

export const logger = pino({
  level: env.logLevel,
  transport: env.isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true, // Adds color-coded log levels
          translateTime: "SYS:standard", // Formats timestamp to a readable date
          ignore: "pid,hostname", // Hides noisy metadata fields
        },
      },
});
