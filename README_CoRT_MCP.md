# 🧠 CoRT MCP Server - Chain of Recursive Thoughts for AI Agents

### Files:

1. **`mcp_server_cort.js`** - The main MCP server
2. **`package.json`** - Node.js dependencies
3. **`claude_desktop_config_example.json`** - Claude Desktop configuration
4. **`CoRT_MCP_Guide.md`** - Comprehensive usage guide
5. **`SETUP_INSTRUCTIONS.md`** - Quick setup steps
6. **`test_mcp_cort.js`** - Test script to verify everything works
7. **`README_CoRT_MCP.md`** - This summary (you're reading it!)

## The Core CoRT Logic (Extracted for AI Agents)

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

## How to Use

### Quick Setup:

```bash
npm install
node mcp_server_cort.js  # Test it works
```

### Configure Claude Desktop:

Update your `claude_desktop_config.json` with the example provided.

### Tell Your AI Agent:

> "Use the CoRT MCP server to learn recursive thinking. Call `get_cort_concept` first, then `get_cort_workflow` to see how to implement it."

## Available MCP Tools

Your AI agent gets access to:

- 🧠 **`get_cort_concept`** - Learn the methodology
- 📋 **`get_cort_workflow`** - Get implementation steps
- 🎯 **`determine_thinking_rounds`** - Analyze question complexity
- 🔄 **`generate_alternative_prompt`** - Create alternatives
- ⚖️ **`generate_evaluation_prompt`** - Evaluate responses
- 📝 **`format_thinking_process`** - Present results

## What This Achieves

✅ **Extracts the core CoRT logic** from your Python implementation  
✅ **Makes it available to any AI agent** via MCP protocol  
✅ **Provides ready-to-use prompts** for each phase  
✅ **Includes examples and templates** for implementation  
✅ **Works with Claude Desktop** and other MCP clients  
✅ **Teaches systematic self-improvement** through recursive thinking

## Example AI Agent Transformation

**Before CoRT:**

```
User: "How do I improve my productivity?"
AI: "Try time blocking and eliminate distractions."
```

**After CoRT:**

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

## The Magic

This MCP server essentially gives your AI agent the ability to **argue with itself productively**. Instead of giving the first answer that comes to mind, it:

1. **Questions its own responses**
2. **Generates competing alternatives**
3. **Evaluates options systematically**
4. **Iteratively improves through multiple rounds**
5. **Shows its work transparently**

The result? **Significantly better AI responses** through systematic self-doubt and iterative refinement.

## Testing

Run the test suite to verify everything works:

```bash
node test_mcp_cort.js
```

This tests all MCP tools and confirms your server is ready to teach AI agents recursive thinking.

---

**You now have the extracted CoRT logic as a portable MCP server that can teach any AI agent to think recursively!** 🚀

Your agent will transform from giving quick answers to engaging in thoughtful, multi-round analysis that produces much higher quality responses.
