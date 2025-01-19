/**
 * MCP server that returns the difference between strings in Unified Diff format.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { generateUnifiedDiff } from "./diffGetter.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "mcp-server-diff-typescript",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

/**

 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get-unified-diff",
        description: "Get the difference between two text articles in Unified diff format.",
        inputSchema: {
          type: "object",
          properties: {
            oldString: {
              type: "string",
              description: "old string to compare"
            },
            newString: {
              type: "string",
              description: "new string to compare"
            }
          },
          required: ["oldString", "newString"]
        }
      }
    ]
  };
});

/**
 * Handler for the create_note and get-unified-diff tools.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "get-unified-diff": {
      const oldString = String(request.params.arguments?.oldString);
      const newString = String(request.params.arguments?.newString);
      if (!oldString || !newString) {
        throw new Error("oldString and newString are required");
      }

      const diffResult = generateUnifiedDiff(oldString, newString, "", "", "");

      return {
        content: [{
          type: "text",
          text: diffResult
        }]
      };
    }
    default:
      throw new Error("Unknown tool");
  }
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
