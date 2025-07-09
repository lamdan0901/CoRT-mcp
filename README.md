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

### 2. Make Executable (Unix/Linux/Mac)

```bash
chmod +x mcp_server_cort.js
```

### 3. Test the Server

```bash
node mcp_server_cort.js
```

### 4. Configure in Cursor

```json
{
  "mcpServers": {
    "cort-guidance": {
      "command": "node",
      "args": ["/path/to/your/mcp_server_cort.js"]
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

## Key Benefits for AI Agents

1. **Structured Learning:** Clear step-by-step methodology
2. **Ready-to-Use Prompts:** No need to craft prompts from scratch
3. **Quality Assurance:** Built-in evaluation and selection process
4. **Transparency:** Clear formatting for showing the thinking process
5. **Flexibility:** Adjustable rounds and alternatives based on complexity

## Integration Examples

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

1. **Node.js Version:** Requires Node.js 18+
2. **File Permissions:** Make sure the script is executable
3. **Path Configuration:** Use absolute paths in Claude config
4. **MCP SDK Version:** Ensure compatible version installed

### Testing

```bash
# Test MCP server directly
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node mcp_server_cort.js
```

## Next Steps

1. **Install and Configure:** Set up the MCP server
2. **Test Basic Calls:** Try each tool individually
3. **Implement in Agent:** Use the workflow in your AI agent
4. **Customize:** Adapt prompts and processes for your use case
5. **Monitor Results:** Track improvement in response quality

This MCP server transforms any AI agent into a recursive thinker, significantly improving response quality through systematic self-evaluation and iterative refinement.
