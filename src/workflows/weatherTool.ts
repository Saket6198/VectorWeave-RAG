import { createTool } from "@mastra/core";
import { z } from "zod";
import { getWeatherInfo } from "../tools/weatherApi";

export const getWeatherTool = createTool({
  id: "getWeatherInfo",
  description: `Fetches the current weather information for a given city`,
  inputSchema: z.object({
    city: z.string().describe("The name of the city to get weather for"),
  }),
  outputSchema: z.any(),
  execute: async ({ context: { city } }) => {
    console.log(`🔧 [TOOL] getWeatherInfo called with: ${city}`);
    return await getWeatherInfo(city);
  },
});
