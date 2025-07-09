#!/usr/bin/env node

/**
 * Chain of Recursive Thoughts (CoRT) MCP Server
 * Teaches AI agents how to implement recursive thinking patterns
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

class CoRTMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "cort-guidance-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "get_cort_concept",
            description:
              "Get the core Chain of Recursive Thoughts concept and methodology",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "determine_thinking_rounds",
            description:
              "Determine how many rounds of recursive thinking are needed for a question",
            inputSchema: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                  description:
                    "The question or prompt to analyze for thinking complexity",
                },
              },
              required: ["question"],
            },
          },
          {
            name: "generate_alternative_prompt",
            description:
              "Get a prompt template for generating alternative responses",
            inputSchema: {
              type: "object",
              properties: {
                original_question: {
                  type: "string",
                  description: "The original question being answered",
                },
                current_response: {
                  type: "string",
                  description: "The current best response to improve upon",
                },
                alternative_number: {
                  type: "number",
                  description: "Which alternative number this is (1-3)",
                  default: 1,
                },
              },
              required: ["original_question", "current_response"],
            },
          },
          {
            name: "generate_evaluation_prompt",
            description:
              "Get a prompt template for evaluating and selecting the best response",
            inputSchema: {
              type: "object",
              properties: {
                original_question: {
                  type: "string",
                  description: "The original question being answered",
                },
                current_best: {
                  type: "string",
                  description: "The current best response",
                },
                alternatives: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "Array of alternative responses to evaluate",
                },
              },
              required: ["original_question", "current_best", "alternatives"],
            },
          },
          {
            name: "get_cort_workflow",
            description:
              "Get the complete step-by-step CoRT workflow for implementation",
            inputSchema: {
              type: "object",
              properties: {
                include_examples: {
                  type: "boolean",
                  description: "Whether to include example implementations",
                  default: true,
                },
              },
            },
          },
          {
            name: "format_thinking_process",
            description:
              "Get a template for formatting the recursive thinking process results",
            inputSchema: {
              type: "object",
              properties: {
                show_alternatives: {
                  type: "boolean",
                  description:
                    "Whether to show all alternatives or just the selected responses",
                  default: true,
                },
              },
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_cort_concept":
            return { content: [{ type: "text", text: this.getCortConcept() }] };

          case "determine_thinking_rounds":
            return {
              content: [
                {
                  type: "text",
                  text: this.getThinkingRoundsPrompt(args.question),
                },
              ],
            };

          case "generate_alternative_prompt":
            return {
              content: [
                {
                  type: "text",
                  text: this.getAlternativePrompt(
                    args.original_question,
                    args.current_response,
                    args.alternative_number || 1
                  ),
                },
              ],
            };

          case "generate_evaluation_prompt":
            return {
              content: [
                {
                  type: "text",
                  text: this.getEvaluationPrompt(
                    args.original_question,
                    args.current_best,
                    args.alternatives
                  ),
                },
              ],
            };

          case "get_cort_workflow":
            return {
              content: [
                {
                  type: "text",
                  text: this.getCortWorkflow(args.include_examples !== false),
                },
              ],
            };

          case "format_thinking_process":
            return {
              content: [
                {
                  type: "text",
                  text: this.getThinkingProcessTemplate(
                    args.show_alternatives !== false
                  ),
                },
              ],
            };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    });
  }

  getCortConcept() {
    return `# Chain of Recursive Thoughts (CoRT) - Core Concept

## What is CoRT?
Chain of Recursive Thoughts is a methodology that makes AI responses better by:
- **Generating multiple alternative responses** to the same question
- **Self-evaluating** to pick the best response
- **Iterating** this process multiple rounds for complex questions

## Why It Works
1. **Self-Doubt as a Feature**: Questions the first response
2. **Competitive Generation**: Multiple approaches compete
3. **Iterative Refinement**: Each round can improve quality
4. **Dynamic Complexity**: Harder questions get more rounds

## Core Algorithm (4 Steps)
1. **Determine Thinking Rounds** (1-5 based on question complexity)
2. **Generate Initial Response** 
3. **Iterative Improvement** (for N rounds):
   - Generate 3 alternative responses
   - Evaluate all options (current + alternatives)
   - Select best with reasoning
4. **Return Final Result**

## Key Benefits
- Significantly improved response quality
- Better handling of complex/nuanced questions  
- Built-in quality control through self-evaluation
- Transparent reasoning process

Use the other tools in this MCP to get specific prompts and workflows for implementation.`;
  }

  getThinkingRoundsPrompt(question) {
    return `# Thinking Rounds Determination Prompt

Use this prompt to determine how many rounds of thinking are needed:

---

**PROMPT:**
"Given this message: "${question}"

How many rounds of iterative thinking (1-5) would be optimal to generate the best response?

Consider:
- Question complexity and nuance required
- Whether multiple perspectives would help
- If the topic benefits from iterative refinement

Respond with just a number between 1 and 5."

---

**Guidelines:**
- Simple factual questions: 1-2 rounds
- Complex analysis/advice: 3-4 rounds  
- Creative/strategic problems: 4-5 rounds
- Use your judgment based on the question's depth`;
  }

  getAlternativePrompt(originalQuestion, currentResponse, alternativeNumber) {
    return `# Alternative Generation Prompt

Use this prompt to generate alternative response #${alternativeNumber}:

---

**PROMPT:**
"Original message: ${originalQuestion}

Current response: ${currentResponse}

Generate an alternative response that might be better. Be creative and consider different approaches, perspectives, or methodologies.

Alternative response:"

---

**Tips for Better Alternatives:**
- Try different angles or frameworks
- Consider opposing viewpoints
- Use different levels of detail
- Apply different methodologies
- Vary the tone or structure
- Include different examples or analogies

**Temperature Setting:** Use higher temperature (0.7-0.9) for more creative alternatives.`;
  }

  getEvaluationPrompt(originalQuestion, currentBest, alternatives) {
    const alternativesList = alternatives
      .map((alt, i) => `${i + 1}. ${alt}`)
      .join("\n");

    return `# Response Evaluation Prompt

Use this prompt to evaluate and select the best response:

---

**PROMPT:**
"Original message: ${originalQuestion}

Evaluate these responses and choose the best one:

Current best: ${currentBest}

Alternatives:
${alternativesList}

Which response best addresses the original message? Consider:
- Accuracy and correctness
- Clarity and comprehensiveness  
- Practical value and actionability
- Appropriate depth and detail

First, respond with ONLY 'current' or a number (1-${alternatives.length}).
Then on a new line, explain your choice in one sentence."

---

**Temperature Setting:** Use lower temperature (0.2-0.3) for more consistent evaluation.
**Selection Criteria:** Prioritize accuracy > clarity > completeness > creativity`;
  }

  getCortWorkflow(includeExamples) {
    let workflow = `# Complete CoRT Implementation Workflow

## Step-by-Step Process

### 1. Determine Thinking Rounds
\`\`\`
rounds = determine_thinking_rounds(user_question)
\`\`\`

### 2. Generate Initial Response  
\`\`\`
current_best = generate_initial_response(user_question)
\`\`\`

### 3. Iterative Improvement Loop
\`\`\`
for round in range(1, rounds + 1):
    # Generate 3 alternatives
    alternatives = []
    for i in range(3):
        alt = generate_alternative(user_question, current_best, i+1)
        alternatives.append(alt)
    
    # Evaluate and select best
    best_response, explanation = evaluate_responses(
        user_question, current_best, alternatives
    )
    
    # Update current best
    current_best = best_response
    
    # Log the process
    log_round(round, alternatives, best_response, explanation)
\`\`\`

### 4. Format Final Result
\`\`\`
final_result = format_result(current_best, thinking_process)
\`\`\`

## Implementation Tips

1. **Use Different Temperatures:**
   - Thinking rounds determination: 0.3
   - Alternative generation: 0.7-0.9  
   - Response evaluation: 0.2-0.3

2. **Track Everything:**
   - Keep history of all alternatives
   - Record selection reasoning
   - Note which round produced final answer

3. **Quality Checks:**
   - Ensure alternatives are genuinely different
   - Verify evaluation reasoning makes sense
   - Check for improvement across rounds`;

    if (includeExamples) {
      workflow += `

## Example Implementation

### User Question: "How can I improve my productivity?"

**Round 0 (Initial):** "Use time blocking and eliminate distractions..."

**Round 1:**
- Alt 1: Focus on energy management and circadian rhythms
- Alt 2: Implement GTD (Getting Things Done) methodology  
- Alt 3: Use the Pomodoro Technique with habit stacking
- **Selected:** Alt 1 (energy management) - "More sustainable approach"

**Round 2:**
- Alt 1: Combine energy management with environmental design
- Alt 2: Add measurement and tracking to energy approach
- Alt 3: Include social accountability in energy system
- **Selected:** Alt 1 (environmental design) - "Addresses root causes"

**Final Response:** Comprehensive energy + environment productivity system`;
    }

    return workflow;
  }

  getThinkingProcessTemplate(showAlternatives) {
    return `# Thinking Process Formatting Template

## Basic Format
\`\`\`
# Recursive Thinking Result

## Final Response
[Your final selected response here]

## Thinking Process
**Rounds completed:** [N]
**Total alternatives considered:** [N * 3]

### Round-by-Round Breakdown
[Details for each round]
\`\`\`

## Detailed Round Format
\`\`\`
### Round [N]
**Current Best:** [Current response]

**Alternatives Generated:**
1. [Alternative 1] ${showAlternatives ? "" : "(Hidden in summary view)"}
2. [Alternative 2] ${showAlternatives ? "" : "(Hidden in summary view)"}  
3. [Alternative 3] ${showAlternatives ? "" : "(Hidden in summary view)"}

**Selection:** [Chosen response]
**Reasoning:** [Why this was selected]

---
\`\`\`

## Summary Format (for long processes)
\`\`\`
## Thinking Summary
- **Initial approach:** [Brief description]
- **Key pivots:** [Major changes in direction]
- **Final selection rationale:** [Why final answer was chosen]
- **Improvement over initial:** [How final is better than first]
\`\`\`

## Visualization Options
- ✅ = Selected response
- 💭 = Alternative considered  
- 🔄 = Iteration round
- 🎯 = Final result

This format helps users understand the thinking process and builds confidence in the final response.`;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("CoRT MCP Server running on stdio");
  }
}

// Run the server
const server = new CoRTMCPServer();
server.run().catch(console.error);
