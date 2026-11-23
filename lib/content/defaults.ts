import type { Content } from "./schema";

/* ─────────────────────────────────────────────────────────────────────────────
   Default content — Saandeep Boda, Start IT Program, Siemens.

   RULES THIS FILE FOLLOWS
   • Only facts Saandeep has supplied are stated. Everything still missing
     (dates, ratings, feedback, project details, numbers) is a [bracketed
     placeholder] that the editor counts and the site outlines.
   • Items that are pure structure, not real content yet, are flagged
     `isSample: true` so the viewer badges them until they are replaced.
   ──────────────────────────────────────────────────────────────────────────── */

const R1 = "rotation-1";
const R2 = "rotation-2";
const R3 = "rotation-3";

const placeholderProject = (id: string, rotationId: string, n: number) => ({
  id,
  rotationId,
  title: `[Project title — Rotation ${n}]`,
  subtitle: "[One-line summary shown on the card]",
  ownership: "owned" as const,
  status: "delivered" as const,
  featured: true,
  isSample: true,
  businessContext: "[Where this work sits in the business]",
  problemStatement: "[The specific problem, stated plainly]",
  whyItMattered: "[Why it mattered to the team or business]",
  myRole: "[What you personally did and were accountable for]",
  approach: "[How you approached it]",
  tools: ["[Tool]"],
  aiInvolvement: "",
  challenges: "[What made it hard]",
  solution: "[What was built or changed]",
  businessImpact: "[Only what you can evidence: time saved, adoption, decisions enabled]",
  keyLearning: "[Key learning]",
  metrics: [],
  images: [],
});

