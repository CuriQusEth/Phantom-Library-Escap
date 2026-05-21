import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json({
    status: "MCP Server Active. Use POST for JSON-RPC."
  }, {
    headers: corsHeaders
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jsonrpc, method, params, id } = body;

    if (jsonrpc !== '2.0') {
      return NextResponse.json({ jsonrpc: "2.0", id, error: { code: -32600, message: "Invalid Request" } }, { status: 400, headers: corsHeaders });
    }

    if (method === 'initialize') {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2.0",
          capabilities: { tools: {}, prompts: {}, resources: {} },
          serverInfo: { name: "Phantom Library Orchestrator", version: "1.0.0" }
        }
      }, { headers: corsHeaders });
    }

    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            { name: "get_race_status", description: "Get the current race status", inputSchema: { type: "object", properties: {} } },
            { name: "start_race", description: "Start a new race", inputSchema: { type: "object", properties: {} } },
            { name: "get_leaderboard", description: "Retrieve the leaderboard", inputSchema: { type: "object", properties: {} } },
            { name: "optimize_speed", description: "Optimize racing speed", inputSchema: { type: "object", properties: {} } },
            { name: "get_track_info", description: "Get track information", inputSchema: { type: "object", properties: {} } }
          ]
        }
      }, { headers: corsHeaders });
    }

    if (method === 'tools/call') {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: `Tool ${params?.name || 'unknown'} executed successfully.` }]
        }
      }, { headers: corsHeaders });
    }

    if (method === 'prompts/list') {
      return NextResponse.json({ jsonrpc: "2.0", id, result: { prompts: [] } }, { headers: corsHeaders });
    }

    if (method === 'resources/list') {
      return NextResponse.json({ jsonrpc: "2.0", id, result: { resources: [] } }, { headers: corsHeaders });
    }

    return NextResponse.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } }, { status: 404, headers: corsHeaders });

  } catch (error) {
    return NextResponse.json({ jsonrpc: "2.0", error: { code: -32700, message: "Parse error" } }, { status: 400, headers: corsHeaders });
  }
}
