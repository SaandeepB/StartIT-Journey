import type { Content } from "./schema";

/* ─────────────────────────────────────────────────────────────────────────────
   Default (sample) content.

   RULES THIS FILE FOLLOWS
   • Nothing factual is invented. Team names, dates, people, ratings, feedback
     and every number are [bracketed placeholders] that the editor highlights.
   • Illustrative projects, tools, moments and AI initiatives are flagged
     `isSample: true` so the viewer badges them until they are replaced.
   • Narrative copy comes from the brief's own words, tightened for the screen.
   ──────────────────────────────────────────────────────────────────────────── */

const R1 = "rotation-1";
const R2 = "rotation-2";
const R3 = "rotation-3";

export const DEFAULT_CONTENT: Content = {
  meta: { version: 1, updatedAt: "" },

  profile: {
    name: "[Your Name]",
    designation: "[Your Designation, e.g. Rotational Analyst]",
    programName: "[Rotational Program Name]",
    organization: "[Organization]",
    programStart: "",
    programEnd: "",
    totalDurationLabel: "18 months",
    headline: "Connecting the Dots.",
    supportingStatement:
      "An 18-month journey across business, marketing, analytics, and technology.",
    themeTitle: "The Systems Connector",
    themeSubtitle:
      "18 Months. 3 Rotations. Multiple Perspectives. One Connected Vision.",
    narrative:
      "Over 18 months I have worked across three teams, each exposing me to different business functions, workflows, technologies, stakeholders and ways of solving problems. Each rotation helped me understand a different part of the organization. Along the way I developed the ability to connect business requirements with analytical thinking, connect disconnected data and systems, and identify where AI can simplify, automate and improve how work gets done. My next step is to bring these perspectives together in a full-time role focused on connecting systems, workflows, data and AI to create scalable business value.",
    keyCapabilities: [
      "Translating business requirements into analytical solutions",
      "Connecting disconnected data, systems and workflows",
      "Marketing operations and process analysis",
      "Reporting, business intelligence and decision support",
      "API-driven data extraction and automation",
      "Applying AI to simplify and automate real work",
    ],
    photoUrl: "",
    email: "",
    linkedin: "",
  },

  rotations: [
    {
      id: R1,
      teamName: "[Rotation 1 Team Name]",
      businessFunction: "[Business function, e.g. Marketing Operations]",
      startDate: "",
      endDate: "",
      durationLabel: "[6 months]",
      manager: "[Manager name, title]",
      mentor: "[Mentor name, title]",
      summary:
        "[Two or three sentences on what this team does, who it serves, and what you focused on during the rotation.]",
      responsibilities: [
        "[Primary responsibility 1]",
        "[Primary responsibility 2]",
        "[Primary responsibility 3]",
      ],
      technologies: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
      learnings: [
        "[Important learning 1 — e.g. how marketing work actually flows between teams]",
        "[Important learning 2]",
      ],
    },
    {
      id: R2,
      teamName: "[Rotation 2 Team Name]",
      businessFunction: "[Business function, e.g. Analytics & Insights]",
      startDate: "",
      endDate: "",
      durationLabel: "[6 months]",
      manager: "[Manager name, title]",
      mentor: "[Mentor name, title]",
      summary:
        "[Two or three sentences on what this team does, who it serves, and what you focused on during the rotation.]",
      responsibilities: [
        "[Primary responsibility 1]",
        "[Primary responsibility 2]",
        "[Primary responsibility 3]",
      ],
      technologies: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
      learnings: ["[Important learning 1]", "[Important learning 2]"],
    },
    {
      id: R3,
      teamName: "[Rotation 3 Team Name]",
      businessFunction: "[Business function, e.g. Technology & Integration]",
      startDate: "",
      endDate: "",
      durationLabel: "[6 months]",
      manager: "[Manager name, title]",
      mentor: "[Mentor name, title]",
      summary:
        "[Two or three sentences on what this team does, who it serves, and what you focused on during the rotation.]",
      responsibilities: [
        "[Primary responsibility 1]",
        "[Primary responsibility 2]",
        "[Primary responsibility 3]",
      ],
      technologies: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
      learnings: ["[Important learning 1]", "[Important learning 2]"],
    },
  ],

  projects: [
    {
      id: "project-reporting-automation",
      rotationId: R1,
      title: "Weekly Marketing Performance Reporting Automation",
      subtitle:
        "Replacing a manual, multi-source weekly report with a repeatable, automated workflow.",
      ownership: "owned",
      status: "delivered",
      featured: true,
      isSample: true,
      businessContext:
        "The team produced a weekly performance report for [N] stakeholders by manually combining exports from [Platform A], [Platform B] and [Platform C].",
      problemStatement:
        "Each report took [X] hours to assemble, numbers were occasionally inconsistent between sources, and the format could not be reused by other teams.",
      whyItMattered:
        "Leadership relied on the report for [weekly decision, e.g. budget reallocation]. Delays and inconsistencies reduced confidence in the numbers and the team's capacity for analysis.",
      myRole:
        "I owned the end-to-end redesign: mapping the current workflow, defining the data model, building the automation and handing it over to the team.",
      approach:
        "Documented every manual step, identified which sources could be pulled programmatically, standardised metric definitions with stakeholders, then built and validated the automated version against three historical reports.",
      tools: ["[e.g. Python]", "[e.g. SQL]", "[e.g. Power BI]", "[Platform APIs]"],
      aiInvolvement:
        "[Describe any AI involvement, e.g. an LLM used to draft the weekly commentary from the validated numbers — or leave blank.]",
      challenges:
        "Metric definitions differed between platforms; one source had no API and required a scheduled export; stakeholders initially wanted every legacy column retained.",
      solution:
        "A scheduled pipeline that pulls, reconciles and publishes the report, with a short exception log for anything that fails validation.",
      businessImpact:
        "[State only what you can evidence: time saved, consistency improvements, decisions enabled, teams that adopted it.]",
      keyLearning:
        "Automation succeeds or fails on the definitions, not the code — aligning on what a metric means mattered more than the pipeline itself.",
      metrics: [
        { label: "Hours saved per week", value: "", note: "Measured before and after handover" },
        { label: "Data sources connected", value: "", note: "" },
        { label: "Teams using the report", value: "", note: "" },
      ],
      images: [],
    },
    {
      id: "project-data-quality-audit",
      rotationId: R1,
      title: "Campaign Data Quality Audit",
      subtitle: "Finding and fixing the gaps between how campaigns were tagged and how they were reported.",
      ownership: "contributed",
      status: "delivered",
      featured: false,
      isSample: true,
      businessContext:
        "Campaign performance reporting depended on consistent tagging across [N] channels and [N] teams.",
      problemStatement:
        "A material share of campaigns could not be attributed because naming conventions were applied inconsistently.",
      whyItMattered:
        "Unattributed spend made channel comparisons unreliable and slowed down optimisation decisions.",
      myRole:
        "I contributed the audit analysis and the proposed naming standard; the channel leads owned the rollout.",
      approach:
        "Profiled [N months] of campaign records, classified the failure modes, quantified their impact, and proposed a validation rule set.",
      tools: ["[e.g. SQL]", "[e.g. Excel]", "[Campaign management platform]"],
      aiInvolvement: "",
      challenges:
        "Legacy campaigns could not be re-tagged retroactively; teams had different incentives for consistency.",
      solution:
        "A documented naming standard, a validation checklist for new campaigns, and a monthly quality report.",
      businessImpact:
        "[Share of campaigns attributable before vs after; number of teams adopting the standard — only if measured.]",
      keyLearning:
        "Data quality is a process problem first; the analysis only matters if it changes what people do upstream.",
      metrics: [
        { label: "Attribution coverage", value: "", note: "Share of spend attributable to a campaign" },
        { label: "Quality issues resolved", value: "", note: "" },
      ],
      images: [],
    },
    {
      id: "project-analytics-data-model",
      rotationId: R2,
      title: "Cross-Platform Analytics Data Model",
      subtitle: "One consistent model for metrics that previously lived in separate tools.",
      ownership: "owned",
      status: "delivered",
      featured: true,
      isSample: true,
      businessContext:
        "Analysts answered similar questions from different systems with different definitions, which produced conflicting numbers in leadership reviews.",
      problemStatement:
        "There was no shared layer that reconciled [System A] and [System B] data into comparable metrics.",
      whyItMattered:
        "Conflicting numbers consumed meeting time and delayed decisions on [business area].",
      myRole:
        "I owned the design and build of the model and the documentation of metric definitions.",
      approach:
        "Interviewed [N] analysts and stakeholders, catalogued metric definitions, designed a conformed model, then validated it against known reference figures.",
      tools: ["[e.g. SQL]", "[e.g. dbt]", "[Data warehouse]", "[BI tool]"],
      aiInvolvement:
        "[e.g. Used an LLM to accelerate documentation of metric definitions and SQL review — if applicable.]",
      challenges:
        "Source systems changed schema mid-project; some business rules had never been written down.",
      solution:
        "A documented, tested analytics model consumed by [N] dashboards, with a metric glossary owned by the team.",
      businessImpact:
        "[Evidence only: dashboards migrated, reconciliation issues reduced, time to answer questions.]",
      keyLearning:
        "A shared definition is a product that needs an owner, not a one-off deliverable.",
      metrics: [
        { label: "Dashboards consuming the model", value: "", note: "" },
        { label: "Metric definitions documented", value: "", note: "" },
      ],
      images: [],
    },
    {
      id: "project-self-service-dashboard",
      rotationId: R2,
      title: "Self-Service Dashboard for [Stakeholder Group]",
      subtitle: "Moving a stakeholder group from ad-hoc requests to self-service answers.",
      ownership: "collaborated",
      status: "delivered",
      featured: false,
      isSample: true,
      businessContext:
        "[Stakeholder group] raised frequent ad-hoc data requests that the analytics team answered individually.",
      problemStatement:
        "Repeated requests consumed analyst time and stakeholders waited days for answers they needed the same day.",
      whyItMattered:
        "Faster answers meant faster decisions on [business process], and freed analysts for deeper work.",
      myRole:
        "I collaborated with [analyst/partner] on requirements, built the data layer, and co-designed the dashboard; they led stakeholder training.",
      approach:
        "Categorised [N weeks] of requests, designed views that answered the top recurring questions, iterated with a pilot group.",
      tools: ["[BI tool]", "[e.g. SQL]"],
      aiInvolvement: "",
      challenges:
        "Stakeholders asked for every possible filter; the first version was too dense to use.",
      solution:
        "A focused dashboard with guided views and a request form for anything not covered.",
      businessImpact:
        "[Reduction in ad-hoc requests; number of active users — only if measured.]",
      keyLearning:
        "Fewer, clearer views beat comprehensive ones. Adoption is the real metric.",
      metrics: [
        { label: "Active users", value: "", note: "" },
        { label: "Ad-hoc requests per month", value: "", note: "Before vs after" },
      ],
      images: [],
    },
    {
      id: "project-api-extraction",
      rotationId: R3,
      title: "API-Driven Data Extraction Pipeline",
      subtitle: "Replacing manual exports with scheduled, validated API extractions.",
      ownership: "owned",
      status: "prototype",
      featured: true,
      isSample: true,
      businessContext:
        "Several teams depended on manual exports from [Platform] that were pasted into spreadsheets and reports.",
      problemStatement:
        "Exports were slow, error-prone and impossible to audit; nobody could say which version of the data a report used.",
      whyItMattered:
        "Reliable, timely data from this platform fed [reporting / decision process] used by [teams].",
      myRole:
        "I owned the prototype: authentication, extraction, validation and documentation.",
      approach:
        "Explored the platform API, designed an incremental extraction with validation checks, and compared outputs against manual exports for [N] periods.",
      tools: ["[e.g. Python]", "[REST API]", "[Scheduler / workflow tool]", "[Storage]"],
      aiInvolvement:
        "[e.g. Used an AI coding assistant to accelerate API client scaffolding and test cases — if applicable.]",
      challenges:
        "Rate limits, undocumented fields and access approvals took longer than the code.",
      solution:
        "A working prototype that extracts, validates and lands the data on a schedule. Not yet in production — see status.",
      businessImpact:
        "[Prototype status: describe validation results and what a production rollout would require.]",
      keyLearning:
        "Integration work is mostly governance and access; the technical part is the smallest piece.",
      metrics: [
        { label: "Manual export steps removed", value: "", note: "" },
        { label: "Records validated against manual exports", value: "", note: "" },
      ],
      images: [],
    },
    {
      id: "project-knowledge-assistant",
      rotationId: R3,
      title: "Internal Knowledge Assistant — LLM Proof of Concept",
      subtitle: "Letting people ask questions of scattered documentation instead of searching for it.",
      ownership: "owned",
      status: "prototype",
      featured: false,
      isSample: true,
      businessContext:
        "Team knowledge lived across [wiki], [shared drives] and [chat history]; new joiners and adjacent teams struggled to find answers.",
      problemStatement:
        "Finding the right document took longer than reading it, and the same questions were asked repeatedly.",
      whyItMattered:
        "Time spent searching is invisible but constant; it slowed onboarding and cross-team work.",
      myRole:
        "I owned the proof of concept end to end, from use-case selection to evaluation.",
      approach:
        "Selected a bounded document set, built a retrieval-augmented assistant, evaluated answers against [N] real questions with the team.",
      tools: ["[LLM API / platform]", "[Vector store]", "[e.g. Python]"],
      aiInvolvement:
        "Core to the project: retrieval-augmented generation over internal documents, with citations back to the source.",
      challenges:
        "Stale documents produced confident wrong answers; data-handling approval was required before using real content.",
      solution:
        "A proof of concept that answers questions with citations, plus an evaluation set and a note on what production would require.",
      businessImpact:
        "[Proof of concept only. Record evaluation accuracy and stakeholder feedback — do not claim production impact.]",
      keyLearning:
        "Validating outputs is the actual work. The model is the easy part; trust is the hard part.",
      metrics: [
        { label: "Questions in evaluation set", value: "", note: "" },
        { label: "Answers rated useful by the team", value: "", note: "Share of evaluation set" },
      ],
      images: [],
    },
    {
      id: "project-integration-opportunity",
      rotationId: R3,
      title: "Unified Marketing Systems Integration — Opportunity Identified",
      subtitle: "A cross-team integration opportunity surfaced across rotations, not yet implemented.",
      ownership: "identified",
      status: "proposed",
      featured: false,
      isSample: true,
      businessContext:
        "Across three rotations the same data moved between [System A], [System B] and [System C] by hand, in different teams, for different purposes.",
      problemStatement:
        "Each team solved its own slice of the problem; nobody owned the connection between them.",
      whyItMattered:
        "The duplicated effort and inconsistent data are only visible from outside any single team.",
      myRole:
        "I identified and documented the opportunity and shared it with [leaders]. I have not implemented it.",
      approach:
        "Mapped the end-to-end flow of the data across teams and estimated effort and dependencies for an integrated approach.",
      tools: ["[Process mapping]", "[Integration platform options]"],
      aiInvolvement: "",
      challenges: "Ownership sits across functions; no single team has the mandate.",
      solution: "Not implemented. A proposal with a phased approach is included in the proposed role section.",
      businessImpact: "[Potential only — describe the hypothesis, not a result.]",
      keyLearning:
        "The most valuable opportunities sit between teams, which is exactly why they go unowned.",
      metrics: [],
      images: [],
    },
  ],

  performance: [
    {
      rotationId: R1,
      rating: "[Final rating]",
      ratingScale: "[Rating scale, e.g. 1–5]",
      numericValue: null,
      scaleMax: null,
      category: "[Performance category]",
      managerFeedback:
        "[Paste the manager's final feedback for this rotation — quote it or paraphrase faithfully.]",
      feedbackSource: "[Final rotation review, Month YYYY]",
      strengths: ["[Strength recognised 1]", "[Strength recognised 2]"],
      developmentAreas: ["[Development area 1]"],
      supportingExamples: ["[Example of work that supports this feedback]"],
    },
    {
      rotationId: R2,
      rating: "[Final rating]",
      ratingScale: "[Rating scale, e.g. 1–5]",
      numericValue: null,
      scaleMax: null,
      category: "[Performance category]",
      managerFeedback:
        "[Paste the manager's final feedback for this rotation — quote it or paraphrase faithfully.]",
      feedbackSource: "[Final rotation review, Month YYYY]",
      strengths: ["[Strength recognised 1]", "[Strength recognised 2]"],
      developmentAreas: ["[Development area 1]"],
      supportingExamples: ["[Example of work that supports this feedback]"],
    },
    {
      rotationId: R3,
      rating: "[Final rating or “In progress”]",
      ratingScale: "[Rating scale, e.g. 1–5]",
      numericValue: null,
      scaleMax: null,
      category: "[Performance category]",
      managerFeedback:
        "[Paste the manager's final feedback for this rotation — quote it or paraphrase faithfully.]",
      feedbackSource: "[Final rotation review, Month YYYY]",
      strengths: ["[Strength recognised 1]", "[Strength recognised 2]"],
      developmentAreas: ["[Development area 1]"],
      supportingExamples: ["[Example of work that supports this feedback]"],
    },
  ],

  feedbackThemes: [
    {
      theme: "[Consistent strength, e.g. Takes ownership of ambiguous problems]",
      type: "strength",
      rotationIds: [R1, R2, R3],
      note: "",
    },
    {
      theme: "[Consistent strength, e.g. Clear written communication]",
      type: "strength",
      rotationIds: [R1, R2, R3],
      note: "",
    },
    {
      theme: "[Skill that improved, e.g. Presenting to senior stakeholders]",
      type: "improved",
      rotationIds: [R2, R3],
      note: "",
    },
    {
      theme: "[Skill that improved, e.g. Technical depth in data engineering]",
      type: "improved",
      rotationIds: [R3],
      note: "",
    },
    {
      theme: "[Development area, e.g. Prioritising across competing requests]",
      type: "developing",
      rotationIds: [R2, R3],
      note: "",
    },
  ],

  learning: [
    {
      id: "domain-business",
      title: "Business Understanding",
      description: "How the organisation actually works, and how requirements become solutions.",
      isSample: true,
      capabilities: [
        { name: "Marketing workflows", levels: { [R1]: "practiced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Business operations", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Stakeholder management", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Understanding organisational processes", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "practiced" }, evidence: "" },
        { name: "Connecting requirements to technical solutions", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
      ],
    },
    {
      id: "domain-analytical",
      title: "Analytical Capabilities",
      description: "Turning data into decisions.",
      isSample: true,
      capabilities: [
        { name: "Data analysis", levels: { [R1]: "practiced", [R2]: "applied", [R3]: "applied" }, evidence: "" },
        { name: "Reporting", levels: { [R1]: "practiced", [R2]: "applied", [R3]: "applied" }, evidence: "" },
        { name: "Business intelligence", levels: { [R1]: "introduced", [R2]: "applied", [R3]: "practiced" }, evidence: "" },
        { name: "Problem-solving", levels: { [R1]: "practiced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Data interpretation", levels: { [R1]: "practiced", [R2]: "applied", [R3]: "applied" }, evidence: "" },
        { name: "Decision support", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
      ],
    },
    {
      id: "domain-technical",
      title: "Technical Capabilities",
      description: "The tools and platforms behind the work.",
      isSample: true,
      capabilities: [
        { name: "Programming languages", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Data platforms", levels: { [R1]: "none", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "APIs", levels: { [R1]: "none", [R2]: "introduced", [R3]: "applied" }, evidence: "" },
        { name: "Cloud technologies", levels: { [R1]: "none", [R2]: "introduced", [R3]: "practiced" }, evidence: "" },
        { name: "Automation", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Visualisation tools", levels: { [R1]: "practiced", [R2]: "applied", [R3]: "practiced" }, evidence: "" },
      ],
    },
    {
      id: "domain-professional",
      title: "Professional Development",
      description: "How I work with people and ambiguity.",
      isSample: true,
      capabilities: [
        { name: "Communication", levels: { [R1]: "practiced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Ownership", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Collaboration", levels: { [R1]: "practiced", [R2]: "applied", [R3]: "applied" }, evidence: "" },
        { name: "Adaptability", levels: { [R1]: "practiced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Presenting to leadership", levels: { [R1]: "none", [R2]: "introduced", [R3]: "practiced" }, evidence: "" },
        { name: "Managing ambiguity", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
      ],
    },
  ],

  moments: [
    {
      type: "high",
      isSample: true,
      title: "[A project I am particularly proud of]",
      rotationId: R1,
      description: "[What you did, who it helped, and why it stood out.]",
      lesson: "[What it taught you about your own strengths.]",
    },
    {
      type: "high",
      isSample: true,
      title: "[A new technology I learned and applied]",
      rotationId: R3,
      description: "[What you learned, how quickly, and what you built with it.]",
      lesson: "",
    },
    {
      type: "high",
      isSample: true,
      title: "[A moment I solved a problem independently]",
      rotationId: R2,
      description: "[The situation, what you tried, and how it resolved.]",
      lesson: "",
    },
    {
      type: "low",
      isSample: true,
      title: "[A project that did not go as expected]",
      rotationId: R1,
      description: "[What was planned, what happened, and what you did about it.]",
      lesson: "[How you adapted and what you would do differently.]",
    },
    {
      type: "low",
      isSample: true,
      title: "[Ambiguous requirements I had to work through]",
      rotationId: R2,
      description: "[Where the ambiguity came from and how you created clarity.]",
      lesson: "",
    },
    {
      type: "low",
      isSample: true,
      title: "[A technical limitation that changed the plan]",
      rotationId: R3,
      description: "[The constraint you hit and the alternative route you found.]",
      lesson: "",
    },
    {
      type: "turning",
      isSample: true,
      title: "[The moment I started thinking beyond the immediate task]",
      rotationId: R2,
      description: "[What you noticed about how work connected across teams.]",
      lesson: "[How it changed your approach to problem-solving.]",
    },
    {
      type: "turning",
      isSample: true,
      title: "[The experience that reshaped my career interests]",
      rotationId: R3,
      description: "[What you were doing, and why it clicked.]",
      lesson: "",
    },
  ],

  techStack: [
    { name: "[e.g. Python]", isSample: true, category: "Programming and Analytics", rotationIds: [R2, R3], usedFor: "[Data preparation, automation scripts, API clients]", exposure: "hands-on", exampleProjectId: "project-api-extraction", description: "[Short description of how you used it and at what depth.]" },
    { name: "[e.g. SQL]", isSample: true, category: "Programming and Analytics", rotationIds: [R1, R2, R3], usedFor: "[Querying, modelling and reconciling data]", exposure: "independent", exampleProjectId: "project-analytics-data-model", description: "" },
    { name: "[e.g. Excel / Google Sheets]", isSample: true, category: "Programming and Analytics", rotationIds: [R1], usedFor: "[Analysis and stakeholder-facing working files]", exposure: "independent", exampleProjectId: "project-data-quality-audit", description: "" },
    { name: "[e.g. Power BI / Tableau / Looker]", isSample: true, category: "Business Intelligence and Reporting", rotationIds: [R1, R2], usedFor: "[Dashboards and recurring reports]", exposure: "hands-on", exampleProjectId: "project-self-service-dashboard", description: "" },
    { name: "[e.g. Marketing analytics platform]", isSample: true, category: "Marketing Analytics and Measurement", rotationIds: [R1], usedFor: "[Campaign performance measurement]", exposure: "guided", exampleProjectId: "project-reporting-automation", description: "" },
    { name: "[e.g. Campaign management platform]", isSample: true, category: "Marketing Analytics and Measurement", rotationIds: [R1], usedFor: "[Campaign setup data and tagging audits]", exposure: "familiar", exampleProjectId: "project-data-quality-audit", description: "" },
    { name: "[e.g. Cloud data warehouse]", isSample: true, category: "Data Platforms and Warehousing", rotationIds: [R2, R3], usedFor: "[Analytics models and landing extracted data]", exposure: "hands-on", exampleProjectId: "project-analytics-data-model", description: "" },
    { name: "[e.g. REST APIs]", isSample: true, category: "APIs and Integrations", rotationIds: [R3], usedFor: "[Programmatic data extraction]", exposure: "hands-on", exampleProjectId: "project-api-extraction", description: "" },
    { name: "[e.g. API testing tool]", isSample: true, category: "APIs and Integrations", rotationIds: [R3], usedFor: "[Exploring and testing endpoints]", exposure: "hands-on", exampleProjectId: "project-api-extraction", description: "" },
    { name: "[e.g. LLM API or enterprise AI platform]", isSample: true, category: "AI and LLM Tools", rotationIds: [R3], usedFor: "[Retrieval-augmented assistant proof of concept]", exposure: "hands-on", exampleProjectId: "project-knowledge-assistant", description: "" },
    { name: "[e.g. AI coding assistant]", isSample: true, category: "AI and LLM Tools", rotationIds: [R2, R3], usedFor: "[Accelerating scripting, SQL review and documentation]", exposure: "independent", exampleProjectId: "project-api-extraction", description: "" },
    { name: "[e.g. Workflow automation tool]", isSample: true, category: "Workflow Automation", rotationIds: [R1, R3], usedFor: "[Scheduling and orchestrating recurring tasks]", exposure: "guided", exampleProjectId: "project-reporting-automation", description: "" },
  ],

  aiInitiatives: [
    {
      id: "ai-reporting-commentary",
      title: "AI-Assisted Weekly Reporting and Analysis",
      status: "prototype",
      isSample: true,
      rotationId: R1,
      existingWorkflow:
        "Numbers were assembled by hand from [N] sources each week, then an analyst wrote the commentary and formatted the deck.",
      friction:
        "Most of the effort went into assembly and formatting rather than analysis; commentary quality depended on who had time that week.",
      opportunity:
        "Automate assembly and validation, then use an LLM to draft commentary from the validated numbers for an analyst to review and finalise.",
      architecture: [
        "Business systems",
        "Scheduled data extraction",
        "Validation and reconciliation",
        "Analytics layer",
        "LLM drafts commentary with figures cited",
        "Analyst review",
        "Published report",
      ],
      technologies: ["[Pipeline tool]", "[SQL]", "[LLM API]", "[BI / document tool]"],
      implemented:
        "[What you personally built — e.g. the extraction and validation steps, the prompt and output checks, the review workflow.]",
      results:
        "Prototype. [Record validation findings, review feedback and what remains before it can be relied on.]",
      nextOpportunity:
        "Extend the same pattern to [other recurring reports]; add anomaly flags so commentary focuses on what changed.",
      before: {
        title: "Manual weekly report",
        steps: ["Export from each platform", "Paste and reconcile in spreadsheet", "Write commentary", "Format deck", "Send"],
        metrics: [{ label: "Analyst time per report", value: "", note: "" }],
      },
      after: {
        title: "Automated assembly with reviewed AI commentary",
        steps: ["Scheduled extraction and validation", "Draft commentary generated", "Analyst reviews and edits", "Publish"],
        metrics: [{ label: "Analyst time per report", value: "", note: "" }],
      },
    },
    {
      id: "ai-api-extraction",
      title: "API-Driven Data Extraction Replacing Manual Exports",
      status: "prototype",
      isSample: true,
      rotationId: R3,
      existingWorkflow:
        "Team members logged into [Platform], ran exports, and pasted results into shared spreadsheets used by downstream reports.",
      friction:
        "Exports were slow, inconsistent between people, and left no audit trail of which data a report used.",
      opportunity:
        "Scheduled, validated API extraction into a shared store that downstream reports read from directly.",
      architecture: [
        "Platform API",
        "Authenticated extraction job",
        "Schema and freshness validation",
        "Shared data store",
        "Downstream analytics and reports",
      ],
      technologies: ["[Python]", "[REST API]", "[Scheduler]", "[Storage / warehouse]"],
      implemented:
        "[What you personally built — e.g. the API client, incremental extraction logic, validation checks and documentation.]",
      results:
        "Prototype validated against [N] periods of manual exports. [State match rate and open issues.] Not in production.",
      nextOpportunity:
        "Production hardening (monitoring, alerting, access review) and onboarding a second source system.",
      before: {
        title: "Manual exports",
        steps: ["Log in", "Configure and run export", "Download", "Paste into spreadsheet", "Fix formatting", "Share"],
        metrics: [{ label: "Steps per refresh", value: "", note: "Count from the current process" }],
      },
      after: {
        title: "Scheduled API extraction",
        steps: ["Scheduled job extracts and validates", "Data lands in shared store", "Reports refresh automatically"],
        metrics: [{ label: "Steps per refresh", value: "", note: "Prototype" }],
      },
    },
    {
      id: "ai-knowledge-assistant",
      title: "Internal Knowledge Assistant",
      status: "prototype",
      isSample: true,
      rotationId: R3,
      existingWorkflow:
        "People searched [wiki], shared drives and chat history, or asked a colleague, to find process answers.",
      friction:
        "Answers existed but were hard to find; the same questions recurred and documentation drifted out of date.",
      opportunity:
        "A retrieval-augmented assistant over a curated document set that answers with citations, surfacing stale content as a by-product.",
      architecture: [
        "Curated internal documents",
        "Chunking and embedding",
        "Vector store",
        "Retrieval",
        "LLM answer with citations",
        "User feedback captured",
      ],
      technologies: ["[LLM API / platform]", "[Vector store]", "[Python]"],
      implemented:
        "[What you personally built — e.g. ingestion, retrieval, prompt design, evaluation set and feedback capture.]",
      results:
        "Proof of concept evaluated on [N] real questions. [Record useful-answer rate and failure modes.] Requires data-handling approval before wider use.",
      nextOpportunity:
        "Pilot with one team, add document freshness checks, and measure time-to-answer against the current process.",
      before: {
        title: "Search and ask around",
        steps: ["Search wiki", "Search shared drive", "Ask a colleague", "Read several documents", "Answer"],
        metrics: [{ label: "Time to answer", value: "", note: "" }],
      },
      after: {
        title: "Ask the assistant, verify the citation",
        steps: ["Ask question", "Receive answer with sources", "Verify source", "Act"],
        metrics: [{ label: "Time to answer", value: "", note: "Proof of concept" }],
      },
    },
  ],

  connectingDots: {
    pillars: [
      { label: "Business Understanding", description: "How work actually gets done, and who it serves.", rotationIds: [R1, R2, R3] },
      { label: "Marketing Workflows", description: "How campaigns, data and decisions move between teams.", rotationIds: [R1] },
      { label: "Data & Analytics", description: "Turning fragmented data into comparable, trusted numbers.", rotationIds: [R2] },
      { label: "Systems & Technology", description: "How platforms connect — and where they do not.", rotationIds: [R3] },
      { label: "Artificial Intelligence", description: "Where automation and AI remove repetitive work.", rotationIds: [R3] },
    ],
    insight:
      "I have increasingly found myself looking beyond individual deliverables and asking a bigger question: how can we connect the systems, data, processes and people involved in getting work done?",
    synthesis:
      "Each rotation showed me one part of the organisation from the inside. Together they revealed something no single team can see: the same data, moving between the same systems, handled differently by each team. Understanding marketing workflows tells me where the friction is. Analytics tells me how to measure it. Systems and AI give me the means to remove it. That combination is what lets me identify opportunities across functional boundaries rather than within them.",
    crossBoundaryOpportunities: [
      "[Opportunity 1 — e.g. one validated data feed replacing three team-specific exports]",
      "[Opportunity 2 — e.g. a shared metric glossary used by marketing, analytics and finance]",
      "[Opportunity 3 — e.g. AI-drafted commentary across every recurring report]",
    ],
  },

  proposedRole: {
    roleTitle: "Systems & Marketing Operations Connector — Analytics and AI",
    positioning: "Connecting Systems, Marketing Operations, Analytics and AI.",
    pillars: [
      {
        title: "Systems Connectivity",
        description: "Identify opportunities to connect disconnected systems, data sources, platforms and workflows.",
        evidence: "[e.g. API extraction prototype — Rotation 3]",
      },
      {
        title: "Marketing Operations and Workflow Intelligence",
        description: "Understand end-to-end marketing processes, identify inefficiencies and improve operational workflows.",
        evidence: "[e.g. Reporting automation — Rotation 1]",
      },
      {
        title: "Analytics and Decision Intelligence",
        description: "Translate fragmented data into actionable business insights and decision-support capabilities.",
        evidence: "[e.g. Cross-platform data model — Rotation 2]",
      },
      {
        title: "AI-Powered Automation",
        description: "Identify repetitive processes and develop AI-enabled solutions, integrations and intelligent workflows.",
        evidence: "[e.g. Knowledge assistant proof of concept — Rotation 3]",
      },
      {
        title: "Cross-Functional Innovation",
        description: "Work across business teams, IT, marketing, analytics and technology to turn operational challenges into scalable solutions.",
        evidence: "[e.g. Integration opportunity identified across all three rotations]",
      },
    ],
    roadmap: [
      {
        label: "First 30 days",
        title: "Understand and map",
        items: [
          "Understand leadership priorities and current pain points",
          "Map the key marketing and reporting workflows end to end",
          "Identify systems, data sources and dependencies",
        ],
      },
      {
        label: "Next 60 days",
        title: "Prioritise and prototype",
        items: [
          "Prioritise opportunities by value and feasibility",
          "Develop solution concepts with the teams involved",
          "Validate feasibility and build focused prototypes",
        ],
      },
      {
        label: "Next 90 days",
        title: "Implement and scale",
        items: [
          "Implement selected improvements with clear owners",
          "Measure impact against the baseline",
          "Document reusable solutions and establish a scalable roadmap",
        ],
      },
    ],
    closingStatement:
      "I don't just want to work within a single workflow. I want to help connect the workflows. I want to combine my understanding of marketing, analytical problem-solving and hands-on AI capabilities to make the organisation more connected, intelligent and efficient.",
    asks: [
      "[e.g. A sponsor in leadership and access to the systems in scope]",
    ],
  },

  executiveSummary: {
    headline: "The Systems Connector",
    summary:
      "Across three rotations I have worked in marketing operations, analytics and technology, delivering reporting, data and automation work while building a view of how these functions connect. I am proposing a full-time role focused on connecting systems, workflows, analytics and AI to create scalable business value.",
    highlights: [
      "[Evidence-backed highlight 1 — e.g. automated a weekly report used by N stakeholders]",
      "[Evidence-backed highlight 2 — e.g. designed the analytics model behind N dashboards]",
      "[Evidence-backed highlight 3 — e.g. built and validated an API extraction prototype]",
      "[Evidence-backed highlight 4 — e.g. final ratings across the three rotations]",
    ],
  },

  settings: {
    highlightPlaceholders: true,
    showSampleBadges: true,
    showMetricsWithoutValues: true,
  },
};
