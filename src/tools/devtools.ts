import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

export function registerDevTools(server: McpServer) {
  server.tool("generate_uuid", "Generate a random UUID v4", {}, async () => ({
    content: [{ type: "text", text: createId() }],
  }));

  server.tool(
    "slugify",
    "Turn text into a URL slug",
    { text: z.string() },
    async ({ text }) => ({
      content: [{
        type: "text",
        text: text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      }],
    })
  );

  server.tool(
    "base64_encode",
    "Encode text to base64",
    { text: z.string() },
    async ({ text }) => ({
      content: [{ type: "text", text: btoa(text) }],
    })
  );
}