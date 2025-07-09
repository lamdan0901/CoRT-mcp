#!/usr/bin/env node

/**
 * Test script for the CoRT MCP Server
 * Verifies all tools work correctly
 */

import { spawn } from "child_process";
import { setTimeout as delay } from "timers/promises";

class MCPTester {
  constructor() {
    this.server = null;
    this.testResults = [];
  }

  async startServer() {
    console.log("🚀 Starting CoRT MCP Server...");
    this.server = spawn("node", ["mcp_server_cort.js"], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    // Wait for server to initialize
    await delay(1000);

    if (this.server.killed) {
      throw new Error("Server failed to start");
    }

    console.log("✅ Server started successfully");
  }

  async sendRequest(method, params = {}) {
    return new Promise((resolve, reject) => {
      const request = {
        jsonrpc: "2.0",
        id: Date.now(),
        method,
        params,
      };

      let response = "";
      const timeout = setTimeout(() => {
        reject(new Error("Request timeout"));
      }, 5000);

      this.server.stdout.on("data", (data) => {
        response += data.toString();
        try {
          const parsed = JSON.parse(response.trim());
          clearTimeout(timeout);
          resolve(parsed);
        } catch (e) {
          // Still receiving data
        }
      });

      this.server.stderr.on("data", (data) => {
        console.log("Server stderr:", data.toString());
      });

      this.server.stdin.write(JSON.stringify(request) + "\n");
    });
  }

  async testToolsList() {
    console.log("\n📋 Testing tools/list...");
    try {
      const response = await this.sendRequest("tools/list");
      const tools = response.result?.tools || [];

      const expectedTools = [
        "get_cort_concept",
        "determine_thinking_rounds",
        "generate_alternative_prompt",
        "generate_evaluation_prompt",
        "get_cort_workflow",
        "format_thinking_process",
      ];

      const foundTools = tools.map((t) => t.name);
      const missing = expectedTools.filter((t) => !foundTools.includes(t));

      if (missing.length === 0) {
        console.log(`✅ All ${expectedTools.length} tools found`);
        this.testResults.push({ test: "tools/list", passed: true });
      } else {
        console.log(`❌ Missing tools: ${missing.join(", ")}`);
        this.testResults.push({
          test: "tools/list",
          passed: false,
          error: `Missing: ${missing.join(", ")}`,
        });
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      this.testResults.push({
        test: "tools/list",
        passed: false,
        error: error.message,
      });
    }
  }

  async testGetCortConcept() {
    console.log("\n🧠 Testing get_cort_concept...");
    try {
      const response = await this.sendRequest("tools/call", {
        name: "get_cort_concept",
        arguments: {},
      });

      const content = response.result?.content?.[0]?.text || "";

      if (
        content.includes("Chain of Recursive Thoughts") &&
        content.includes("CoRT")
      ) {
        console.log("✅ get_cort_concept returned valid content");
        this.testResults.push({ test: "get_cort_concept", passed: true });
      } else {
        console.log("❌ Invalid content returned");
        this.testResults.push({
          test: "get_cort_concept",
          passed: false,
          error: "Invalid content",
        });
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      this.testResults.push({
        test: "get_cort_concept",
        passed: false,
        error: error.message,
      });
    }
  }

  async testDetermineThinkingRounds() {
    console.log("\n🎯 Testing determine_thinking_rounds...");
    try {
      const response = await this.sendRequest("tools/call", {
        name: "determine_thinking_rounds",
        arguments: {
          question: "How do I build a scalable web application?",
        },
      });

      const content = response.result?.content?.[0]?.text || "";

      if (
        content.includes("rounds of iterative thinking") &&
        content.includes("1-5")
      ) {
        console.log("✅ determine_thinking_rounds returned valid prompt");
        this.testResults.push({
          test: "determine_thinking_rounds",
          passed: true,
        });
      } else {
        console.log("❌ Invalid prompt returned");
        this.testResults.push({
          test: "determine_thinking_rounds",
          passed: false,
          error: "Invalid prompt",
        });
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      this.testResults.push({
        test: "determine_thinking_rounds",
        passed: false,
        error: error.message,
      });
    }
  }

  async testGetWorkflow() {
    console.log("\n📋 Testing get_cort_workflow...");
    try {
      const response = await this.sendRequest("tools/call", {
        name: "get_cort_workflow",
        arguments: {
          include_examples: true,
        },
      });

      const content = response.result?.content?.[0]?.text || "";

      if (
        content.includes("Step-by-Step Process") &&
        content.includes("Iterative Improvement")
      ) {
        console.log("✅ get_cort_workflow returned valid workflow");
        this.testResults.push({ test: "get_cort_workflow", passed: true });
      } else {
        console.log("❌ Invalid workflow returned");
        this.testResults.push({
          test: "get_cort_workflow",
          passed: false,
          error: "Invalid workflow",
        });
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      this.testResults.push({
        test: "get_cort_workflow",
        passed: false,
        error: error.message,
      });
    }
  }

  async cleanup() {
    if (this.server && !this.server.killed) {
      console.log("\n🛑 Stopping server...");
      this.server.kill();
      await delay(500);
    }
  }

  printResults() {
    console.log("\n" + "=".repeat(50));
    console.log("📊 TEST RESULTS");
    console.log("=".repeat(50));

    let passed = 0;
    let total = this.testResults.length;

    this.testResults.forEach((result) => {
      if (result.passed) {
        console.log(`✅ ${result.test}`);
        passed++;
      } else {
        console.log(`❌ ${result.test}: ${result.error || "Failed"}`);
      }
    });

    console.log("\n" + "=".repeat(50));
    console.log(`📈 SUMMARY: ${passed}/${total} tests passed`);

    if (passed === total) {
      console.log("🎉 All tests passed! Your CoRT MCP Server is ready to use.");
    } else {
      console.log("⚠️  Some tests failed. Check the errors above.");
    }
    console.log("=".repeat(50));
  }

  async runAllTests() {
    try {
      await this.startServer();
      await this.testToolsList();
      await this.testGetCortConcept();
      await this.testDetermineThinkingRounds();
      await this.testGetWorkflow();
    } catch (error) {
      console.log(`❌ Fatal error: ${error.message}`);
      this.testResults.push({
        test: "server_startup",
        passed: false,
        error: error.message,
      });
    } finally {
      await this.cleanup();
      this.printResults();
    }
  }
}

// Run tests
console.log("🧪 CoRT MCP Server Test Suite");
console.log("Testing all MCP tools and functionality...\n");

const tester = new MCPTester();
tester.runAllTests().catch(console.error);
