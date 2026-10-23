import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

export function registerDevTools(server: McpServer) {
  server.registerTool(
    "generate_uuid",
    {
      description: "Generate a random UUID v4",
      inputSchema: {},
    },
    async () => ({
      content: [{ type: "text" as const, text: createId() }],
    })
  );

  server.registerTool(
    "slugify",
    {
      description: "Turn text into a URL slug",
      inputSchema: { text: z.string() },
    },
    async ({ text }) => ({
      content: [
        {
          type: "text" as const,
          text: text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        },
      ],
    })
  );

  server.registerTool(
    "base64_encode",
    {
      description: "Encode text to base64",
      inputSchema: { text: z.string() },
    },
    async ({ text }) => ({
      content: [{ type: "text" as const, text: btoa(text) }],
    })
  );

  server.registerTool(
    "base64_decode",
    {
      description: "Decode a base64 string to text",
      inputSchema: { text: z.string() },
    },
    async ({ text }) => {
      try {
        return { content: [{ type: "text" as const, text: atob(text) }] };
      } catch {
        return {
          isError: true,
          content: [{ type: "text" as const, text: "Invalid base64 string" }],
        };
      }
    }
  );
}