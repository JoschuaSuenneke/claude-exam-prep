export interface Question {
  id: number;
  scenario: string;
  domain: string;
  text: string;
  choices: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  isAiGenerated?: boolean;
  source?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    scenario: "Customer Support Resolution Agent",
    domain: "Agentic Architecture & Orchestration",
    text: "Production data shows that in 12% of cases, your agent skips get_customer entirely and calls lookup_order using only the customer's stated name, occasionally leading to misidentified accounts and incorrect refunds. What change would most effectively address this reliability issue?",
    choices: [
      { label: "A", text: "Add a programmatic prerequisite that blocks lookup_order and process_refund calls until get_customer has returned a verified customer ID." },
      { label: "B", text: "Enhance the system prompt to state that customer verification via get_customer is mandatory before any order operations." },
      { label: "C", text: "Add few-shot examples showing the agent always calling get_customer first, even when customers volunteer order details." },
      { label: "D", text: "Implement a routing classifier that analyzes each request and enables only the subset of tools appropriate for that request type." }
    ],
    correctAnswer: "A",
    explanation: "When a specific tool sequence is required for critical business logic (like verifying customer identity before processing refunds), programmatic enforcement provides deterministic guarantees that prompt-based approaches cannot. Options B and C rely on probabilistic LLM compliance, which is insufficient when errors have financial consequences. Option D addresses tool availability rather than tool ordering, which is not the actual problem."
  },
  {
    id: 2,
    scenario: "Customer Support Resolution Agent",
    domain: "Tool Design & MCP Integration",
    text: "Production logs show the agent frequently calls get_customer when users ask about orders (e.g., \"check my order #12345\"), instead of calling lookup_order. Both tools have minimal descriptions (\"Retrieves customer information\" / \"Retrieves order details\") and accept similar identifier formats. What's the most effective first step to improve tool selection reliability?",
    choices: [
      { label: "A", text: "Add few-shot examples to the system prompt demonstrating correct tool selection patterns, with 5-8 examples showing order-related queries routing to lookup_order." },
      { label: "B", text: "Expand each tool's description to include input formats, example queries, edge cases, and boundaries explaining when to use it versus similar alternatives." },
      { label: "C", text: "Implement a routing layer that parses user input before each turn and pre-selects the appropriate tool based on detected keywords and identifier patterns." },
      { label: "D", text: "Consolidate both tools into a single lookup_entity tool that accepts any identifier and internally determines which backend to query." }
    ],
    correctAnswer: "B",
    explanation: "Tool descriptions are the primary mechanism LLMs use for tool selection. When descriptions are minimal, models lack the context to differentiate between similar tools. Option B directly addresses this root cause with a low-effort, high-leverage fix. Few-shot examples (A) add token overhead without fixing the underlying issue. A routing layer (C) is over-engineered and bypasses the LLM's natural language understanding. Consolidating tools (D) is a valid architectural choice but requires more effort than a \"first step\" warrants when the immediate problem is inadequate descriptions."
  },
  {
    id: 3,
    scenario: "Customer Support Resolution Agent",
    domain: "Context Management & Reliability",
    text: "Your agent achieves 55% first-contact resolution, well below the 80% target. Logs show it escalates straightforward cases (standard damage replacements with photo evidence) while attempting to autonomously handle complex situations requiring policy exceptions. What's the most effective way to improve escalation calibration?",
    choices: [
      { label: "A", text: "Add explicit escalation criteria to your system prompt with few-shot examples demonstrating when to escalate versus resolve autonomously." },
      { label: "B", text: "Have the agent self-report a confidence score (1-10) before each response and automatically route requests to humans when confidence falls below a threshold." },
      { label: "C", text: "Deploy a separate classifier model trained on historical tickets to predict which requests need escalation before the main agent begins processing." },
      { label: "D", text: "Implement sentiment analysis to detect customer frustration levels and automatically escalate when negative sentiment exceeds a threshold." }
    ],
    correctAnswer: "A",
    explanation: "Adding explicit escalation criteria with few-shot examples directly addresses the root cause: unclear decision boundaries. This is the proportionate first response before adding infrastructure. Option B fails because LLM self-reported confidence is poorly calibrated\u2014the agent is already incorrectly confident on hard cases. Option C is over-engineered, requiring labeled data and ML infrastructure when prompt optimization hasn't been tried. Option D solves a different problem entirely; sentiment doesn't correlate with case complexity, which is the actual issue."
  },
  {
    id: 4,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "You want to create a custom /review slash command that runs your team's standard code review checklist. This command should be available to every developer when they clone or pull the repository. Where should you create this command file?",
    choices: [
      { label: "A", text: "In the .claude/commands/ directory in the project repository" },
      { label: "B", text: "In ~/.claude/commands/ in each developer's home directory" },
      { label: "C", text: "In the CLAUDE.md file at the project root" },
      { label: "D", text: "In a .claude/config.json file with a commands array" }
    ],
    correctAnswer: "A",
    explanation: "Project-scoped custom slash commands should be stored in the .claude/commands/ directory within the repository. These commands are version-controlled and automatically available to all developers when they clone or pull the repo. Option B (~/.claude/commands/) is for personal commands that aren't shared via version control. Option C (CLAUDE.md) is for project instructions and context, not command definitions. Option D describes a configuration mechanism that doesn't exist in Claude Code."
  },
  {
    id: 5,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "You've been assigned to restructure the team's monolithic application into microservices. This will involve changes across dozens of files and requires decisions about service boundaries and module dependencies. Which approach should you take?",
    choices: [
      { label: "A", text: "Enter plan mode to explore the codebase, understand dependencies, and design an implementation approach before making changes." },
      { label: "B", text: "Start with direct execution and make changes incrementally, letting the implementation reveal the natural service boundaries." },
      { label: "C", text: "Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured." },
      { label: "D", text: "Begin in direct execution mode and only switch to plan mode if you encounter unexpected complexity during implementation." }
    ],
    correctAnswer: "A",
    explanation: "Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, and architectural decisions\u2014exactly what monolith-to-microservices restructuring requires. It enables safe codebase exploration and design before committing to changes. Option B risks costly rework when dependencies are discovered late. Option C assumes you already know the right structure without exploring the code. Option D ignores that the complexity is already stated in the requirements, not something that might emerge later."
  },
  {
    id: 6,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "Your codebase has distinct areas with different coding conventions: React components use functional style with hooks, API handlers use async/await with specific error handling, and database models follow a repository pattern. Test files are spread throughout the codebase alongside the code they test (e.g., Button.test.tsx next to Button.tsx), and you want all tests to follow the same conventions regardless of location. What's the most maintainable way to ensure Claude automatically applies the correct conventions when generating code?",
    choices: [
      { label: "A", text: "Create rule files in .claude/rules/ with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths" },
      { label: "B", text: "Consolidate all conventions in the root CLAUDE.md file under headers for each area, relying on Claude to infer which section applies" },
      { label: "C", text: "Create skills in .claude/skills/ for each code type that include the relevant conventions in their SKILL.md files" },
      { label: "D", text: "Place a separate CLAUDE.md file in each subdirectory containing that area's specific conventions" }
    ],
    correctAnswer: "A",
    explanation: "Option A is correct because .claude/rules/ with glob patterns (e.g., **/*.test.tsx) allows conventions to be automatically applied based on file paths regardless of directory location\u2014essential for test files spread throughout the codebase. Option B relies on inference rather than explicit matching, making it unreliable. Option C requires manual skill invocation or relies on Claude choosing to load them, contradicting the need for deterministic \"automatic\" application based on file paths. Option D can't easily handle files spread across many directories since CLAUDE.md files are directory-bound."
  },
  {
    id: 7,
    scenario: "Multi-Agent Research System",
    domain: "Agentic Architecture & Orchestration",
    text: "After running the system on the topic \"impact of AI on creative industries,\" you observe that each subagent completes successfully: the web search agent finds relevant articles, the document analysis agent summarizes papers correctly, and the synthesis agent produces coherent output. However, the final reports cover only visual arts, completely missing music, writing, and film production. When you examine the coordinator's logs, you see it decomposed the topic into three subtasks: \"AI in digital art creation,\" \"AI in graphic design,\" and \"AI in photography.\" What is the most likely root cause?",
    choices: [
      { label: "A", text: "The synthesis agent lacks instructions for identifying coverage gaps in the findings it receives from other agents." },
      { label: "B", text: "The coordinator agent's task decomposition is too narrow, resulting in subagent assignments that don't cover all relevant domains of the topic." },
      { label: "C", text: "The web search agent's queries are not comprehensive enough and need to be expanded to cover more creative industry sectors." },
      { label: "D", text: "The document analysis agent is filtering out sources related to non-visual creative industries due to overly restrictive relevance criteria." }
    ],
    correctAnswer: "B",
    explanation: "The coordinator's logs reveal the root cause directly: it decomposed \"creative industries\" into only visual arts subtasks (digital art, graphic design, photography), completely omitting music, writing, and film. The subagents executed their assigned tasks correctly\u2014the problem is what they were assigned. Options A, C, and D incorrectly blame downstream agents that are working correctly within their assigned scope."
  },
  {
    id: 8,
    scenario: "Multi-Agent Research System",
    domain: "Context Management & Reliability",
    text: "The web search subagent times out while researching a complex topic. You need to design how this failure information flows back to the coordinator agent. Which error propagation approach best enables intelligent recovery?",
    choices: [
      { label: "A", text: "Return structured error context to the coordinator including the failure type, the attempted query, any partial results, and potential alternative approaches." },
      { label: "B", text: "Implement automatic retry logic with exponential backoff within the subagent, returning a generic \"search unavailable\" status only after all retries are exhausted." },
      { label: "C", text: "Catch the timeout within the subagent and return an empty result set marked as successful." },
      { label: "D", text: "Propagate the timeout exception directly to a top-level handler that terminates the entire research workflow." }
    ],
    correctAnswer: "A",
    explanation: "Structured error context gives the coordinator the information it needs to make intelligent recovery decisions\u2014whether to retry with a modified query, try an alternative approach, or proceed with partial results. Option B's generic status hides valuable context from the coordinator, preventing informed decisions. Option C suppresses the error by marking failure as success, which prevents any recovery and risks incomplete research outputs. Option D terminates the entire workflow unnecessarily when recovery strategies could succeed."
  },
  {
    id: 9,
    scenario: "Multi-Agent Research System",
    domain: "Tool Design & MCP Integration",
    text: "During testing, you observe that the synthesis agent frequently needs to verify specific claims while combining findings. Currently, when verification is needed, the synthesis agent returns control to the coordinator, which invokes the web search agent, then re-invokes synthesis with results. This adds 2-3 round trips per task and increases latency by 40%. Your evaluation shows that 85% of these verifications are simple fact-checks (dates, names, statistics) while 15% require deeper investigation. What's the most effective approach to reduce overhead while maintaining system reliability?",
    choices: [
      { label: "A", text: "Give the synthesis agent a scoped verify_fact tool for simple lookups, while complex verifications continue delegating to the web search agent through the coordinator." },
      { label: "B", text: "Have the synthesis agent accumulate all verification needs and return them as a batch to the coordinator at the end of its pass, which then sends them all to the web search agent at once." },
      { label: "C", text: "Give the synthesis agent access to all web search tools so it can handle any verification need directly without round-trips through the coordinator." },
      { label: "D", text: "Have the web search agent proactively cache extra context around each source during initial research, anticipating what the synthesis agent might need to verify." }
    ],
    correctAnswer: "A",
    explanation: "Option A applies the principle of least privilege by giving the synthesis agent only what it needs for the 85% common case (simple fact verification) while preserving the existing coordination pattern for complex cases. Option B's batching approach creates blocking dependencies since synthesis steps may depend on earlier verified facts. Option C over-provisions the synthesis agent, violating separation of concerns. Option D relies on speculative caching that cannot reliably predict what the synthesis agent will need to verify."
  },
  {
    id: 10,
    scenario: "Claude Code for Continuous Integration",
    domain: "Claude Code Configuration & Workflows",
    text: "Your pipeline script runs claude \"Analyze this pull request for security issues\" but the job hangs indefinitely. Logs indicate Claude Code is waiting for interactive input. What's the correct approach to run Claude Code in an automated pipeline?",
    choices: [
      { label: "A", text: "Add the -p flag: claude -p \"Analyze this pull request for security issues\"" },
      { label: "B", text: "Set the environment variable CLAUDE_HEADLESS=true before running the command" },
      { label: "C", text: "Redirect stdin from /dev/null: claude \"Analyze this pull request for security issues\" < /dev/null" },
      { label: "D", text: "Add the --batch flag: claude --batch \"Analyze this pull request for security issues\"" }
    ],
    correctAnswer: "A",
    explanation: "The -p (or --print) flag is the documented way to run Claude Code in non-interactive mode. It processes the prompt, outputs the result to stdout, and exits without waiting for user input\u2014exactly what CI/CD pipelines require. The other options reference non-existent features (CLAUDE_HEADLESS environment variable, --batch flag) or use Unix workarounds that don't properly address Claude Code's command syntax."
  },
  {
    id: 11,
    scenario: "Claude Code for Continuous Integration",
    domain: "Prompt Engineering & Structured Output",
    text: "Your team wants to reduce API costs for automated analysis. Currently, real-time Claude calls power two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. Your manager proposes switching both to the Message Batches API for its 50% cost savings. How should you evaluate this proposal?",
    choices: [
      { label: "A", text: "Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks." },
      { label: "B", text: "Switch both workflows to batch processing with status polling to check for completion." },
      { label: "C", text: "Keep real-time calls for both workflows to avoid batch result ordering issues." },
      { label: "D", text: "Switch both to batch processing with a timeout fallback to real-time if batches take too long." }
    ],
    correctAnswer: "A",
    explanation: "The Message Batches API offers 50% cost savings but has processing times up to 24 hours with no guaranteed latency SLA. This makes it unsuitable for blocking pre-merge checks where developers wait for results, but ideal for overnight batch jobs like technical debt reports. Option B is wrong because relying on \"often faster\" completion isn't acceptable for blocking workflows. Option C reflects a misconception\u2014batch results can be correlated using custom_id fields. Option D adds unnecessary complexity when the simpler solution is matching each API to its appropriate use case."
  },
  {
    id: 12,
    scenario: "Claude Code for Continuous Integration",
    domain: "Prompt Engineering & Structured Output",
    text: "A pull request modifies 14 files across the stock tracking module. Your single-pass review analyzing all files together produces inconsistent results: detailed feedback for some files but superficial comments for others, obvious bugs missed, and contradictory feedback\u2014flagging a pattern as problematic in one file while approving identical code elsewhere in the same PR. How should you restructure the review?",
    choices: [
      { label: "A", text: "Split into focused passes: analyze each file individually for local issues, then run a separate integration-focused pass examining cross-file data flow." },
      { label: "B", text: "Require developers to split large PRs into smaller submissions of 3-4 files before the automated review runs." },
      { label: "C", text: "Switch to a higher-tier model with a larger context window to give all 14 files adequate attention in one pass." },
      { label: "D", text: "Run three independent review passes on the full PR and only flag issues that appear in at least two of the three runs." }
    ],
    correctAnswer: "A",
    explanation: "Splitting reviews into focused passes directly addresses the root cause: attention dilution when processing many files at once. File-by-file analysis ensures consistent depth, while a separate integration pass catches cross-file issues. Option B shifts burden to developers without improving the system. Option C misunderstands that larger context windows don't solve attention quality issues. Option D would actually suppress detection of real bugs by requiring consensus on issues that may only be caught intermittently."
  },

  // ===== AI-GENERATED TRAINING QUESTIONS =====
  // Domain 1: Agentic Architecture & Orchestration (5 questions)

  {
    id: 13,
    scenario: "Customer Support Resolution Agent",
    domain: "Agentic Architecture & Orchestration",
    text: "You are implementing the agentic loop for your customer support agent using the Claude Agent SDK. The agent needs to keep calling tools until the task is complete. What is the correct mechanism for determining when to continue the loop versus when to stop?",
    choices: [
      { label: "A", text: "Check if stop_reason is \"tool_use\" to continue the loop, and stop when stop_reason is \"end_turn\"." },
      { label: "B", text: "Parse the assistant's text response for phrases like \"I'm done\" or \"task complete\" to determine when to stop." },
      { label: "C", text: "Set a fixed iteration count and always run exactly that many turns regardless of the model's output." },
      { label: "D", text: "Check if the response contains any text content blocks, and stop if it does." }
    ],
    correctAnswer: "A",
    explanation: "The agentic loop continues when stop_reason is \"tool_use\" and terminates when stop_reason is \"end_turn\". As the docs state: \"With the Client SDK, you implement a tool loop... while response.stop_reason == 'tool_use': result = your_tool_executor(response.tool_use)\" — the loop checks stop_reason on each iteration. Parsing natural language signals (B) is explicitly called out as an anti-pattern. Fixed iteration caps (C) are arbitrary and may cut off work prematurely. Text content blocks (D) can appear alongside tool_use blocks.",
    isAiGenerated: true,
    source: "https://platform.claude.com/docs/en/agent-sdk/agent-loop"
  },
  {
    id: 14,
    scenario: "Multi-Agent Research System",
    domain: "Agentic Architecture & Orchestration",
    text: "You are building a coordinator agent that delegates to specialized subagents. You want the web search subagent to also spawn its own sub-subagents for parallel query expansion. Is this possible with Claude Code subagents?",
    choices: [
      { label: "A", text: "Yes, subagents can spawn other subagents up to 3 levels deep by default." },
      { label: "B", text: "No, subagents cannot spawn other subagents. If you need nested delegation, use Skills or chain subagents from the main conversation." },
      { label: "C", text: "Yes, but only if the subagent is configured with the \"general-purpose\" agent type." },
      { label: "D", text: "Yes, subagents can spawn other subagents as long as they have the Agent tool in their allowedTools." }
    ],
    correctAnswer: "B",
    explanation: "The docs explicitly state: \"Subagents cannot spawn other subagents. If your workflow requires nested delegation, use Skills or chain subagents from the main conversation.\" This is a hard constraint of the architecture, not a configuration issue.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/sub-agents"
  },
  {
    id: 15,
    scenario: "Developer Productivity with Claude",
    domain: "Agentic Architecture & Orchestration",
    text: "Your agent SDK application needs to enforce a business rule: refunds over $500 must be blocked before the tool executes and redirected to human review. You need a deterministic guarantee, not probabilistic compliance. Which mechanism should you use?",
    choices: [
      { label: "A", text: "Add the rule to the system prompt with strong language like \"NEVER process refunds over $500\"." },
      { label: "B", text: "Use a PreToolUse hook that inspects the tool input, returns a \"deny\" permissionDecision, and adds context redirecting to the escalation workflow." },
      { label: "C", text: "Add few-shot examples showing the agent refusing to process high-value refunds." },
      { label: "D", text: "Use tool_choice to force the agent to call an escalation tool instead." }
    ],
    correctAnswer: "B",
    explanation: "The docs describe PreToolUse hooks as providing programmatic control: \"PreToolUse returns decision inside hookSpecificOutput object for richer control: three outcomes (allow, deny, ask) plus ability to modify tool input before execution.\" Hooks provide deterministic guarantees that prompt-based approaches (A, C) cannot. tool_choice (D) would force a specific tool on every turn, not conditionally based on input values.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/hooks"
  },
  {
    id: 16,
    scenario: "Multi-Agent Research System",
    domain: "Agentic Architecture & Orchestration",
    text: "You resume a subagent to continue its previous research task. What happens to its conversation history?",
    choices: [
      { label: "A", text: "The subagent starts fresh with no prior context — subagents are always stateless." },
      { label: "B", text: "The subagent retains its full conversation history, including all previous tool calls, results, and reasoning." },
      { label: "C", text: "The subagent receives a summary of its previous conversation but not the full history." },
      { label: "D", text: "The subagent inherits the parent agent's conversation history instead of its own." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"Resumed subagents retain their full conversation history, including all previous tool calls, results, and reasoning.\" This is distinct from spawning a new subagent, which starts with fresh context. Subagents never inherit the parent's context — they have isolated conversation histories.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/sub-agents"
  },
  {
    id: 17,
    scenario: "Developer Productivity with Claude",
    domain: "Agentic Architecture & Orchestration",
    text: "You want to explore two different refactoring approaches from the same analysis baseline — one using JWT and another using OAuth2. What's the correct SDK mechanism?",
    choices: [
      { label: "A", text: "Start two completely new sessions with the same initial prompt." },
      { label: "B", text: "Use fork_session to create a new session that starts with a copy of the original's history, leaving the original unchanged." },
      { label: "C", text: "Resume the original session twice in parallel from different threads." },
      { label: "D", text: "Use the /branch command which creates a filesystem fork of the repository." }
    ],
    correctAnswer: "B",
    explanation: "The docs describe fork_session precisely: \"Fork is different: it creates a new session that starts with a copy of the original's history. The original stays unchanged.\" and \"Forking branches the conversation history, not the filesystem.\" Starting new sessions (A) loses the shared analysis baseline. Resuming in parallel (C) would cause conflicts. /branch (D) creates a conversation branch, not an SDK-level fork.",
    isAiGenerated: true,
    source: "https://platform.claude.com/docs/en/agent-sdk/sessions"
  },

  // Domain 2: Tool Design & MCP Integration (5 questions)

  {
    id: 18,
    scenario: "Structured Data Extraction",
    domain: "Tool Design & MCP Integration",
    text: "You need to guarantee that Claude calls a tool and that the tool inputs strictly match your JSON schema, with no type mismatches or missing fields. Which combination of settings achieves this?",
    choices: [
      { label: "A", text: "Set tool_choice to \"any\" and add strict: true to your tool definitions." },
      { label: "B", text: "Set tool_choice to \"auto\" and add detailed descriptions to each parameter." },
      { label: "C", text: "Set tool_choice to \"tool\" with the specific tool name and use extended thinking for better accuracy." },
      { label: "D", text: "Set tool_choice to \"any\" and validate the output manually with Pydantic after each call." }
    ],
    correctAnswer: "A",
    explanation: "The docs state: \"Combine tool_choice: {\\\"type\\\": \\\"any\\\"} with strict tool use to guarantee both that one of your tools will be called AND that the tool inputs strictly follow your schema.\" Option C won't work because extended thinking is NOT compatible with tool_choice \"tool\" — the docs note: \"tool_choice: {\\\"type\\\": \\\"any\\\"} and tool_choice: {\\\"type\\\": \\\"tool\\\"} will result in an error\" when used with extended thinking.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"
  },
  {
    id: 19,
    scenario: "Customer Support Resolution Agent",
    domain: "Tool Design & MCP Integration",
    text: "Your team wants to share MCP server configurations across all developers via version control. Where should you configure these servers?",
    choices: [
      { label: "A", text: "In ~/.claude.json under each developer's home directory." },
      { label: "B", text: "In a .mcp.json file at the project root, which is checked into version control." },
      { label: "C", text: "In .claude/settings.json in the project directory." },
      { label: "D", text: "In the CLAUDE.md file with @import references to server configs." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"Project scope: stored in a .mcp.json file at your project's root directory. This file is designed to be checked into version control, ensuring all team members have access to the same MCP tools and services.\" ~/.claude.json (A) is for local/user scope, not shared. For security: \"Claude Code prompts for approval before using project-scoped servers from .mcp.json files.\"",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/mcp"
  },
  {
    id: 20,
    scenario: "Developer Productivity with Claude",
    domain: "Tool Design & MCP Integration",
    text: "Your .mcp.json file needs to reference an API token without committing secrets to version control. What's the correct approach?",
    choices: [
      { label: "A", text: "Use environment variable expansion with ${VAR} syntax in the .mcp.json file, which Claude Code expands at runtime." },
      { label: "B", text: "Store the token directly in .mcp.json and add the file to .gitignore." },
      { label: "C", text: "Create a separate secrets.json file and reference it from .mcp.json." },
      { label: "D", text: "Use the --env CLI flag to pass the token at startup." }
    ],
    correctAnswer: "A",
    explanation: "The docs describe environment variable expansion: \"Supported syntax: ${VAR} — expands to value of VAR; ${VAR:-default} — expands to VAR if set, otherwise uses default.\" Expansion works in \"command, args, env, url, headers\" fields. This lets you commit .mcp.json to version control while keeping secrets in each developer's environment. The docs also warn: \"If a required environment variable is not set and has no default value, Claude Code will fail to parse the config.\"",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/mcp"
  },
  {
    id: 21,
    scenario: "Structured Data Extraction",
    domain: "Tool Design & MCP Integration",
    text: "You have 40+ MCP tools configured across multiple servers, and you notice Claude Code is consuming excessive context tokens loading all tool definitions upfront. What feature addresses this?",
    choices: [
      { label: "A", text: "Tool Search — Claude Code automatically defers MCP tools and uses a search tool to discover relevant ones on demand, reducing token usage by up to 85%." },
      { label: "B", text: "Set MAX_MCP_OUTPUT_TOKENS to a lower value to reduce context consumption." },
      { label: "C", text: "Split your tools across more MCP servers so each server has fewer tools." },
      { label: "D", text: "Use the --disallowedTools flag to manually exclude tools you don't need." }
    ],
    correctAnswer: "A",
    explanation: "The docs state: \"Claude Code automatically enables Tool Search when your MCP tool descriptions would consume more than 10% of the context window.\" and \"MCP tools are deferred rather than loaded into context upfront. Claude uses a search tool to discover relevant MCP tools when needed.\" This achieves \"an 85% reduction in token usage while maintaining access to your full tool library.\" Only ~500 tokens are loaded upfront for the search tool itself.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/mcp"
  },
  {
    id: 22,
    scenario: "Customer Support Resolution Agent",
    domain: "Tool Design & MCP Integration",
    text: "When a tool execution fails in the MCP protocol, what are the two distinct error reporting mechanisms?",
    choices: [
      { label: "A", text: "HTTP status codes for network errors and isError: true in tool results for business logic errors." },
      { label: "B", text: "Protocol errors (standard JSON-RPC errors) for issues like unknown tools, and tool execution errors reported with isError: true for runtime failures." },
      { label: "C", text: "Synchronous exceptions for immediate failures and webhook callbacks for async failures." },
      { label: "D", text: "Error codes in the tool response schema and retry headers in the HTTP response." }
    ],
    correctAnswer: "B",
    explanation: "The MCP spec defines two error reporting mechanisms: \"1. Protocol Errors: Standard JSON-RPC errors\" for issues like unknown tools, invalid arguments, and server errors; and \"2. Tool Execution Errors: Reported in tool results with isError: true\" for API failures, invalid input data, and business logic errors. These are architecturally distinct layers.",
    isAiGenerated: true,
    source: "https://modelcontextprotocol.io/docs/concepts/tools"
  },

  // Domain 3: Claude Code Configuration & Workflows (5 questions)

  {
    id: 23,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "Your CLAUDE.md file is getting long at 400+ lines and you notice Claude is adhering less consistently to instructions at the bottom. What does the documentation recommend?",
    choices: [
      { label: "A", text: "Target under 200 lines per CLAUDE.md file — longer files consume more context and reduce adherence." },
      { label: "B", text: "There is no practical limit; Claude reads the entire file regardless of length." },
      { label: "C", text: "Move the most important instructions to the bottom since Claude prioritizes the end of context." },
      { label: "D", text: "Use the --append-system-prompt flag to inject the instructions directly into the system prompt instead." }
    ],
    correctAnswer: "A",
    explanation: "The docs explicitly recommend: \"Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence.\" For larger projects, the solution is modular organization: split into .claude/rules/ files with path-specific scoping, or use @import to reference external files.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/memory"
  },
  {
    id: 24,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "You want to create a skill that runs in complete isolation from the main conversation — it shouldn't see the conversation history and its verbose output shouldn't pollute the main context. Which frontmatter option achieves this?",
    choices: [
      { label: "A", text: "Set allowed-tools to an empty array to prevent the skill from accessing any tools." },
      { label: "B", text: "Set context: fork to run the skill in a forked subagent context." },
      { label: "C", text: "Set disable-model-invocation: true to prevent Claude from loading the skill." },
      { label: "D", text: "Set user-invocable: false to hide it from the conversation." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"Add context: fork to your frontmatter when you want a skill to run in isolation. The skill content becomes the prompt that drives the subagent. It won't have access to your conversation history.\" The docs also warn: \"context: fork only makes sense for skills with explicit instructions. If your skill contains guidelines without a task, the subagent receives the guidelines but no actionable prompt, and returns without meaningful output.\"",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/skills"
  },
  {
    id: 25,
    scenario: "Claude Code for Continuous Integration",
    domain: "Claude Code Configuration & Workflows",
    text: "Your CI pipeline needs Claude Code to output machine-parseable JSON matching a specific schema for automated posting as PR comments. Which flags should you use?",
    choices: [
      { label: "A", text: "claude -p --output-format json --json-schema '{...}' \"review this PR\"" },
      { label: "B", text: "claude --output-format json \"review this PR\"" },
      { label: "C", text: "claude -p --json \"review this PR\"" },
      { label: "D", text: "claude --batch --schema '{...}' \"review this PR\"" }
    ],
    correctAnswer: "A",
    explanation: "The docs specify: \"-p\" for \"Print response without interactive mode\", \"--output-format\" with options \"text, json, stream-json\", and \"--json-schema\" to \"Get validated JSON output matching a JSON Schema after agent completes its workflow (print mode only)\". Both --output-format and --json-schema require -p (print mode). Options C and D reference flags that don't exist.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/cli-reference"
  },
  {
    id: 26,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "In Claude Code's settings system, what happens when the same array-valued setting (like permissions.allow) appears in both user settings and project settings?",
    choices: [
      { label: "A", text: "Project settings completely replace user settings for that key." },
      { label: "B", text: "User settings take precedence since they are more specific to the individual." },
      { label: "C", text: "The arrays are concatenated and deduplicated, not replaced." },
      { label: "D", text: "An error is thrown due to the configuration conflict." }
    ],
    correctAnswer: "C",
    explanation: "The docs state: \"Array settings merge across scopes. When the same array-valued setting (such as sandbox.filesystem.allowWrite or permissions.allow) appears in multiple scopes, the arrays are concatenated and deduplicated, not replaced.\" This is distinct from scalar settings where the higher-priority scope wins.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/settings"
  },
  {
    id: 27,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "You have CLAUDE.md files at multiple levels: ~/.claude/CLAUDE.md, ./CLAUDE.md, and ./src/components/CLAUDE.md. When does the subdirectory CLAUDE.md get loaded?",
    choices: [
      { label: "A", text: "All CLAUDE.md files are loaded at session start regardless of location." },
      { label: "B", text: "CLAUDE.md files above and at the working directory load at launch; subdirectory CLAUDE.md files load on demand when Claude reads files in those subdirectories." },
      { label: "C", text: "Only the root CLAUDE.md is loaded; subdirectory files are ignored." },
      { label: "D", text: "Subdirectory CLAUDE.md files override the root CLAUDE.md when working in that directory." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"CLAUDE.md files in the directory hierarchy above the working directory are loaded in full at launch. CLAUDE.md files in subdirectories load on demand when Claude reads files in those directories.\" This means ~/.claude/CLAUDE.md and ./CLAUDE.md load immediately, but ./src/components/CLAUDE.md only loads when Claude accesses files in that directory.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/memory"
  },

  // Domain 4: Prompt Engineering & Structured Output (5 questions)

  {
    id: 28,
    scenario: "Structured Data Extraction",
    domain: "Prompt Engineering & Structured Output",
    text: "You are using tool_choice set to \"any\" to force structured output. You also want Claude to explain its reasoning in natural language before making the tool call. Is this possible?",
    choices: [
      { label: "A", text: "Yes, just add \"explain your reasoning before calling the tool\" to the system prompt." },
      { label: "B", text: "No — when tool_choice is \"any\" or \"tool\", the API prefills the assistant message to force a tool call, meaning the model will not emit natural language before tool_use blocks, even if explicitly asked." },
      { label: "C", text: "Yes, if you enable extended thinking alongside tool_choice \"any\"." },
      { label: "D", text: "Yes, by setting disable_parallel_tool_use to true." }
    ],
    correctAnswer: "B",
    explanation: "The docs explicitly state: \"When you have tool_choice as any or tool, the API prefills the assistant message to force a tool to be used. This means that the models will not emit a natural language response or explanation before tool_use content blocks, even if explicitly asked to do so.\" Option C is also wrong: extended thinking is NOT compatible with tool_choice \"any\" or \"tool\" and \"will result in an error.\"",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"
  },
  {
    id: 29,
    scenario: "Claude Code for Continuous Integration",
    domain: "Prompt Engineering & Structured Output",
    text: "You're designing prompts for a code review system and want consistent output quality. The Anthropic docs recommend a specific technique for achieving consistently formatted, actionable output when detailed instructions alone produce inconsistent results. What is it?",
    choices: [
      { label: "A", text: "Increase the temperature to allow more creative responses." },
      { label: "B", text: "Use 3-5 few-shot examples wrapped in <example> tags, making them relevant, diverse, and structured." },
      { label: "C", text: "Use a larger model with more parameters." },
      { label: "D", text: "Add the instruction \"be consistent\" to the system prompt." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"Examples are one of the most reliable ways to steer Claude's output format, tone, and structure. A few well-crafted examples (known as few-shot or multishot prompting) can dramatically improve accuracy and consistency.\" They recommend: \"Include 3-5 examples for best results\" and making them \"Relevant: Mirror your actual use case closely. Diverse: Cover edge cases. Structured: Wrap examples in <example> tags.\"",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices"
  },
  {
    id: 30,
    scenario: "Structured Data Extraction",
    domain: "Prompt Engineering & Structured Output",
    text: "Your batch processing job submitted 10,000 documents via the Message Batches API. The results come back, but they're not in the same order as your requests. How do you match results to their original requests?",
    choices: [
      { label: "A", text: "Results are always returned in submission order — check your parsing logic." },
      { label: "B", text: "Use the custom_id field on each request to correlate batch request/response pairs." },
      { label: "C", text: "Use the array index since batch results maintain positional correspondence." },
      { label: "D", text: "Parse the content of each result to infer which document it corresponds to." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"Batch results can be returned in any order, and may not match the ordering of requests when the batch was created... To correctly match results with their corresponding requests, always use the custom_id field.\" Each request requires a unique custom_id specifically for this purpose.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/batch-processing"
  },
  {
    id: 31,
    scenario: "Structured Data Extraction",
    domain: "Prompt Engineering & Structured Output",
    text: "You have a long document analysis prompt with the document content and your query. Where should you place each component for optimal response quality?",
    choices: [
      { label: "A", text: "Put the query first, then the document — Claude prioritizes content it sees first." },
      { label: "B", text: "Interleave the query throughout the document at regular intervals." },
      { label: "C", text: "Put the long document at the top and your query at the end — this can improve response quality by up to 30%." },
      { label: "D", text: "It doesn't matter — Claude processes all positions equally." }
    ],
    correctAnswer: "C",
    explanation: "The docs state: \"Put longform data at the top: Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples.\" and \"Queries at the end can improve response quality by up to 30% in tests, especially with complex, multi-document inputs.\"",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices"
  },
  {
    id: 32,
    scenario: "Claude Code for Continuous Integration",
    domain: "Prompt Engineering & Structured Output",
    text: "Which of the following workloads is NOT appropriate for the Message Batches API?",
    choices: [
      { label: "A", text: "Overnight technical debt reports generated for morning review." },
      { label: "B", text: "Weekly compliance audits across all repositories." },
      { label: "C", text: "A blocking pre-merge check that must complete before developers can merge." },
      { label: "D", text: "Nightly test generation for newly added functions." }
    ],
    correctAnswer: "C",
    explanation: "The Message Batches API \"offers 50% cost savings but has processing times up to 24 hours with no guaranteed latency SLA.\" This makes it unsuitable for blocking workflows. The docs note it is \"well-suited to tasks that do not require immediate responses, with most batches finishing in less than 1 hour.\" Pre-merge checks (C) are blocking — developers wait for results — making the synchronous API the correct choice.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/batch-processing"
  },

  // Domain 5: Context Management & Reliability (5 questions)

  {
    id: 33,
    scenario: "Multi-Agent Research System",
    domain: "Context Management & Reliability",
    text: "During extended codebase exploration, your Claude Code session's context window is approaching its limit. What happens automatically, and what is the key risk?",
    choices: [
      { label: "A", text: "The session crashes with an out-of-context error and must be restarted." },
      { label: "B", text: "The SDK automatically compacts the conversation by summarizing older history, but specific instructions from early in the conversation may not be preserved." },
      { label: "C", text: "Claude automatically switches to a smaller, faster model to conserve tokens." },
      { label: "D", text: "The session continues normally — there is no context limit with Claude Code." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"When the context window approaches its limit, the SDK automatically compacts the conversation: it summarizes older history to free space, keeping your most recent exchanges and key decisions intact.\" The key risk: \"Compaction replaces older messages with a summary, so specific instructions from early in the conversation may not be preserved. Persistent rules belong in CLAUDE.md rather than in the initial prompt.\"",
    isAiGenerated: true,
    source: "https://platform.claude.com/docs/en/agent-sdk/agent-loop"
  },
  {
    id: 34,
    scenario: "Customer Support Resolution Agent",
    domain: "Context Management & Reliability",
    text: "Your customer support agent handles multi-issue sessions where customers raise several problems across a long conversation. As the conversation grows, the agent starts giving vague responses referencing \"typical patterns\" instead of the specific order numbers and dates discussed earlier. What is this phenomenon and how should you address it?",
    choices: [
      { label: "A", text: "This is the \"lost in the middle\" effect — extract transactional facts into a persistent \"case facts\" block included in each prompt, outside of summarized history." },
      { label: "B", text: "Increase max_tokens to give the model more room to process the full conversation." },
      { label: "C", text: "Switch to a model with a larger context window." },
      { label: "D", text: "Add a system prompt instruction telling the model to always reference specific details." }
    ],
    correctAnswer: "A",
    explanation: "The exam guide describes this exact pattern under context management: models reliably process information at the beginning and end of long inputs but may omit findings from middle sections. The solution is extracting transactional facts (amounts, dates, order numbers, statuses) into a persistent \"case facts\" block included in each prompt, outside summarized history. A larger context window (C) doesn't fix attention distribution issues.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices"
  },
  {
    id: 35,
    scenario: "Multi-Agent Research System",
    domain: "Context Management & Reliability",
    text: "Your synthesis subagent receives findings from multiple research subagents, but after progressive summarization across agents, source attribution has been lost. You can no longer trace which claims came from which sources. What structural change prevents this?",
    choices: [
      { label: "A", text: "Have each subagent include structured claim-source mappings (source URLs, document names, relevant excerpts) that downstream agents must preserve through synthesis." },
      { label: "B", text: "Have the synthesis agent search the web again to re-verify all claims." },
      { label: "C", text: "Add a post-processing step that uses a classifier to guess source attribution." },
      { label: "D", text: "Limit the research to a single subagent to avoid cross-agent attribution loss." }
    ],
    correctAnswer: "A",
    explanation: "The exam guide specifically addresses information provenance: source attribution is lost during summarization steps when findings are compressed without preserving claim-source mappings. The solution is requiring subagents to output structured claim-source mappings that the synthesis agent must preserve and merge when combining findings. Re-searching (B) wastes resources and may find different results.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/agents"
  },
  {
    id: 36,
    scenario: "Developer Productivity with Claude",
    domain: "Context Management & Reliability",
    text: "After compacting a Claude Code session with /compact, what happens to the CLAUDE.md instructions?",
    choices: [
      { label: "A", text: "CLAUDE.md content is summarized along with the rest of the conversation." },
      { label: "B", text: "CLAUDE.md fully survives compaction — Claude re-reads it from disk and re-injects it fresh into the session." },
      { label: "C", text: "CLAUDE.md is dropped entirely and must be manually re-imported." },
      { label: "D", text: "Only the first 50 lines of CLAUDE.md survive compaction." }
    ],
    correctAnswer: "B",
    explanation: "The docs explicitly state: \"CLAUDE.md fully survives compaction. After /compact, Claude re-reads your CLAUDE.md from disk and re-injects it fresh into the session.\" This is why persistent rules belong in CLAUDE.md rather than in conversation prompts — CLAUDE.md survives compaction while conversation content gets summarized.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/memory"
  },
  {
    id: 37,
    scenario: "Multi-Agent Research System",
    domain: "Context Management & Reliability",
    text: "A subagent silently returns an empty result set after failing to access a database. The coordinator treats this as \"no results found\" and continues, producing an incomplete report with no indication of the gap. What anti-pattern is this, and what's the fix?",
    choices: [
      { label: "A", text: "This is expected behavior — empty results are a valid response. No fix needed." },
      { label: "B", text: "This is the error suppression anti-pattern. The subagent should return structured error context (failure type, what was attempted, partial results) so the coordinator can make informed recovery decisions." },
      { label: "C", text: "The coordinator should always run each subagent twice to verify results." },
      { label: "D", text: "Add a timeout that terminates the entire workflow if any subagent returns empty results." }
    ],
    correctAnswer: "B",
    explanation: "The exam guide explicitly calls out this anti-pattern: silently suppressing errors (returning empty results as success) or terminating entire workflows on single failures are both anti-patterns. The correct approach is returning structured error context including failure type, attempted query, partial results, and potential alternatives, enabling intelligent coordinator recovery decisions. The coordinator must be able to distinguish access failures from valid empty results.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/agents"
  }
];
