# Chain of Recursive Thoughts (CoRT) MCP Server Guide

## Overview

This Node.js MCP server teaches AI agents how to implement the **Chain of Recursive Thoughts** methodology. When your AI agent calls this MCP, it receives:

- Core CoRT concepts and methodology
- Step-by-step implementation workflows
- Prompt templates for each phase
- Formatting guidelines
- Real examples

**Attribution:** This MCP server is inspired by and based on the innovative work from [@PhialsBasement/Chain-of-Recursive-Thoughts](https://github.com/PhialsBasement/Chain-of-Recursive-Thoughts) - "I made my AI think harder by making it argue with itself repeatedly. It works stupidly well."

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Test the Server

```bash
node mcp_server_cort.js
```

### 3. Configure Your IDE

#### For Cursor IDE

1. **Open Settings:** `Ctrl/Cmd + ,` → search for "MCP"
2. **Add MCP Server** or edit your `settings.json`:

```json
{
  "mcp.servers": {
    "cort-guidance": {
      "command": "node",
      "args": ["/absolute/path/to/mcp_server_cort.js"]
    }
  }
}
```

#### For Claude Desktop

```json
{
  "mcpServers": {
    "cort-guidance": {
      "command": "node",
      "args": ["/path/to/your/mcp_server_cort.js"],
      "env": {},
      "disabled": false
    }
  }
}
```

## Available Tools

### 1. `get_cort_concept`

**Purpose:** Get the core Chain of Recursive Thoughts concept  
**Parameters:** None  
**Returns:** Complete explanation of CoRT methodology

**Example Usage:**

```
When my AI agent calls this tool, it learns that CoRT involves:
- Generating multiple alternative responses
- Self-evaluating to pick the best one
- Iterating this process multiple rounds
```

### 2. `determine_thinking_rounds`

**Purpose:** Get a prompt to determine how many thinking rounds are needed  
**Parameters:**

- `question` (string): The question to analyze

**Returns:** A prompt template for determining thinking complexity

**Example:**

```javascript
// AI agent calls:
determine_thinking_rounds({
  question: "How do I build a scalable web application?"
})

// Returns prompt:
"Given this message: 'How do I build a scalable web application?'
How many rounds of iterative thinking (1-5) would be optimal...?"
```

### 3. `generate_alternative_prompt`

**Purpose:** Get a prompt template for generating alternative responses  
**Parameters:**

- `original_question` (string): The original question
- `current_response` (string): Current best response
- `alternative_number` (number, optional): Which alternative (1-3)

**Returns:** Prompt for generating creative alternatives

### 4. `generate_evaluation_prompt`

**Purpose:** Get a prompt template for evaluating responses  
**Parameters:**

- `original_question` (string): The original question
- `current_best` (string): Current best response
- `alternatives` (array): List of alternative responses

**Returns:** Prompt for evaluating and selecting the best response

### 5. `get_cort_workflow`

**Purpose:** Get the complete step-by-step implementation workflow  
**Parameters:**

- `include_examples` (boolean, optional): Whether to include examples

**Returns:** Complete implementation guide with optional examples

### 6. `format_thinking_process`

**Purpose:** Get templates for formatting the thinking process results  
**Parameters:**

- `show_alternatives` (boolean, optional): Whether to show all alternatives

**Returns:** Formatting templates for presenting results

## The Core CoRT Logic

Your AI agent learns this 4-step process:

### 1. **Determine Thinking Rounds** (1-5 based on complexity)

```
Simple questions → 1-2 rounds
Complex analysis → 3-4 rounds
Creative problems → 4-5 rounds
```

### 2. **Generate Initial Response**

Start with a first attempt at answering

### 3. **Iterative Improvement** (Repeat N times)

- Generate 3 alternative approaches
- Evaluate all options (current + alternatives)
- Select the best with clear reasoning
- Use the winner as the new "current best"

### 4. **Present Final Result**

Show the final answer + thinking process

## How Your AI Agent Uses This

### Basic Usage Pattern

1. **Agent calls `get_cort_concept`** to understand the methodology
2. **Agent calls `get_cort_workflow`** to get implementation steps
3. **For each user question, agent calls:**
   - `determine_thinking_rounds` to decide complexity
   - `generate_alternative_prompt` to create alternatives (3x)
   - `generate_evaluation_prompt` to select the best
   - `format_thinking_process` to present results

### Example AI Agent Flow

```javascript
// Step 1: Learn the concept
const concept = await mcp.call("get_cort_concept");

// Step 2: Get workflow
const workflow = await mcp.call("get_cort_workflow", {
  include_examples: true,
});

// Step 3: For user question "How do I improve my productivity?"
const roundsPrompt = await mcp.call("determine_thinking_rounds", {
  question: "How do I improve my productivity?",
});

// Step 4: Agent determines 3 rounds needed, generates initial response
let currentBest =
  "Use time management techniques and eliminate distractions...";

// Step 5: For each round, generate alternatives
for (let round = 1; round <= 3; round++) {
  // Generate 3 alternatives
  for (let alt = 1; alt <= 3; alt++) {
    const altPrompt = await mcp.call("generate_alternative_prompt", {
      original_question: "How do I improve my productivity?",
      current_response: currentBest,
      alternative_number: alt,
    });
    // Agent uses this prompt to generate alternative
  }

  // Evaluate alternatives
  const evalPrompt = await mcp.call("generate_evaluation_prompt", {
    original_question: "How do I improve my productivity?",
    current_best: currentBest,
    alternatives: [alt1, alt2, alt3],
  });
  // Agent selects best response
}

// Step 6: Format final result
const formatTemplate = await mcp.call("format_thinking_process");
// Agent presents final response using template
```

## What This Achieves - The AI Transformation

### Before CoRT:

```
User: "How do I improve my productivity?"
AI: "Try time blocking and eliminate distractions."
```

### After CoRT:

```
User: "How do I improve my productivity?"

AI: [Calls determine_thinking_rounds] → 3 rounds needed
     [Generates initial response] → Time blocking approach
     [Round 1: Creates 3 alternatives] → Energy, GTD, Pomodoro
     [Evaluates and selects] → Energy management wins
     [Round 2: Creates 3 alternatives] → Environment, tracking, accountability
     [Evaluates and selects] → Environmental design wins
     [Round 3: Refines further] → Final comprehensive system

Final Response: "Here's a comprehensive productivity system based on energy management and environmental design... [detailed response]

## My Thinking Process:
- Started with basic time blocking
- Round 1: Pivoted to energy management (more sustainable)
- Round 2: Added environmental design (addresses root causes)
- Round 3: Integrated measurement and habits
- Final result is 3x more comprehensive than initial response"
```

## The Magic Behind CoRT

This MCP server essentially gives your AI agent the ability to **argue with itself productively**. Instead of giving the first answer that comes to mind, it:

1. **Questions its own responses**
2. **Generates competing alternatives**
3. **Evaluates options systematically**
4. **Iteratively improves through multiple rounds**
5. **Shows its work transparently**

## Key Benefits for AI Agents

1. **Structured Learning:** Clear step-by-step methodology
2. **Ready-to-Use Prompts:** No need to craft prompts from scratch
3. **Quality Assurance:** Built-in evaluation and selection process
4. **Transparency:** Clear formatting for showing the thinking process
5. **Flexibility:** Adjustable rounds and alternatives based on complexity
6. **Significant Quality Improvement:** Transform quick answers into thoughtful, multi-round analysis

## Integration Examples

### With Cursor IDE

Once configured, you can use CoRT tools in your conversations:

```
Tell me about the Chain of Recursive Thoughts methodology
[Your AI assistant calls get_cort_concept automatically]
```

### With Claude Desktop

Once configured, your Claude conversations can use:

```
Tell me about the Chain of Recursive Thoughts methodology
[Claude calls get_cort_concept automatically]
```

### With Custom AI Applications

```javascript
// In your AI application
const cortGuidance = await mcpClient.callTool("get_cort_workflow");
// Use the workflow to implement CoRT in your AI responses
```

## Advanced Usage

### Custom Implementation

Your AI agent can:

- Adjust the number of alternatives per round
- Modify evaluation criteria
- Customize the formatting style
- Add domain-specific considerations

### Quality Control

The MCP provides guidelines for:

- Ensuring alternatives are genuinely different
- Verifying evaluation reasoning
- Checking for improvement across rounds
- Maintaining response quality

## Troubleshooting

### Common Issues

**Server won't start?**

- Check Node.js version (needs 18+)
- Run `npm install` to get dependencies
- Verify all dependencies are properly installed

**Cursor can't find the server?**

- Verify the path in your `mcp.servers` config is absolute and correct
- Make sure you restarted Cursor after configuration changes
- Check that both the `args` path and `cwd` directory exist and are accessible
- Look for the MCP panel in Cursor's sidebar to check server status

**Claude can't find the server?**

- Verify the path in your config is absolute and correct
- Make sure you restarted Claude Desktop after config changes
- Check that the project directory exists and is accessible

**Tools not appearing in your IDE?**

- **Cursor:** Check MCP panel in sidebar, use "MCP: Restart Servers" from Command Palette
- **Claude:** Confirm the MCP server is listed in Claude's settings
- Check the console/logs for any error messages
- Try running the server manually first to confirm it works

### Testing Your Setup

```bash
# Test MCP server directly
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node mcp_server_cort.js

# Or run the test suite
node test_mcp_cort.js
```

### IDE Configuration Help

#### Cursor IDE Configuration

**Settings Location:**

- Open Cursor → Settings (`Ctrl/Cmd + ,`) → Search "MCP"
- Or edit `settings.json` directly through Command Palette (`Ctrl/Cmd + Shift + P`)

**Configuration Format:**

```json
{
  "mcp.servers": {
    "cort-guidance": {
      "command": "node",
      "args": ["/absolute/path/to/mcp_server_cort.js"],
      "env": {}
    }
  }
}
```

**Cursor-specific tips:**

- Use absolute paths for both `args` and `cwd`
- Restart Cursor after configuration changes
- Check the MCP panel in Cursor's sidebar to verify connection
- Use Command Palette → "MCP: Restart Servers" if needed

#### Claude Desktop Configuration

**Find your Claude config file:**

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

**Configuration Format:**

```json
{
  "mcpServers": {
    "cort-guidance": {
      "command": "node",
      "args": ["/path/to/your/mcp_server_cort.js"],
      "env": {},
      "disabled": false
    }
  }
}
```

**Configuration field explanations:**

- `command`: The executable to run (always "node" for Node.js servers)
- `args`: Array containing the path to your MCP server script
- `env`: Object for environment variables (can be empty `{}`)
- `disabled`: Boolean to enable/disable the server (set to `false` to enable)

**Path format examples:**

- **Windows:** `"C:\\Users\\YourName\\path\\to\\mcp_server_cort.js"`
- **macOS/Linux:** `"/Users/YourName/path/to/mcp_server_cort.js"`

## Next Steps

1. **Install and Configure:** Set up the MCP server (`npm install` → configure your IDE)
2. **Test Basic Calls:** Try each tool individually
3. **Implement in Agent:** Use the workflow in your AI agent
4. **Customize:** Adapt prompts and processes for your use case
5. **Monitor Results:** Track improvement in response quality

## Quick Start Summary

```bash
# 1. Install
npm install

# 2. Test
node mcp_server_cort.js

# 3. Configure your IDE (Cursor or Claude Desktop) with the path to mcp_server_cort.js

# 4. Tell your agent: "Use the CoRT MCP to learn recursive thinking"
```

---

**You now have the complete CoRT methodology as a portable MCP server that can teach any AI agent to think recursively!** 🚀

This MCP server transforms any AI agent into a recursive thinker, significantly improving response quality through systematic self-evaluation and iterative refinement. Your agent will evolve from giving quick answers to engaging in thoughtful, multi-round analysis that produces much higher quality responses.
