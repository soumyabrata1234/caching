#!/usr/bin/env node

const { program } = require("commander");
const { startServer } = require("./server");
const { clearCache } = require("./cache");

program
  .option("--port <number>", "Port to run the proxy server on")
  .option("--origin <url>", "Origin server URL")
  .option("--clear-cache", "Clear the cache");

program.parse();

const options = program.opts();

if (options.clearCache) {
  clearCache();
  console.log("✅ Cache cleared");
  process.exit(0);
}

if (options.port && options.origin) {
  const port = parseInt(options.port);
  const origin = options.origin;
  startServer(port, origin);
} else {
  console.log("❌ Please provide --port and --origin OR use --clear-cache");
}
