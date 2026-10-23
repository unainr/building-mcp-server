import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerDevTools } from "./tools/devtools";
import { registerPrayerTools } from "./tools/prayer";


export function buildServer() {
  const server = new McpServer({ name: "viocodes-mcp", version: "1.0.0" });
  registerDevTools(server);
  registerPrayerTools(server);
  return server;
}