import type { Content } from "./schema";

/* ─────────────────────────────────────────────────────────────────────────────
   Default content — Saandeep Boda, Start IT Program, Siemens.

   RULES THIS FILE FOLLOWS
   • Only facts Saandeep has supplied are stated: his notes, the Rotation 1 and
     Rotation 2 final evaluations, and the Rotation 3 project email thread.
     Manager feedback is quoted verbatim.
   • Everything still missing is a [bracketed placeholder] that the editor
     counts and the site outlines. Items that are pure structure are flagged
     `isSample: true` so the viewer badges them.
   ──────────────────────────────────────────────────────────────────────────── */

const R1 = "rotation-1";
const R2 = "rotation-2";
const R3 = "rotation-3";

export const DEFAULT_CONTENT: Content = {
  meta: { version: 1, updatedAt: "" },

  profile: {
    name: "Saandeep Boda",
    designation: "Marketing Analyst",
    programName: "Start IT Program",
    organization: "Siemens",
    programStart: "2025-07",
    programEnd: "2026-12",
    totalDurationLabel: "18 months",
    headline: "Connecting the Dots.",
    supportingStatement:
      "An 18-month journey across data analytics, search engine marketing and field marketing.",
    themeTitle: "The Systems Connector",
    themeSubtitle:
      "18 Months. 3 Rotations. Multiple Perspectives. One Connected Vision.",
    narrative:
      "Over 18 months in the Start IT Program I rotated through three teams, each at a different stage of the marketing workflow. In Data Analytics & Automation I worked where the numbers are analysed: laying the groundwork for a marketing mix model, rebuilding the team's Amplitude dashboards and managing its request queue. In Search Engine Marketing I learned how campaigns are executed online, a complete change from analytics, and built the team's quarterly reporting framework. In Global Field Execution for the EMEA zone I saw how marketing is executed in the field, and built a tool that generates QBR slides straight from Power BI. Together they gave me an end-to-end view of how marketing works, and a clear picture of where analytics and AI can help each team work better.",
    keyCapabilities: [
      "Marketing analytics: MMM, ROAS and campaign reporting",
      "Amplitude dashboards and enablement",
      "Google Ads campaign execution",
      "Reporting automation with Python and APIs",
      "Applying AI (Siemens GPT) to marketing workflows",
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
      startDate: "2025-07",
      endDate: "2025-12",
      durationLabel: "6 months",
      manager: "Colin Galagher",
      mentor: "Henry Zale",
      summary:
        "The back end of marketing, where the numbers are analysed. My three objectives were laying the groundwork for a marketing mix model, refreshing the team's official Amplitude dashboards, and managing the DAA request queue.",
      responsibilities: [
        "Built the data foundation and modelling code for a B2B marketing mix model to compute ROAS and identify the current marketing mix",
        "Rebuilt DAA's official Amplitude stock dashboards with Bryan Koh and Kim Huynh, and trained another team to use them",
        "Managed the DAA request queue, and helped evaluate and migrate the team from JIRA to Aha!",
      ],
      technologies: ["Python (PyMC)", "SQL", "Amplitude", "JIRA", "Aha!", "FullStory", "Adobe Analytics", "Matomo"],
      learnings: [
        "Analytics solves a far more diverse set of problems than I expected. Working through JIRA tickets exposed me to many of them.",
        "Careful data preparation directly determines the quality and reliability of analytical outcomes.",
      ],
      rank: 1,
      rankReason: "[Why this is your top pick — e.g. it is closest to the analytics and automation work you want to do next.]",
    },
    {
      id: R2,
      teamName: "Search Engine Marketing (SEM)",
      businessFunction: "Paid and organic search (SEM ACQ)",
      startDate: "2026-01",
      endDate: "2026-06",
      durationLabel: "6 months",
      manager: "Anusha Rajashekhar",
      mentor: "Rachel Caron",
      summary:
        "Online marketing execution: paid search and SEO. Coming from analytics, this was a complete 180. My three objectives were a structured reporting framework for SEM, running Google Ads campaigns for solution domains, and exploring Siemens GPT bots for SEO and GEO research.",
      responsibilities: [
        "Implemented a quarterly reporting framework for the paid search programs, and consolidated 20+ Amplitude reports into two dashboards (paid search and organic)",
        "Created Responsive Display Ads for SD11 – Enterprise BOM Management and supported SD21 – Application Lifecycle Management campaigns",
        "Started a Google Ads API script to generate quarterly report visuals automatically",
        "Built a Siemens GPT bot for SEO/GEO research and explored a connected-bot approach in Hydra",
      ],
      technologies: ["Google Ads", "Google Ads API", "Amplitude", "Looker", "Dragon Metrics", "SEMrush", "Siemens GPT", "Hydra"],
      learnings: [
        "Analytics and AI are powerful even in a non-technical team: they can automate work and make it more efficient.",
        "Niche campaigns need a different definition of success: relevant engagement and qualified clicks, not just traffic volume.",
      ],
      rank: 2,
      rankReason: "[Why this is your second pick.]",
    },
    {
      id: R3,
      teamName: "Global Field Execution — EMEA Zone",
      businessFunction: "EMEA Zone Marketing",
      startDate: "2026-07",
      endDate: "2026-12",
      durationLabel: "6 months",
      manager: "Isabelle Pellery",
      mentor: "Isabelle Pellery (manager and mentor)",
      summary:
        "Field marketing execution for the EMEA zone, the furthest point from analytics and the last piece of the marketing workflow. My key project is a tool that builds the Engagement metrics slide of the FY27 Business Needs QBR deck straight from the GSCS Demand Dashboard.",
      responsibilities: [
        "Built a generator that fills the QBR Engagement metrics slide from the GSCS Demand Dashboard (Power BI) in about 20 seconds per deck",
        "Run the generator for the team from a shared Excel request list",
        "Mapped the options, and the IT and permission requirements, for rolling the tool out more widely",
      ],
      technologies: ["Python", "Power BI", "Excel", "PowerPoint"],
      learnings: ["Explaining technical jargon to non-technical colleagues."],
      rank: 3,
      rankReason:
        "Ranked third for practical reasons rather than the work itself: collaborating day to day with an EMEA team across a significant time-zone difference was harder. The rotation itself completed my view of the marketing workflow.",
    },
  ],

  projects: [
    {
      id: "project-qbr-slide-generator",
      rotationId: R3,
      title: "QBR Engagement Slide Generator",
      subtitle:
        "Fills the Engagement metrics slide of the FY27 Business Needs QBR template straight from the GSCS Demand Dashboard, in about 20 seconds per deck.",
      ownership: "owned",
      status: "prototype",
      featured: true,
      isSample: false,
      businessContext:
        "Markets build an FY27 Business Needs QBR deck. Its Engagement metrics slide draws on the GSCS Demand Dashboard (Build Your Own MPI) in Power BI.",
      problemStatement:
        "The Engagement metrics slide was filled in manually, market by market, from the dashboard.",
      whyItMattered:
        "QBR decks need numbers that match the dashboard exactly, for every market, without extra effort or extra Power BI access for the people preparing them.",
      myRole:
        "I built the tool on my own initiative and run the generator for the team today.",
      approach:
        "The tool applies the same filters as the dashboard (time, geography, account and opportunity profile, product, and ACV/TCV) and only reads from Power BI, so the numbers match. The team adds one row per market to a shared Excel file and sets Status to New; I run the generator and each row gets an Open deck link. Nothing to install and no extra Power BI permission on their side.",
      tools: ["Python", "Power BI", "Excel", "PowerPoint"],
      aiInvolvement: "",
      challenges:
        "Scaling beyond my own laptop is a governance question, not a technical one. Running it yourself needs Build permission on the dashboard's data model, which is limited even within the A&I team; self-installs need IT's approval; and a shared link through Microsoft dev tunnels was blocked by Zscaler.",
      solution:
        "A working generator, plus an overview of three rollout options: self-install (about 15 minutes per person, or a packaged version pending IT approval), an Azure App Service link (needs an Azure subscription, an app registration and a security review), or a Power BI page with the PowerPoint add-in (View access only, but the slide becomes a Power BI visual instead of editable text). Once Hydra allows Power BI integration, the tool can move into Hydra with some tweaks.",
      businessImpact:
        "A deck takes about 20 seconds (about a minute with a picture of the dashboard), with numbers that match the dashboard. The response from leadership: “I'm really excited about the innovation and initiative you've shown here… please keep bringing forward ideas like this. This is exactly the kind of innovative thinking and experimentation we want to encourage.” I was connected with a colleague to assess how it could be operationalised within data-security and Power BI permission requirements.",
      keyLearning:
        "Scaling something beyond a prototype means pairing the innovation with the right governance and a sustainable operating model.",
      metrics: [{ label: "Time per deck", value: "≈20 seconds", note: "≈1 minute including a picture of the dashboard" }],
      images: [],
    },
    {
      id: "project-mmm-foundation",
      rotationId: R1,
      title: "Marketing Mix Model Foundation",
      subtitle: "Laying the data and modelling groundwork for a B2B marketing mix model that computes ROAS by channel.",
      ownership: "owned",
      status: "delivered",
      featured: true,
      isSample: false,
      businessContext:
        "Marketers need to know which channels drive revenue and where to spend budget. DAA set out to build a marketing mix model (MMM) for the B2B business, a new use case for MMM.",
      problemStatement:
        "The data for the model sat in multiple sources with different structures and time coverage, and access to the right sources was limited.",
      whyItMattered:
        "In the rotation manager's words, the work “will help marketers make better decisions about where to spend their budget, and which marketing channels are driving revenue for the business.”",
      myRole:
        "I took on the project across a design phase (data gathering and consolidation) and a build phase, with technical advice from Sam Farren, business guidance from Henry Zale and spend-data knowledge from Bryan Koh.",
      approach:
        "Consolidated multiple sources into a single modelling dataset: aligning structures and time coverage, working out how Google Ads campaign types should be grouped for modelling, and validating joins so no data was lost. Then built and iterated on the modelling code with PyMC and implemented ROAS.",
      tools: ["Python", "PyMC", "SQL", "Google Ads data"],
      aiInvolvement: "",
      challenges:
        "Data availability forced a shorter time window than planned. Joining sources with different structures and time coverage took iterative exploration and validation.",
      solution: "A consolidated, model-ready dataset and modelling code that the team can build on.",
      businessImpact:
        "Rated Exceeds Expectations. The rotation manager wrote: “He has laid the groundwork for a marketing mix model that our team will continue to build upon throughout FY26 and beyond.”",
      keyLearning: "Careful data preparation directly determines the quality and reliability of analytical outcomes.",
      metrics: [],
      images: [],
    },
    {
      id: "project-amplitude-dashboards",
      rotationId: R1,
      title: "Amplitude Dashboard Refresh",
      subtitle: "Rebuilding DAA's official Amplitude stock dashboards so users of every background can self-serve.",
      ownership: "collaborated",
      status: "delivered",
      featured: false,
      isSample: false,
      businessContext: "DAA's customers needed stock reports in Amplitude they could land on and use without help.",
      problemStatement:
        "The dashboards had to be simple and intuitive for users with different technical backgrounds while still conveying the necessary information.",
      whyItMattered:
        "“It's easy to make a dashboard that has everything on it, but that can lead to confusion for someone who is unfamiliar with the data.” (rotation manager)",
      myRole:
        "I split the work with Bryan Koh and Kim Huynh from ideation to build, and ran a training session for another team on using Amplitude and the dashboards.",
      approach:
        "Careful metric selection, a thoughtful layout and multiple iterations based on feedback, while aligning stakeholder expectations with the limits of existing event tracking.",
      tools: ["Amplitude"],
      aiInvolvement: "",
      challenges: "Balancing simplicity with completeness, within the limits of existing event tracking.",
      solution: "A consistent set of dashboards published as DAA's official dashboards, plus a training session to support adoption.",
      businessImpact:
        "Rated Exceeds Expectations. “We now have a beautiful set of new dashboards… easy to navigate, simple to understand, yet provide crucial information for our stakeholders.” (rotation manager)",
      keyLearning: "Identify and highlight the KPIs, and filter out the noise.",
      metrics: [],
      images: [],
    },
    {
      id: "project-sem-reporting-framework",
      rotationId: R2,
      title: "Paid Search Reporting Framework",
      subtitle: "A structured quarterly reporting framework for SEM, with 20+ Amplitude reports consolidated into two dashboards.",
      ownership: "owned",
      status: "delivered",
      featured: true,
      isSample: false,
      businessContext:
        "The SEM team reviews its paid search programs every quarter. Reporting was built by hand and spread across many Amplitude reports.",
      problemStatement:
        "Not every campaign is measured the same way, so a standard report had to stay meaningful for each campaign objective. Demandbase events were not available in Amplitude.",
      whyItMattered:
        "Less time building reports means more time analysing performance and telling the story behind the numbers.",
      myRole:
        "I produced the Q1 reports by hand, then implemented the framework and the dashboards, working with Jesse, Jo and Anusha, and with Rachel on Google Ads.",
      approach:
        "Learned the full quarterly reporting workflow, matched metrics to each program type with Anusha's feedback, consolidated the Amplitude reports, and started a Google Ads API script to generate the visuals automatically.",
      tools: ["Google Ads", "Google Ads API", "Amplitude", "Looker", "PowerPoint"],
      aiInvolvement: "",
      challenges:
        "Balancing standardisation with flexibility across campaign goals, keeping up with changes in how programs are structured, and working without Demandbase data in Amplitude.",
      solution:
        "A quarterly reporting framework for paid search, plus two focused Amplitude dashboards: one for paid search and one for organic.",
      businessImpact:
        "Rated Exceeds Expectations. Cut the time needed to generate visuals and summaries for quarterly Google Ads reports. The rotation manager called the dashboard work “of great help”.",
      keyLearning: "Reporting frameworks need to be accurate, and also easy for the team to use and maintain.",
      metrics: [{ label: "Amplitude reports consolidated", value: "20+ → 2", note: "One paid search and one organic dashboard" }],
      images: [],
    },
    {
      id: "project-google-ads-campaigns",
      rotationId: R2,
      title: "Google Ads Campaigns for Solution Domains",
      subtitle: "First hands-on paid media work: Responsive Display Ads for SD11 and campaign support for SD21.",
      ownership: "contributed",
      status: "delivered",
      featured: false,
      isSample: false,
      businessContext: "SEM runs Google Ads campaigns for each Solution Domain.",
      problemStatement:
        "Highly specialised solution domains have limited search demand, keyword volume and user intent compared with broader topics.",
      whyItMattered: "Niche B2B campaigns still need to reach the right people and send them to content that supports their journey.",
      myRole:
        "Created Responsive Display Ads for SD11 – Enterprise BOM Management, supported SD21 – Application Lifecycle Management with Jo, and reviewed performance in Google Ads and Amplitude.",
      approach:
        "Keyword research and campaign structure with Rachel, optimisation with Neha, competitive analysis in Dragon Metrics with Ilya, and measuring each campaign against its own objective (clicks, conversions or engagement) with Anusha.",
      tools: ["Google Ads (RDA, RSA, Performance Max)", "Amplitude", "Looker", "Dragon Metrics"],
      aiInvolvement: "",
      challenges: "Limited search demand in niche domains, and making sure landing pages supported the campaign goals.",
      solution: "Display ads that achieved strong ad strength and drove impressions and clicks.",
      businessImpact:
        "Rated Exceeds Expectations. Saw measurable week-over-week improvement in campaign performance. [Add figures if you have them.]",
      keyLearning: "Niche campaigns need a different definition of success: relevant engagement and qualified clicks, not just volume.",
      metrics: [],
      images: [],
    },
  ],

  performance: [
    {
      rotationId: R1,
      rating: "Exceeds Expectations",
      ratingScale: "",
      numericValue: null,
      scaleMax: null,
      category: "Exceeds on all 3 objectives, midterm and final",
      managerFeedback:
        "“It's been a joy to work with Saandeep over the past 6 months… He is technically skilled, a thoughtful problem solver, and fun to be around. The whole team has had nothing but positive things to say about him, and he is always welcome back at the SDP team in the future. He completed all 3 rotational objectives beyond expectations, and also helped out with other projects. I think he'll have a long and successful career here at Siemens.”",
      feedbackSource: "Final evaluation, December 2025",
      strengths: [
        "Independence, resourcefulness and consistency (MMM project)",
        "Identifies and highlights the KPIs while filtering out the noise (Amplitude dashboards)",
        "Reliable, follows through and gives updates without needing a reminder",
      ],
      developmentAreas: [],
      supportingExamples: [
        "Groundwork for a marketing mix model the team will build on through FY26 and beyond",
        "A new set of official Amplitude dashboards, plus training for another team",
        "Managed the request queue and helped the team move from JIRA to Aha!",
      ],
    },
    {
      rotationId: R2,
      rating: "Exceeds Expectations",
      ratingScale: "",
      numericValue: null,
      scaleMax: null,
      category: "Exceeds on all 3 objectives (final)",
      managerFeedback:
        "“Over the course of the program, Saandeep has demonstrated a strong willingness to learn, adaptability, and a positive attitude toward new challenges. He has consistently incorporated feedback into his work, become more independent over time, and contributed meaningfully to the team's objectives.”",
      feedbackSource: "Final evaluation, June 2026",
      strengths: [
        "Strong willingness to learn, adapt and take on new challenges",
        "Consistently applies feedback to improve the quality of the work",
        "Curiosity, technical aptitude and willingness to explore innovative solutions (Siemens GPT for SEO/GEO)",
      ],
      developmentAreas: [
        "Keep strengthening technical expertise",
        "Build confidence in sharing ideas, asking questions and owning increasingly complex work",
        "Make data-driven optimisation recommendations with more confidence",
      ],
      supportingExamples: [
        "Implemented a quarterly reporting framework for the paid search programs",
        "Consolidated 20+ Amplitude reports into two dashboards",
        "Responsive Display Ads for SD11 and campaign support for SD21",
      ],
    },
    {
      rotationId: R3,
      rating: "In progress",
      ratingScale: "",
      numericValue: null,
      scaleMax: null,
      category: "",
      managerFeedback: "",
      feedbackSource: "Rotation runs until December 2026",
      strengths: [],
      developmentAreas: [],
      supportingExamples: [],
    },
  ],

  feedbackThemes: [
    { theme: "Curiosity and a strong willingness to learn", type: "strength", rotationIds: [R1, R2], note: "" },
    { theme: "Technical skill and aptitude", type: "strength", rotationIds: [R1, R2], note: "" },
    { theme: "Independence and resourcefulness on large tasks", type: "strength", rotationIds: [R1], note: "" },
    { theme: "Making complex data simple for stakeholders", type: "strength", rotationIds: [R1], note: "" },
    { theme: "Independence in a new domain", type: "improved", rotationIds: [R2], note: "" },
    { theme: "Confidence in sharing ideas and owning complex work", type: "developing", rotationIds: [R2], note: "" },
  ],

  learning: [
    {
      id: "domain-core",
      title: "Core capabilities",
      description: "What I built across the three rotations.",
      isSample: true,
      capabilities: [
        { name: "Product analytics (Amplitude)", levels: { [R1]: "applied", [R2]: "applied", [R3]: "practiced" }, evidence: "" },
        { name: "Marketing mix modelling and ROAS", levels: { [R1]: "practiced", [R2]: "none", [R3]: "none" }, evidence: "" },
        { name: "Search engine marketing (Google Ads)", levels: { [R1]: "none", [R2]: "practiced", [R3]: "introduced" }, evidence: "" },
        { name: "Field marketing execution", levels: { [R1]: "none", [R2]: "introduced", [R3]: "practiced" }, evidence: "" },
        { name: "Reporting automation (Python, APIs, Power BI)", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Applying AI to marketing workflows", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "practiced" }, evidence: "" },
        { name: "Training and enabling others", levels: { [R1]: "practiced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
        { name: "Explaining technical concepts to non-technical teams", levels: { [R1]: "introduced", [R2]: "practiced", [R3]: "applied" }, evidence: "" },
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
        "After rebuilding the Amplitude dashboards, I ran a training session for the Analytics & Insights team. Seeing them gain confidence in using Amplitude and the dashboards made the work feel complete.",
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
      isSample: false,
      title: "Niche solution domains with little search demand",
      rotationId: R2,
      description:
        "SD11 and SD21 are highly specialised, so search demand and keyword volume were limited. It took careful thought about campaign structure, targeting and what performance to expect.",
      lesson: "Success in niche campaigns shows up as relevant engagement and qualified clicks, not just traffic volume.",
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
      id: "ai-seo-geo-bots",
      title: "Siemens GPT Bots for SEO and GEO Research",
      status: "prototype",
      isSample: false,
      rotationId: R2,
      existingWorkflow:
        "SEO and GEO research for each solution domain, supported by existing AEO/GEO bots and tools such as SEMrush and Dragon Metrics.",
      friction:
        "The existing bots had gaps, and it was not clear which use cases would be both valuable and feasible for marketers.",
      opportunity:
        "Use Siemens GPT bots, and then Hydra connected to Solution Map Manager, to support solution-specific research, with multiple bots working together.",
      architecture: ["Solution Map Manager", "Hydra", "Connected Siemens GPT bots", "SEO / GEO research for marketers"],
      technologies: ["Siemens GPT", "Hydra", "Solution Map Manager", "SEMrush", "Dragon Metrics"],
      implemented:
        "Built a Siemens GPT bot for one solution domain, identified gaps in the existing bot setup, then explored moving the approach into Hydra and connecting multiple bots.",
      results:
        "Exploratory work that evolved from a single-domain bot to a more scalable Hydra-based approach. Rated Exceeds Expectations; the rotation manager noted it “demonstrates curiosity, technical aptitude, and a willingness to explore innovative solutions.”",
      nextOpportunity: "Connected bots in Hydra that support research across solution domains.",
      before: {
        title: "Single solution-domain bot",
        steps: ["Bot built for one solution domain", "Tested and evaluated for that domain only"],
        metrics: [],
      },
      after: {
        title: "Hydra with Solution Map Manager",
        steps: ["Hydra draws solution context from Solution Map Manager", "Multiple bots connect to support research", "Designed to scale across solution domains"],
        metrics: [],
      },
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
      "I started in the back end, where the numbers are analysed. SEM showed me how marketing is executed online, and Global Field Execution showed me how it is executed in the field. In every team I ended up building the same kind of thing: tools that take data the team already has and make it easier to use, from Amplitude dashboards to an automated paid search report to a QBR slide generator. Seeing all three stages from the inside means I can follow the work from execution to measurement and spot where analytics and AI can remove friction.",
    crossBoundaryOpportunities: [
      "Move the QBR slide generator into Hydra once Power BI integration is allowed",
      "Bring Demandbase events into Amplitude so search reporting covers them",
    ],
  },

  proposedRole: {
    roleTitle: "Senior Marketing Analyst / Forward Deployed Marketing Engineer",
    positioning: "Embedded with marketing teams, turning their data and workflows into analytics and AI solutions.",
    pillars: [
      {
        title: "Marketing Analytics",
        description: "Measure and explain marketing performance, from marketing mix modelling to campaign reporting.",
        evidence: "MMM foundation and Amplitude dashboards (DAA); paid search reporting framework (SEM)",
      },
      {
        title: "Forward-Deployed Problem Solving",
        description: "Sit with execution teams, understand their workflow from the inside, and build what they need.",
        evidence: "QBR slide generator (Global Field Execution); reporting framework built inside SEM",
      },
      {
        title: "AI and Automation",
        description: "Identify repetitive work and apply AI and automation to remove it.",
        evidence: "Siemens GPT SEO/GEO bots; Google Ads API reporting script; Siemens GPT trainer",
      },
      {
        title: "Technical-to-Business Translation",
        description: "Explain data and AI in plain language so teams adopt it.",
        evidence: "Amplitude training for another team; Global Field Execution lesson",
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
      "Across three rotations in the Start IT Program I worked at every stage of the marketing workflow: analytics in the SaaS Data Practice, online execution in Search Engine Marketing, and field execution for the EMEA zone. Both completed rotations closed with Exceeds Expectations on every objective. In each team I built tools that make existing data easier to use. I am aiming for a Senior Marketing Analyst / Forward Deployed Marketing Engineer role that brings analytics and AI directly to marketing teams.",
    highlights: [
      "Exceeds Expectations in both completed rotations, on all six objectives",
      "Laid the groundwork for a B2B marketing mix model DAA will build on through FY26 and beyond",
      "Built SEM's quarterly paid search reporting framework and consolidated 20+ Amplitude reports into two dashboards",
      "Built a tool that generates QBR engagement slides from the GSCS Demand Dashboard in about 20 seconds",
      "Rebuilt DAA's official Amplitude dashboards and trained another team to use them",
      "Trainer for Siemens GPT and mentor for the Siemens Immersive Design Challenge",
    ],
  },

  settings: {
    highlightPlaceholders: true,
    showSampleBadges: true,
    showMetricsWithoutValues: true,
  },
};