export const DEFAULT_CONTENT: Content = {
  meta: { version: 1, updatedAt: "" },

  profile: {
    name: "Saandeep Boda",
    designation: "Marketing Analyst",
    programName: "Start IT Program",
    organization: "Siemens",
    programStart: "",
    programEnd: "",
    totalDurationLabel: "18 months",
    headline: "Connecting the Dots.",
    supportingStatement:
      "An 18-month journey across data analytics, search engine marketing and field marketing.",
    themeTitle: "The Systems Connector",
    themeSubtitle:
      "18 Months. 3 Rotations. Multiple Perspectives. One Connected Vision.",
    narrative:
      "Over 18 months in the Start IT Program I rotated through three teams, each at a different stage of the marketing workflow. In Data Analytics & Automation I worked where the numbers are analysed, working through analytics requests and training the Analytics & Insights team on Amplitude. In Search Engine Marketing I learned how campaigns are executed online, a complete change from analytics. In Global Field Execution for the EMEA zone I saw how marketing is executed in the field. Together they gave me an end-to-end view of how marketing works, and a clear picture of where analytics and AI can help each team work better.",
    keyCapabilities: [
      "Product analytics with Amplitude",
      "Training and enabling analytics users",
      "Search engine marketing",
      "Field marketing execution (EMEA)",
      "Applying analytics and AI to non-technical teams",
      "Explaining technical concepts in plain language",
    ],
    photoUrl: "/images/saandeep-boda.jpg",
    email: "",
    linkedin: "",
  },

  rotations: [
    {
      id: R1,
      teamName: "Data Analytics & Automation (DAA)",
      businessFunction: "SaaS Data Practice",
      startDate: "",
      endDate: "",
      durationLabel: "[6 months]",
      manager: "Colin Galagher",
      mentor: "Henry Zale",
      summary:
        "The back end of marketing, where the numbers are analysed. [Add one or two sentences on what the team owns and what you focused on.]",
      responsibilities: [
        "Working through analytics requests as JIRA tickets",
        "Training the Analytics & Insights team on Amplitude",
        "[Another responsibility]",
      ],
      technologies: ["Amplitude", "JIRA", "[Other tools]"],
      learnings: [
        "Analytics solves a far more diverse set of problems than I expected. Working through JIRA tickets exposed me to many of them.",
      ],
      rank: 1,
      rankReason: "[Why this is your top pick — e.g. it is closest to the analytics and automation work you want to do next.]",
    },
    {
      id: R2,
      teamName: "Search Engine Marketing (SEM)",
      businessFunction: "[Business function, e.g. Digital Marketing]",
      startDate: "",
      endDate: "",
      durationLabel: "[6 months]",
      manager: "Anusha Rajashekhar",
      mentor: "Rachel Caron",
      summary:
        "Online marketing execution. Coming from analytics, this was a complete 180. [Add one or two sentences on what the team owns and what you focused on.]",
      responsibilities: [
        "[A responsibility you owned by the end of the rotation]",
        "[Primary responsibility 2]",
      ],
      technologies: ["[Tools used]"],
      learnings: [
        "Analytics and AI are powerful even in a non-technical team: they can automate work and make it more efficient.",
      ],
      rank: 2,
      rankReason: "[Why this is your second pick.]",
    },
    {
      id: R3,
      teamName: "Global Field Execution — EMEA Zone",
      businessFunction: "EMEA Zone Marketing",
      startDate: "",
      endDate: "",
      durationLabel: "[6 months]",
      manager: "Isabelle Pellery",
      mentor: "Isabelle Pellery (manager and mentor)",
      summary:
        "Field marketing execution for the EMEA zone, the furthest point from analytics and the last piece of the marketing workflow. [Add one or two sentences on what the team owns and what you focused on.]",
      responsibilities: ["[Primary responsibility 1]", "[Primary responsibility 2]"],
      technologies: ["[Tools used]"],
      learnings: ["Explaining technical jargon to non-technical colleagues."],
      rank: 3,
      rankReason:
        "Ranked third for practical reasons rather than the work itself: collaborating day to day with an EMEA team across a significant time-zone difference was harder. The rotation itself completed my view of the marketing workflow.",
    },
  ],

  projects: [
    placeholderProject("project-rotation-1", R1, 1),
    placeholderProject("project-rotation-2", R2, 2),
    placeholderProject("project-rotation-3", R3, 3),
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
    { theme: "[Consistent strength named in more than one review]", type: "strength", rotationIds: [R1, R2, R3], note: "" },
    { theme: "[Skill that improved across rotations]", type: "improved", rotationIds: [R2, R3], note: "" },
    { theme: "[Development area you are still working on]", type: "developing", rotationIds: [R3], note: "" },
  ],

  learning: [
    {
      id: "domain-core",
      title: "Core capabilities",
      description: "What I built across the three rotations.",
      isSample: true,
      capabilities: [
        { name: "Product analytics (Amplitude)", levels: { [R1]: "applied", [R2]: "practiced", [R3]: "practiced" }, evidence: "" },
        { name: "Search engine marketing", levels: { [R1]: "none", [R2]: "practiced", [R3]: "introduced" }, evidence: "" },
        { name: "Field marketing execution", levels: { [R1]: "none", [R2]: "introduced", [R3]: "practiced" }, evidence: "" },
        { name: "End-to-end marketing workflow", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Applying AI and automation to team workflows", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Training and enabling others", levels: { [R1]: "practiced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Explaining technical concepts to non-technical teams", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Working across regions and time zones", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "practiced" }, evidence: "" },
      ],
    },
  ],

  moments: [
    {
      type: "high",
      isSample: false,
      title: "Training the Analytics & Insights team on Amplitude",
      rotationId: R1,
      description:
        "I trained the Analytics & Insights team on using Amplitude. [Add who attended, what the sessions covered, and what changed afterwards.]",
      lesson: "",
    },
    {
      type: "low",
      isSample: false,
      title: "Not meeting the team in person",
      rotationId: R1,
      description: "I worked with the team remotely and, to date, haven't met any of them in person.",
      lesson: "[How you built working relationships remotely.]",
    },
    {
      type: "high",
      isSample: false,
      title: "A complete 180 from analytics",
      rotationId: R2,
      description:
        "Coming from an analytics background, SEM was a completely different world. I learned what the team does, and by the end of the rotation I was handling some responsibilities of my own with limited hand-holding.",
      lesson: "",
    },
    {
      type: "low",
      isSample: true,
      title: "[Rotation 2 low — something that didn't go to plan]",
      rotationId: R2,
      description: "[What happened, and what you did about it.]",
      lesson: "",
    },
    {
      type: "high",
      isSample: false,
      title: "Seeing the whole marketing workflow",
      rotationId: R3,
      description:
        "Field execution was the furthest from analytics, but it filled in an important piece. I started in the back end, where the numbers are analysed; moved to SEM, which runs online execution; and ended in field execution. I now understand the marketing workflow end to end, and where my analytics and AI skills can support each team better.",
      lesson: "",
    },
    {
      type: "low",
      isSample: false,
      title: "The Italian dream that was short-lived",
      rotationId: R3,
      description: "Working with the EMEA zone came with the hope of going to Italy. Visa constraints meant I couldn't go.",
      lesson: "",
    },
  ],

  beyond: [
    {
      kind: "activity",
      isSample: false,
      title: "Trainer — Siemens GPT",
      context: "Alongside the rotations",
      description: "[What you trained colleagues on, who attended, and how many sessions you ran.]",
      images: [],
    },
    {
      kind: "activity",
      isSample: false,
      title: "Mentor — Siemens Immersive Design Challenge",
      context: "Alongside the rotations",
      description: "[Who you mentored and what the challenge involved.]",
      images: [],
    },
    {
      kind: "memory",
      isSample: false,
      title: "Leadership tours of the Solution Center",
      context: "Realize LIVE 2026",
      description:
        "Two Solution Center tours for leadership at Realize LIVE 2026: one with [Mark — confirm full name], Scott and Stacey, and another with Timo Nentwich, which came with a really funny story. [Tell the story in two or three sentences.]",
      images: [
        { url: "/images/realize-live-2026-timo-nentwich.jpg", caption: "With Timo Nentwich at Realize LIVE 2026" },
        { url: "/images/realize-live-2026.jpg", caption: "At Realize LIVE 2026" },
      ],
    },
  ],

  aiInitiatives: [
    {
      id: "ai-initiative-1",
      title: "[AI or automation initiative — e.g. something you automated for the SEM team]",
      status: "prototype",
      isSample: true,
      rotationId: R2,
      existingWorkflow: "[How the work was done before]",
      friction: "[What was slow, manual or error-prone]",
      opportunity: "[What AI or automation changed]",
      architecture: ["[Data source]", "[Processing step]", "[AI step]", "[Output]"],
      technologies: ["[Tool]"],
      implemented: "[What you personally built]",
      results: "[Current status and results — only what you can evidence]",
      nextOpportunity: "[What could come next]",
      before: { title: "[Before]", steps: ["[Step 1]", "[Step 2]"], metrics: [] },
      after: { title: "[After]", steps: ["[Step 1]", "[Step 2]"], metrics: [] },
    },
  ],

  connectingDots: {
    pillars: [
      { label: "The numbers", description: "Where marketing performance is analysed — Data Analytics & Automation.", rotationIds: [R1] },
      { label: "Online execution", description: "How campaigns run online — Search Engine Marketing.", rotationIds: [R2] },
      { label: "Field execution", description: "How marketing is executed in the field — Global Field Execution, EMEA.", rotationIds: [R3] },
      { label: "Analytics & AI", description: "The thread across all three: using data and AI to help each team work better.", rotationIds: [R1, R2, R3] },
    ],
    insight:
      "Having worked at three stages of the same workflow, I keep asking a bigger question: how can analytics and AI help each of these teams, and the hand-offs between them, work better?",
    synthesis:
      "I started in the back end, where the numbers are analysed. SEM showed me how marketing is executed online, and Global Field Execution showed me how it is executed in the field. Seeing all three from the inside means I can follow the same work from execution to measurement, explain the technical side to non-technical teams, and spot where analytics and AI can remove friction.",
    crossBoundaryOpportunities: [
      "[Opportunity 1 — something that would help more than one of the three teams]",
      "[Opportunity 2]",
    ],
  },

  proposedRole: {
    roleTitle: "Senior Marketing Analyst / Forward Deployed Marketing Engineer",
    positioning: "Embedded with marketing teams, turning their data and workflows into analytics and AI solutions.",
    pillars: [
      {
        title: "Marketing Analytics",
        description: "Measure and explain marketing performance, from product analytics to campaign results.",
        evidence: "Data Analytics & Automation — Amplitude training for the Analytics & Insights team",
      },
      {
        title: "Forward-Deployed Problem Solving",
        description: "Sit with execution teams, understand their workflow from the inside, and build what they need.",
        evidence: "SEM and Global Field Execution rotations",
      },
      {
        title: "AI and Automation",
        description: "Identify repetitive work and apply AI and automation to remove it.",
        evidence: "Siemens GPT trainer; [AI or automation example from a rotation]",
      },
      {
        title: "Technical-to-Business Translation",
        description: "Explain data and AI in plain language so teams adopt it.",
        evidence: "Global Field Execution lesson; Siemens GPT training",
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
      "I don't just want to work within a single workflow. I want to help connect them: combining what I learned about marketing across three teams with analytics and hands-on AI skills, so every team can work in a more connected, data-driven way.",
    asks: ["[e.g. A sponsor in leadership and access to the systems in scope]"],
  },

  executiveSummary: {
    headline: "The Systems Connector",
    summary:
      "Across three rotations in the Start IT Program I worked at every stage of the marketing workflow: analytics in the SaaS Data Practice, online execution in Search Engine Marketing, and field execution for the EMEA zone. Alongside the rotations I trained colleagues on Siemens GPT and mentored in the Siemens Immersive Design Challenge. I am aiming for a Senior Marketing Analyst / Forward Deployed Marketing Engineer role that brings analytics and AI directly to marketing teams.",
    highlights: [
      "Trained the Analytics & Insights team on Amplitude (Data Analytics & Automation)",
      "Moved from analytics into SEM and took on responsibilities with limited hand-holding by the end of the rotation",
      "Trainer for Siemens GPT and mentor for the Siemens Immersive Design Challenge",
      "[Evidence-backed highlight — e.g. a project result]",
    ],
  },

  settings: {
    highlightPlaceholders: true,
    showSampleBadges: true,
    showMetricsWithoutValues: true,
  },
};
