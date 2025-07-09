# CoRT MCP Server Setup Instructions

## Quick Setup for Your AI Agent

### 1. Install the MCP Server

```bash
# In your project directory
npm install
```

### 2. Test the Server

```bash
# Make sure it works
node mcp_server_cort.js
```

If it starts without errors, press Ctrl+C to stop it.

### 3. Configure Claude Desktop

1. **Find your Claude config file:**

   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux:** `~/.config/Claude/claude_desktop_config.json`

2. **Update the config file** with the content from `claude_desktop_config_example.json`

3. **Replace the path** with your actual project path:

   - **Windows example:** `"C:\\Users\\YourName\\Desktop\\Work\\test\\Chain-of-Recursive-Thoughts"`
   - **macOS/Linux example:** `"/Users/YourName/Desktop/Work/test/Chain-of-Recursive-Thoughts"`

4. **Your final config should look like:**

   ```json
   {
     "mcpServers": {
       "cort-guidance": {
         "command": "node",
         "args": ["/your/actual/path/Chain-of-Recursive-Thoughts/mcp_server_cort.js"],
       }
     }
   }
   ```

5. **Restart Claude Desktop**

### 4. Test with Your AI Agent

Once configured, your AI agent can call these tools:

```
🧠 get_cort_concept - Learn the CoRT methodology
📋 get_cort_workflow - Get step-by-step implementation
🎯 determine_thinking_rounds - Analyze question complexity
🔄 generate_alternative_prompt - Create alternative responses
⚖️ generate_evaluation_prompt - Evaluate and select best response
📝 format_thinking_process - Format final results
```

### 5. Example AI Agent Usage

Tell your AI agent:

> "Use the CoRT MCP server to learn how to implement recursive thinking. Start by calling `get_cort_concept` to understand the methodology, then `get_cort_workflow` to see how to apply it step by step."

Your agent will then know how to:

1. Determine how many rounds of thinking a question needs
2. Generate alternative responses
3. Evaluate and select the best response
4. Present the thinking process clearly

## What Your AI Agent Learns

The MCP server teaches your agent that **Chain of Recursive Thoughts** means:

1. **Don't give the first answer** - generate an initial response, then improve it
2. **Generate alternatives** - create 3 different approaches for each round
3. **Self-evaluate** - compare options and pick the best with clear reasoning
4. **Iterate** - repeat this process for multiple rounds on complex questions
5. **Show the work** - present the thinking process transparently

This transforms any AI agent into a more thoughtful, self-correcting system that produces significantly better responses through systematic self-improvement.

## Troubleshooting

**Server won't start?**

- Check Node.js version (needs 18+)
- Run `npm install` to get dependencies
- Check file permissions on Unix systems

**Claude can't find the server?**

- Verify the path in your config is absolute and correct
- Make sure you restarted Claude Desktop
- Check that the working directory exists

**Tools not appearing?**

- Confirm the MCP server is listed in Claude's settings
- Check the console/logs for any error messages
- Try the server manually first to confirm it works

You're now ready to give your AI agent the power of recursive thinking! 🚀
