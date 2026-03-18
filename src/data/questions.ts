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
    text: "Your customer support agent processes return requests by looking up the order, checking return eligibility, and issuing refunds. In production, you discover that 8% of refund calls execute before the order lookup completes, causing refunds to the wrong account. Your team debates two fixes: adding a strongly-worded system prompt instruction about always looking up orders first, or implementing a PreToolUse hook that blocks process_refund until lookup_order has returned successfully in the current session. Given that incorrect refunds cost your company an average of $340 per incident, which approach should you choose and why?",
    choices: [
      { label: "A", text: "The system prompt instruction is sufficient — Claude follows explicit instructions reliably when they're clearly stated." },
      { label: "B", text: "Implement the PreToolUse hook, because when errors have financial consequences, programmatic enforcement provides deterministic guarantees that prompt-based approaches cannot." },
      { label: "C", text: "Use both approaches together — the hook as primary defense and the prompt instruction as backup." },
      { label: "D", text: "Neither — retrain the agent on examples of correct ordering instead." }
    ],
    correctAnswer: "B",
    explanation: "As the docs state, PreToolUse hooks provide \"three outcomes (allow, deny, ask) plus ability to modify tool input before execution.\" When financial consequences exist, the exam guide emphasizes: programmatic enforcement (hooks, prerequisite gates) provides deterministic guarantees that prompt-based guidance cannot. Option C is over-engineered — the hook alone is sufficient since it's deterministic. Option A relies on probabilistic LLM compliance which already failed 8% of the time.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/hooks"
  },
  {
    id: 14,
    scenario: "Multi-Agent Research System",
    domain: "Agentic Architecture & Orchestration",
    text: "Your multi-agent research system has a coordinator that delegates to web search, document analysis, and synthesis subagents. During testing, you find that the synthesis subagent sometimes needs to verify a statistic but can only do so by returning control to the coordinator, which then invokes the web search agent — adding 2-3 round trips and 40% latency. You analyze verification requests and find 85% are simple fact-checks (dates, names, numbers) while 15% need deep investigation. A teammate suggests giving the synthesis agent full access to all web search tools. What's wrong with that approach, and what should you do instead?",
    choices: [
      { label: "A", text: "Give the synthesis agent full web search access — it's the simplest solution and avoids round-trips entirely." },
      { label: "B", text: "Give the synthesis agent a scoped verify_fact tool for simple lookups only, keeping complex verifications routed through the coordinator to the web search agent." },
      { label: "C", text: "Have the synthesis agent batch all verification needs and send them to the coordinator at the end of its pass." },
      { label: "D", text: "Pre-cache extra context during initial research to anticipate what the synthesis agent might need." }
    ],
    correctAnswer: "B",
    explanation: "The docs emphasize scoped tool access: giving agents tools outside their specialization leads to misuse. The principle of least privilege means giving the synthesis agent only what it needs for the 85% common case (simple fact verification) while preserving the coordinator pattern for complex cases. Full search access (A) over-provisions the agent, violating separation of concerns. Batching (C) creates blocking dependencies since synthesis steps may depend on earlier verified facts. Pre-caching (D) relies on speculation that can't reliably predict needs.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/sub-agents"
  },
  {
    id: 15,
    scenario: "Developer Productivity with Claude",
    domain: "Agentic Architecture & Orchestration",
    text: "Your team uses a Claude Agent SDK application to assist with code migrations. After analyzing a large legacy codebase in a session, you want to explore two competing refactoring strategies — one using a microservices approach and another using a modular monolith — without losing the analysis work already done. Both explorations will make different file changes. What's the best approach?",
    choices: [
      { label: "A", text: "Start two completely new sessions with the same initial analysis prompt, accepting that the analysis work will be duplicated." },
      { label: "B", text: "Use fork_session to branch the conversation history into two independent sessions, each preserving the original analysis while exploring a different strategy." },
      { label: "C", text: "Run both explorations sequentially in the same session, using git stash to separate the changes." },
      { label: "D", text: "Resume the same session twice in parallel threads — each will get its own copy of the history." }
    ],
    correctAnswer: "B",
    explanation: "The docs describe fork_session: \"Fork creates a new session that starts with a copy of the original's history. The original stays unchanged\" and \"Forking branches the conversation history, not the filesystem.\" This preserves the expensive analysis baseline while enabling divergent exploration. New sessions (A) waste the analysis work. Sequential exploration (C) risks context pollution between approaches. Parallel resume (D) would cause session file conflicts.",
    isAiGenerated: true,
    source: "https://platform.claude.com/docs/en/agent-sdk/sessions"
  },
  {
    id: 16,
    scenario: "Multi-Agent Research System",
    domain: "Agentic Architecture & Orchestration",
    text: "You're designing a research pipeline where the coordinator delegates to a web search subagent, then passes findings to a document analysis subagent, then to a synthesis subagent. The synthesis subagent produces a report, but it's missing key details from the web search phase. Investigation shows the coordinator passed only a brief summary of web search results to the document analysis subagent, which then passed an even shorter summary to synthesis. What's the root cause?",
    choices: [
      { label: "A", text: "The subagents' context windows are too small — upgrade to a model with a larger context." },
      { label: "B", text: "Progressive summarization across the chain compressed findings until key details were lost. Each subagent should receive the complete findings from prior agents directly in its prompt, not summaries of summaries." },
      { label: "C", text: "The synthesis subagent should have access to the web search tool to re-find any missing information." },
      { label: "D", text: "The coordinator should run all three subagents in parallel instead of sequentially." }
    ],
    correctAnswer: "B",
    explanation: "The docs state that each subagent \"starts with a fresh conversation (no prior message history)\" and \"only its final response returns to the parent as a tool result.\" The exam guide warns about progressive summarization risks: condensing numerical values, percentages, dates into vague summaries. The fix is including complete findings from prior agents directly in each subagent's prompt — the coordinator must pass full results, not summaries. Running in parallel (D) would prevent the sequential dependency the pipeline requires.",
    isAiGenerated: true,
    source: "https://platform.claude.com/docs/en/agent-sdk/agent-loop"
  },
  {
    id: 17,
    scenario: "Customer Support Resolution Agent",
    domain: "Agentic Architecture & Orchestration",
    text: "Your support agent uses PostToolUse hooks to normalize data from MCP tools before the agent processes the results. One tool returns timestamps as Unix epoch integers, another returns ISO 8601 strings, and a third returns human-readable dates like \"March 15, 2026\". The agent frequently confuses dates across tools, comparing them incorrectly. What's the most effective fix?",
    choices: [
      { label: "A", text: "Add system prompt instructions telling the agent to always convert dates to a common format before comparing." },
      { label: "B", text: "Implement PostToolUse hooks that normalize all date formats to ISO 8601 before the agent processes the tool results, providing deterministic consistency." },
      { label: "C", text: "Create a dedicated date_comparison tool that handles format differences internally." },
      { label: "D", text: "Switch all backend systems to use the same date format." }
    ],
    correctAnswer: "B",
    explanation: "The docs describe hooks that \"intercept tool results for transformation before the model processes them.\" PostToolUse hooks run after tool execution and can transform results before the agent sees them. This provides deterministic format normalization — the agent always sees consistent ISO 8601 dates regardless of source. System prompt instructions (A) rely on probabilistic compliance. A comparison tool (C) doesn't fix the underlying inconsistency. Changing backends (D) may not be feasible.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/hooks"
  },

  // Domain 2: Tool Design & MCP Integration (5 questions)

  {
    id: 18,
    scenario: "Structured Data Extraction",
    domain: "Tool Design & MCP Integration",
    text: "You're building a document extraction pipeline that must produce guaranteed schema-compliant JSON output. Your extraction tool has a detailed JSON schema with required fields, enum types, and nullable fields for information that may not exist in every document. You need Claude to always call the extraction tool (never respond with text) AND guarantee the inputs match your schema exactly. You're also considering enabling extended thinking for better extraction accuracy. What configuration achieves all three goals?",
    choices: [
      { label: "A", text: "Set tool_choice to \"any\" with strict: true. Extended thinking works alongside this configuration." },
      { label: "B", text: "Set tool_choice to \"any\" with strict: true, but accept that extended thinking cannot be used with forced tool selection — it requires tool_choice \"auto\"." },
      { label: "C", text: "Set tool_choice to \"auto\" with strict: true and add a system prompt instruction to always use the tool." },
      { label: "D", text: "Use tool_choice \"tool\" with the extraction tool name and enable extended thinking for maximum accuracy." }
    ],
    correctAnswer: "B",
    explanation: "The docs state you can \"Combine tool_choice 'any' with strict tool use to guarantee both that one of your tools will be called AND that the tool inputs strictly follow your schema.\" However, extended thinking is NOT compatible with forced tool selection: \"tool_choice 'any' and tool_choice 'tool' will result in an error\" with extended thinking — only \"auto\" and \"none\" work. You must choose between forced tool use and extended thinking.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"
  },
  {
    id: 19,
    scenario: "Developer Productivity with Claude",
    domain: "Tool Design & MCP Integration",
    text: "Your team of 8 developers uses Claude Code with shared MCP servers for Jira, GitHub, and your internal deployment API. The Jira and GitHub servers use standard community implementations, while the deployment API is custom-built. You need all developers to have the same MCP configuration when they clone the repo, but the deployment API requires each developer's personal access token. How should you set this up?",
    choices: [
      { label: "A", text: "Put all three servers in .mcp.json at the project root with environment variable expansion (${DEPLOY_TOKEN}) for the deployment API token. Each developer sets the env var locally." },
      { label: "B", text: "Put all three servers in ~/.claude.json so each developer can configure their own tokens." },
      { label: "C", text: "Put Jira and GitHub in .mcp.json and the deployment API in each developer's ~/.claude.json." },
      { label: "D", text: "Put the server configs in CLAUDE.md with instructions for developers to set up MCP servers manually." }
    ],
    correctAnswer: "A",
    explanation: "The docs state: \".mcp.json at your project's root directory is designed to be checked into version control, ensuring all team members have access to the same MCP tools.\" For secrets: \"Supported syntax: ${VAR} — expands to value of VAR; ${VAR:-default}.\" This lets you commit the config while keeping tokens in each developer's environment. Splitting configs (C) means developers could miss the deployment API setup. Manual instructions (D) are error-prone.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/mcp"
  },
  {
    id: 20,
    scenario: "Customer Support Resolution Agent",
    domain: "Tool Design & MCP Integration",
    text: "Your agent has access to 45 MCP tools across 6 servers (CRM, order management, billing, shipping, knowledge base, and escalation). You notice that tool selection accuracy has dropped significantly — the agent frequently calls the CRM's get_account_details when it should call order management's get_order_status, and sometimes calls knowledge base search tools when it should be using the CRM. What's the most likely root cause, and what's the highest-leverage first fix?",
    choices: [
      { label: "A", text: "The model is too small — upgrade to a larger model that can handle more tool definitions." },
      { label: "B", text: "Too many tools degrade selection reliability by increasing decision complexity. Enable Tool Search so tools are deferred and discovered on demand rather than loaded upfront, and improve tool descriptions to clearly differentiate similar tools." },
      { label: "C", text: "Implement a routing classifier that pre-selects the correct server based on the user's query before passing it to Claude." },
      { label: "D", text: "Remove tools the agent rarely uses to reduce the total count below 20." }
    ],
    correctAnswer: "B",
    explanation: "The docs state that giving agents \"too many tools (e.g., 18 instead of 4-5) degrades tool selection reliability by increasing decision complexity\" and that Tool Search achieves \"an 85% reduction in token usage while maintaining access to your full tool library\" by deferring tools and loading only what's needed. The docs also emphasize that tool descriptions are \"the primary mechanism LLMs use for tool selection\" — improving descriptions is the highest-leverage fix alongside Tool Search.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/mcp"
  },
  {
    id: 21,
    scenario: "Structured Data Extraction",
    domain: "Tool Design & MCP Integration",
    text: "Your extraction pipeline processes invoices from 50 different vendors. Each vendor's invoices have slightly different layouts, but you want to extract the same fields (vendor name, total, line items, date). Some invoices don't include all fields. A teammate suggests making all fields required in the JSON schema to ensure complete extraction. Why is this a bad idea, and what should you do instead?",
    choices: [
      { label: "A", text: "Required fields are fine — Claude will always find the information if it exists in the document." },
      { label: "B", text: "Making fields required when source documents may not contain them forces Claude to fabricate values to satisfy the schema. Make fields that may be absent nullable/optional instead, so Claude returns null rather than hallucinating." },
      { label: "C", text: "Use a separate schema for each vendor that only includes fields present in that vendor's invoices." },
      { label: "D", text: "Make all fields required but add a post-processing step to remove likely hallucinated values." }
    ],
    correctAnswer: "B",
    explanation: "The exam guide explicitly covers this: \"Schema design considerations: required vs optional fields, enum fields with 'other' + detail string patterns for extensible categories.\" Making fields optional/nullable \"when source documents may not contain the information\" prevents \"the model from fabricating values to satisfy required fields.\" Per-vendor schemas (C) don't scale to 50 vendors. Post-processing hallucinations (D) is unreliable.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"
  },
  {
    id: 22,
    scenario: "Developer Productivity with Claude",
    domain: "Tool Design & MCP Integration",
    text: "You're building a coding assistant agent that has access to both a Read tool (reads file contents) and a get_documentation MCP tool (fetches API documentation from your internal docs server). During testing, you notice the agent consistently uses Read to try to find documentation by reading source files instead of using get_documentation, even when users explicitly ask for API docs. Both tools have brief one-line descriptions. What's the most likely cause and the best first fix?",
    choices: [
      { label: "A", text: "The agent needs more training data showing correct tool usage patterns." },
      { label: "B", text: "Tool descriptions are too brief to differentiate them. Expand get_documentation's description to include input formats, example queries, what it returns, and when to use it vs Read. The most common tool selection failures come from inadequate descriptions." },
      { label: "C", text: "Remove the Read tool so the agent is forced to use get_documentation." },
      { label: "D", text: "Add a routing layer that detects documentation-related queries and forces get_documentation." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"Tool descriptions are the primary mechanism LLMs use for tool selection; minimal descriptions lead to unreliable selection among similar tools.\" The engineering blog adds: \"Provide extremely detailed descriptions — This is the most important factor\" and \"Aim for at least 3-4 sentences per tool description.\" The exam guide emphasizes this as a high-leverage, low-effort fix before adding infrastructure like routing layers (D).",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"
  },

  // Domain 3: Claude Code Configuration & Workflows (5 questions)

  {
    id: 23,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "Your team has a monorepo with React frontend components, Python API handlers, and Terraform infrastructure code. Each area has distinct conventions: React uses functional components with hooks, Python follows your custom API framework patterns, and Terraform has specific module naming rules. Test files are co-located with source code throughout the repo (e.g., Button.test.tsx next to Button.tsx). You want Claude to automatically apply the right conventions based on what file is being edited, without relying on Claude to infer which section of a long CLAUDE.md applies. What's the most maintainable approach?",
    choices: [
      { label: "A", text: "Create a single comprehensive CLAUDE.md with all conventions organized under clear headers for each area." },
      { label: "B", text: "Create .claude/rules/ files with YAML frontmatter paths fields (e.g., paths: [\"src/api/**/*.py\"] for API conventions, paths: [\"**/*.test.*\"] for testing conventions) so rules load automatically based on which files Claude is editing." },
      { label: "C", text: "Place a separate CLAUDE.md in each subdirectory with that area's conventions." },
      { label: "D", text: "Create custom skills for each code type that developers invoke manually before working in each area." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \".claude/rules/ files with YAML frontmatter paths fields\" enable \"conditional rule activation\" where \"path-scoped rules trigger when Claude reads files matching the pattern.\" This handles co-located test files (paths: [\"**/*.test.*\"]) that span all directories — something subdirectory CLAUDE.md files (C) can't do since they're directory-bound. A single CLAUDE.md (A) relies on inference. Manual skills (D) contradicts the \"automatic\" requirement. The docs recommend targeting \"under 200 lines per CLAUDE.md file.\"",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/memory"
  },
  {
    id: 24,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "You're building a /security-audit skill for your team that performs a comprehensive codebase security scan. The skill produces verbose output (hundreds of lines of findings) and you don't want it to consume the main conversation's context window. It also shouldn't have permission to edit files — only read and search. How should you configure the SKILL.md frontmatter?",
    choices: [
      { label: "A", text: "Set context: fork to isolate it in a subagent, and set allowed-tools to restrict it to Read, Glob, and Grep only." },
      { label: "B", text: "Set disable-model-invocation: true to prevent context pollution." },
      { label: "C", text: "Set user-invocable: false so it only runs when explicitly triggered." },
      { label: "D", text: "Don't use a skill — put the instructions in CLAUDE.md instead." }
    ],
    correctAnswer: "A",
    explanation: "The docs state: \"Add context: fork to run in isolation. The skill content becomes the prompt that drives the subagent. It won't have access to your conversation history.\" Combined with \"allowed-tools: Tools Claude can use without asking permission when this skill is active\" restricted to read-only tools. This solves both problems: isolation prevents context pollution, and allowed-tools prevents file modifications. disable-model-invocation (B) prevents Claude from auto-loading the skill, not context isolation.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/skills"
  },
  {
    id: 25,
    scenario: "Claude Code for Continuous Integration",
    domain: "Claude Code Configuration & Workflows",
    text: "Your CI pipeline runs Claude Code to review PRs and post findings as inline comments. The pipeline needs to: (1) run non-interactively, (2) output structured JSON matching your comment schema, and (3) limit spending to $2 per review. A junior engineer wrote the pipeline command as: claude \"Review this PR for bugs\" --output-format json. The job hangs indefinitely. What's wrong and what's the correct command?",
    choices: [
      { label: "A", text: "Add the -p flag for non-interactive mode, add --json-schema for schema validation, and add --max-budget-usd 2. The -p flag is required — without it, Claude Code waits for interactive input." },
      { label: "B", text: "Set the CLAUDE_HEADLESS=true environment variable and add a timeout." },
      { label: "C", text: "Pipe the prompt through stdin: echo \"Review this PR\" | claude --output-format json" },
      { label: "D", text: "Add the --batch flag to run in non-interactive mode." }
    ],
    correctAnswer: "A",
    explanation: "The docs state: \"-p (or --print) flag\" is for \"Print response without interactive mode.\" Without -p, Claude Code enters interactive mode and waits for input — explaining the hang. --json-schema provides \"validated JSON output matching a JSON Schema (print mode only)\" and --max-budget-usd sets a \"Maximum dollar amount to spend on API calls before stopping (print mode only).\" CLAUDE_HEADLESS (B) and --batch (D) are non-existent features.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/cli-reference"
  },
  {
    id: 26,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "A new team member reports that Claude Code isn't following the testing conventions documented in .claude/settings.json. Other team members have no issues. You investigate and find the new member has a personal ~/.claude/settings.json with a permissions.deny rule that blocks the test runner. The project settings have permissions.allow for the same test runner. Which setting wins, and why?",
    choices: [
      { label: "A", text: "The project allow rule wins because project settings override user settings." },
      { label: "B", text: "The user deny rule wins because deny rules are always evaluated first regardless of scope, and permission rules follow deny -> ask -> allow order." },
      { label: "C", text: "They cancel each other out, so Claude prompts for permission each time." },
      { label: "D", text: "The arrays merge and deduplicate, effectively creating both an allow and deny for the same tool, which is an error." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"Rules are evaluated in order: deny rules first, then ask, then allow. The first matching rule wins, so deny rules always take precedence.\" Additionally, \"Array settings merge across scopes — the arrays are concatenated and deduplicated, not replaced.\" So both rules exist in the merged set, but deny is evaluated first. The fix is removing the deny rule from the user's personal settings.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/settings"
  },
  {
    id: 27,
    scenario: "Code Generation with Claude Code",
    domain: "Claude Code Configuration & Workflows",
    text: "Your project's CLAUDE.md has grown to 350 lines covering coding standards, API conventions, testing patterns, deployment procedures, and architecture decisions. You notice Claude is inconsistently following instructions — especially those in the middle of the file. Your team also maintains a shared coding standards document at docs/coding-standards.md. How should you restructure?",
    choices: [
      { label: "A", text: "Split into focused .claude/rules/ files for each topic (testing.md, api-conventions.md, deployment.md) and use @import in CLAUDE.md to reference docs/coding-standards.md. Keep CLAUDE.md under 200 lines with only high-level project context." },
      { label: "B", text: "Move everything into the system prompt using --append-system-prompt-file for better adherence." },
      { label: "C", text: "Duplicate the coding standards content directly into CLAUDE.md for faster access." },
      { label: "D", text: "Keep the single CLAUDE.md but reorder it to put the most important instructions at the beginning and end." }
    ],
    correctAnswer: "A",
    explanation: "The docs recommend: \"target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence.\" The solution uses .claude/rules/ for \"organizing instructions into multiple files\" and @import syntax: \"CLAUDE.md files can import additional files using @path/to/import syntax. Imported files are expanded and loaded into context at launch.\" This keeps CLAUDE.md concise while maintaining all conventions in modular, maintainable files.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/memory"
  },

  // Domain 4: Prompt Engineering & Structured Output (5 questions)

  {
    id: 28,
    scenario: "Structured Data Extraction",
    domain: "Prompt Engineering & Structured Output",
    text: "You're building an invoice extraction system using tool_use with a JSON schema. During testing, you find that Claude correctly extracts all fields with valid types (no syntax errors), but sometimes puts the vendor's address in the \"billing_address\" field and the billing address in the \"vendor_address\" field. Adding strict: true to the tool definition doesn't fix this. Why not, and what should you do?",
    choices: [
      { label: "A", text: "strict: true is broken — file a bug report with Anthropic." },
      { label: "B", text: "strict: true eliminates syntax/type errors but not semantic errors like values in wrong fields. Add few-shot examples showing correct field placement for ambiguous cases, and consider adding field-level descriptions that clearly distinguish vendor_address from billing_address." },
      { label: "C", text: "Switch from tool_use to asking Claude to output raw JSON text, which gives it more flexibility." },
      { label: "D", text: "Add a post-processing validator that swaps the fields using heuristics." }
    ],
    correctAnswer: "B",
    explanation: "The exam guide explicitly covers this distinction: \"strict JSON schemas via tool use eliminate syntax errors but do not prevent semantic errors (e.g., line items that don't sum to total, values in wrong fields).\" Few-shot examples are \"the most effective technique for achieving consistently formatted, actionable output\" and work by showing correct handling of ambiguous cases. Raw JSON (C) would reintroduce syntax errors. Heuristic swapping (D) is brittle.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"
  },
  {
    id: 29,
    scenario: "Claude Code for Continuous Integration",
    domain: "Prompt Engineering & Structured Output",
    text: "Your automated code review system flags potential issues in PRs. After deploying it, developers complain that 60% of flagged issues are false positives — minor style preferences, acceptable patterns flagged as problems, and nitpicks about documentation. The team is losing trust in the system and starting to ignore all findings, including real bugs. Your system prompt says \"review for quality issues, be conservative.\" What's the most effective fix?",
    choices: [
      { label: "A", text: "Switch to a more capable model that produces fewer false positives." },
      { label: "B", text: "Replace the vague \"be conservative\" instruction with explicit category-based criteria defining exactly which issues to report (bugs, security) versus skip (style, local patterns), with few-shot examples showing the boundary for each severity level." },
      { label: "C", text: "Add a confidence score and only show findings above 90% confidence." },
      { label: "D", text: "Reduce the number of files reviewed per pass to improve focus." }
    ],
    correctAnswer: "B",
    explanation: "The exam guide directly addresses this: \"general instructions like 'be conservative' or 'only report high-confidence findings' fail to improve precision compared to specific categorical criteria.\" The fix is writing \"specific review criteria that define which issues to report (bugs, security) versus skip (minor style, local patterns)\" with \"concrete code examples for each severity level.\" The exam guide also notes: \"high false positive rates on specific categories undermine confidence in accurate categories\" — matching the trust erosion described.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices"
  },
  {
    id: 30,
    scenario: "Structured Data Extraction",
    domain: "Prompt Engineering & Structured Output",
    text: "Your company processes 10,000 vendor invoices weekly. Currently, each invoice extraction is a real-time API call costing $0.05/invoice ($500/week). Your manager wants to move everything to the Message Batches API for the 50% cost savings. However, 200 of those weekly invoices are flagged as urgent and need extraction within 10 minutes for same-day payment processing. How should you architect this?",
    choices: [
      { label: "A", text: "Move all 10,000 invoices to batch processing — most batches finish within an hour, which is fast enough for urgent invoices too." },
      { label: "B", text: "Keep all invoices on real-time processing — the cost savings aren't worth the complexity." },
      { label: "C", text: "Use batch processing for the 9,800 non-urgent invoices and keep real-time API calls for the 200 urgent ones. Match each API to its latency requirements." },
      { label: "D", text: "Use batch processing for everything with a fallback to real-time if any invoice hasn't completed within 30 minutes." }
    ],
    correctAnswer: "C",
    explanation: "The docs state: \"The Message Batches API has processing times up to 24 hours with no guaranteed latency SLA\" making it unsuitable for the urgent invoices that need 10-minute turnaround. But it's \"well-suited to tasks that do not require immediate responses\" for the 9,800 non-urgent ones. This saves $245/week (50% of 9,800 invoices) while meeting the latency requirement. Option A risks delayed urgent payments. Option D adds unreliable complexity.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/batch-processing"
  },
  {
    id: 31,
    scenario: "Structured Data Extraction",
    domain: "Prompt Engineering & Structured Output",
    text: "Your extraction pipeline processes medical research papers to extract study metadata (sample size, methodology, key findings). Papers vary wildly in structure: some use inline citations, others have bibliographies; some describe methodology in dedicated sections, others embed it in the narrative. Your prompt instructions describe the desired output format in detail, but extraction quality is inconsistent — especially for methodology extraction, where Claude sometimes fabricates details not present in the paper. What's the most effective improvement?",
    choices: [
      { label: "A", text: "Add a validation step that cross-references extracted methodology against the source paper using a second API call." },
      { label: "B", text: "Add 3-5 few-shot examples showing correct extraction from documents with varied structures (inline citations vs bibliographies, dedicated sections vs embedded descriptions), including examples where fields are correctly set to null when information isn't present." },
      { label: "C", text: "Increase the max_tokens limit to give Claude more room to extract thoroughly." },
      { label: "D", text: "Fine-tune a custom model on your specific paper format." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"few-shot examples are the most effective technique for achieving consistently formatted, actionable output when detailed instructions alone produce inconsistent results.\" The exam guide emphasizes showing \"correct handling of varied document structures (inline citations vs bibliographies, methodology sections vs embedded details)\" and \"few-shot examples showing correct extraction from documents with varied formats to address empty/null extraction of required fields.\" This directly addresses both inconsistency and hallucination.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices"
  },
  {
    id: 32,
    scenario: "Claude Code for Continuous Integration",
    domain: "Prompt Engineering & Structured Output",
    text: "Your CI pipeline uses Claude Code to generate code reviews. After a commit is pushed, Claude reviews the PR and posts findings. When the developer pushes a fix addressing some findings, the review runs again and reposts the same findings that were already fixed — plus new duplicates of findings from the original review that the developer chose not to address. Developers are frustrated by the noise. How should you redesign the review workflow?",
    choices: [
      { label: "A", text: "Add a deduplication step that compares new findings against a database of previous findings." },
      { label: "B", text: "Include prior review findings in the context when re-running reviews after new commits, instructing Claude to report only new or still-unaddressed issues and avoid duplicate comments." },
      { label: "C", text: "Only run reviews on the initial PR submission, not on subsequent commits." },
      { label: "D", text: "Have Claude assign unique IDs to each finding so duplicates can be filtered client-side." }
    ],
    correctAnswer: "B",
    explanation: "The exam guide directly addresses this pattern under CI/CD integration: \"Including prior review findings in context when re-running reviews after new commits, instructing Claude to report only new or still-unaddressed issues to avoid duplicate comments.\" This uses context management to solve the problem at the prompt level rather than requiring external infrastructure (A, D). Skipping re-reviews (C) means newly introduced bugs in the fix would go undetected.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/cli-reference"
  },

  // Domain 5: Context Management & Reliability (5 questions)

  {
    id: 33,
    scenario: "Developer Productivity with Claude",
    domain: "Context Management & Reliability",
    text: "You're using Claude Code for a multi-phase task: first exploring a large legacy codebase to understand its architecture, then planning a migration strategy, then implementing changes. During the exploration phase, the context fills with verbose file contents and search results. By the time you reach implementation, Claude's responses become vague and it \"forgets\" specific architectural details discovered during exploration. What's the best approach?",
    choices: [
      { label: "A", text: "Use an Explore subagent for the verbose discovery phase — it runs in its own context window, returning only a summary to the main session. Then proceed with planning and implementation in the main session with a clean context." },
      { label: "B", text: "Start with a larger context window model for the exploration phase." },
      { label: "C", text: "Use /compact frequently during exploration to free up space." },
      { label: "D", text: "Copy all discovered details into a text file and tell Claude to read it when needed." }
    ],
    correctAnswer: "A",
    explanation: "The docs describe the Explore subagent as \"a fast, read-only agent optimized for searching and analyzing codebases\" that runs in its own context window. The exam guide recommends \"using the Explore subagent for isolating verbose discovery output and returning summaries to preserve main conversation context\" and \"spawning subagents to investigate specific questions while the main agent preserves high-level coordination.\" Frequent compaction (C) risks losing important details from earlier exploration.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/sub-agents"
  },
  {
    id: 34,
    scenario: "Customer Support Resolution Agent",
    domain: "Context Management & Reliability",
    text: "Your agent handles multi-issue support sessions that often last 20+ turns. Customers frequently reference earlier details: \"what about that order I mentioned earlier?\" or \"go back to the refund we discussed.\" After context compaction, the agent sometimes loses specific order numbers and amounts from early in the conversation, giving vague responses like \"your previous order\" instead of citing order #48291. How should you architect the context to preserve these critical details?",
    choices: [
      { label: "A", text: "Disable context compaction to preserve the full conversation history." },
      { label: "B", text: "Extract transactional facts (order IDs, amounts, dates, statuses) into a structured \"case facts\" block that persists outside summarized history and is included in every prompt." },
      { label: "C", text: "Store conversation history in an external database and retrieve relevant parts when needed." },
      { label: "D", text: "Limit conversations to 10 turns and start new sessions after that." }
    ],
    correctAnswer: "B",
    explanation: "The exam guide specifically describes extracting \"transactional facts (amounts, dates, order numbers, statuses) into a persistent 'case facts' block included in each prompt, outside summarized history.\" This survives compaction because it's a structured data layer separate from conversation history. Disabling compaction (A) would eventually hit context limits. External databases (C) add unnecessary infrastructure complexity for this use case.",
    isAiGenerated: true,
    source: "https://platform.claude.com/docs/en/agent-sdk/agent-loop"
  },
  {
    id: 35,
    scenario: "Multi-Agent Research System",
    domain: "Context Management & Reliability",
    text: "Your research pipeline has three subagents: web search, document analysis, and synthesis. The web search agent finds an article stating \"AI adoption grew 45% in 2025\" and another stating \"AI adoption increased 32% in 2025.\" The document analysis agent passes both findings to synthesis. The synthesis agent arbitrarily picks \"45%\" for the final report without noting the discrepancy. How should you fix this?",
    choices: [
      { label: "A", text: "Have the synthesis agent always pick the more conservative number." },
      { label: "B", text: "Require subagents to include structured claim-source mappings with publication dates. Instruct the synthesis agent to annotate conflicts with source attribution rather than arbitrarily selecting one value, and structure reports to distinguish well-established findings from contested ones." },
      { label: "C", text: "Add a fact-checking subagent that resolves all discrepancies before synthesis." },
      { label: "D", text: "Have the coordinator filter out contradictory findings before passing them to synthesis." }
    ],
    correctAnswer: "B",
    explanation: "The exam guide addresses information provenance directly: \"handle conflicting statistics from credible sources by annotating conflicts with source attribution rather than arbitrarily selecting one value\" and \"requiring publication/collection dates in structured outputs to prevent temporal differences from being misinterpreted as contradictions.\" The synthesis output should \"distinguish well-established findings from contested ones, preserving original source characterizations.\" Filtering contradictions (D) loses important information.",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/agents"
  },
  {
    id: 36,
    scenario: "Developer Productivity with Claude",
    domain: "Context Management & Reliability",
    text: "You're using Claude Code across multiple sessions for a week-long migration project. You put detailed migration rules in the initial prompt of each session, but after compaction occurs mid-session, Claude stops following some of those rules. A colleague suggests putting the rules in CLAUDE.md instead. Is this the right fix, and why?",
    choices: [
      { label: "A", text: "No — CLAUDE.md is only for project documentation, not operational rules." },
      { label: "B", text: "Yes — CLAUDE.md fully survives compaction because Claude re-reads it from disk and re-injects it fresh after /compact. Prompt content gets summarized during compaction and specific instructions may be lost." },
      { label: "C", text: "No — both CLAUDE.md and prompt instructions are treated the same during compaction." },
      { label: "D", text: "Yes, but only if the CLAUDE.md is under 50 lines." }
    ],
    correctAnswer: "B",
    explanation: "The docs state: \"CLAUDE.md fully survives compaction. After /compact, Claude re-reads your CLAUDE.md from disk and re-injects it fresh into the session.\" In contrast: \"Compaction replaces older messages with a summary, so specific instructions from early in the conversation may not be preserved. Persistent rules belong in CLAUDE.md rather than in the initial prompt.\" This is the exact scenario described — migration rules should be in CLAUDE.md for compaction resilience.",
    isAiGenerated: true,
    source: "https://code.claude.com/docs/en/memory"
  },
  {
    id: 37,
    scenario: "Multi-Agent Research System",
    domain: "Context Management & Reliability",
    text: "Your web search subagent times out while researching market data for a financial report. The subagent catches the timeout and returns an empty result set marked as successful (no error flag). The coordinator continues, and the synthesis agent produces a report with a section on market trends that contains only generic statements with no specific data. The report goes to stakeholders who don't realize the market data section is based on nothing. What's the correct error handling pattern?",
    choices: [
      { label: "A", text: "Add a minimum result count check in the coordinator — if any subagent returns fewer than 5 results, re-run it." },
      { label: "B", text: "The subagent should return structured error context (failure type, attempted query, partial results, alternatives) with an error flag, so the coordinator can decide whether to retry, use alternative sources, or annotate the final report with coverage gaps." },
      { label: "C", text: "Add a timeout extension so the subagent has more time to complete." },
      { label: "D", text: "Have the synthesis agent detect when it lacks sufficient data and refuse to generate that section." }
    ],
    correctAnswer: "B",
    explanation: "The exam guide explicitly identifies this anti-pattern: \"silently suppressing errors (returning empty results as success) or terminating entire workflows on single failures are both anti-patterns.\" The correct pattern returns \"structured error context including failure type, attempted query, partial results, and potential alternatives\" so the coordinator can make intelligent recovery decisions. The coordinator must be able to \"distinguish access failures (needing retry decisions) from valid empty results (representing successful queries with no matches).\"",
    isAiGenerated: true,
    source: "https://docs.anthropic.com/en/docs/agents"
  }
];
