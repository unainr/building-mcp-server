import { Hono } from 'hono'
import { StreamableHTTPTransport } from "@hono/mcp";
import { buildServer } from './server';

const app = new Hono()

app.get("/", (c) => c.text("MCP server is running. Endpoint: /mcp"));
app.all("/mcp", async (c) => {
  const server = buildServer();               // fresh server per request (stateless)
  const transport = new StreamableHTTPTransport();
  await server.connect(transport);
  return transport.handleRequest(c);
});

export default app
