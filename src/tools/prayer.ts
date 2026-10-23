import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerPrayerTools(server: McpServer) {
  server.tool(
    "prayer_times",
    "Get today's prayer times for a city",
    {
      city: z.string().default("Karachi"),
      country: z.string().default("Pakistan"),
    },
    async ({ city, country }) => {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=1`;
      const res = await fetch(url);
      if (!res.ok) {
        return { isError: true, content: [{ type: "text", text: `API error ${res.status}` }] };
      }
      const { data } = (await res.json()) as any;
      const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.timings;
      return {
        content: [{
          type: "text",
          text: `Prayer times for ${city}:\nFajr ${Fajr}\nDhuhr ${Dhuhr}\nAsr ${Asr}\nMaghrib ${Maghrib}\nIsha ${Isha}`,
        }],
      };
    }
  );
}