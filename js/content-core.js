/* =========================================================================
   COURSE CONTENT — core definitions
   Tailoring: any value can be a variant created with CV({...}). Keys, in
   order of precedence: tl_ops, tl_sup, mgr_ops, mgr_sup, then ops / sup,
   then tl / mgr, then all. The engine resolves variants from the learner's
   profile at render time. Blocks can also carry only: "ops" | "sup" | "tl" |
   "mgr" | "tl_ops" ... (or an array) to appear for some profiles only.
   ========================================================================= */
window.CV = function (o) { return Object.assign({ __v: 1 }, o); };

window.COURSE = {
  title: "Collaboration and Teamwork",
  subtitle: "Every Piece Matters",
  audience: "ATLs, TLs, AMs, and Managers",
  fileSlug: "Collaboration-and-Teamwork",
  certLine: "including the foundation, four skill modules, a capstone, and the graded final check.",
  minutes: 80,

  welcome: {
    lead: "Every team is a puzzle, and every person is a piece. Learn how to build a team where people speak up, handle conflict well, help each other hit shared goals, and reach beyond their own walls, starting with you.",
    steps: [
      "<strong>Part 1: the foundation.</strong> Why every contribution matters, and what kind of team player you are. About 20 minutes.",
      "<strong>Part 2: your path.</strong> {path}: four skills (psychological safety, conflict, mutual support, and networks), then a capstone scenario, a review game, and your action plan. About 55 minutes.",
      "<strong>Wrap-up.</strong> A 10-question final check (80% to pass), your certificate, and a PDF of everything you wrote. About 5 minutes."
    ],
    note: "Activities include branching scenarios, drag-and-drop, connect-the-dots, a word search, a crossword, and a quiz game. Write your answers in your own words: copy and paste are turned off in this course."
  },

  roles: {
    tl: { name: "ATL or Team Leader", plural: "ATLs and Team Leaders", path: "Stronger Together",
      label: "I lead a team of individual contributors day to day.",
      promise: "Build a team where everyone knows their contribution matters, starting with you." },
    mgr: { name: "AM or Manager", plural: "AMs and Managers", path: "Leading Connected Teams",
      label: "I lead Team Leaders, or a whole process, account, or function.",
      promise: "Lead collaboration across teams, functions, and peers, and play the part only you can play." }
  },
  functions: {
    ops: { name: "Operations", short: "Operations",
      label: "Client-facing delivery: claims, AR, payment posting, coding, and other production teams." },
    sup: { name: "Support functions", short: "Support",
      label: "Teams that serve the business: QA, Training, HR, IT, WFM, MIS, Solutions, Finance, and more." }
  },

  /* One running scenario and cast per profile. Characters recur in activities. */
  profiles: {
    tl_ops: {
      change: "Month-end crunch",
      tagline: "Your claims team is behind, and everyone holds a piece of the fix",
      scenario: "You lead a team of ten in AR and claims follow-up. It's month-end week: volumes are up, a payer has quietly changed its rules, and QA is watching your error rate. You'll lead this team through the week in this course, and you'll need every person on it.",
      cast: [
        { name: "Priya", role: "Senior claims specialist", note: "Spots patterns in rejections before anyone else does." },
        { name: "Carlo", role: "Tenured agent, 7 years", note: "Fast and reliable. Feels he carries more than his share." },
        { name: "Bea", role: "Joined two months ago", note: "Capable, but rarely speaks up in huddles." },
        { name: "Marco", role: "Your ATL", note: "Great with people. The shift report is often late." },
        { name: "Joy", role: "QA analyst", note: "Wants errors fixed at the source, not after audit." },
        { name: "Asha", role: "Peer TL", note: "Her team is ahead of target this month." }
      ]
    },
    tl_sup: {
      change: "The new-hire wave",
      tagline: "80 new hires start Monday, and every support team holds a piece",
      scenario: "You lead a team of eight in Shared Services, handling system access and service-desk requests for Operations. A new client goes live Monday with 80 new hires. Access must be ready, HR's list keeps changing, Training needs accounts tested by Friday, and your team is already stretched. You'll lead them through it in this course.",
      cast: [
        { name: "Ana", role: "Access specialist", note: "Spots the pattern behind failed requests." },
        { name: "Ramon", role: "Senior coordinator, 9 years", note: "Fast and reliable. Feels he carries more than his share." },
        { name: "Lia", role: "Joined last month", note: "Capable, but rarely speaks up in stand-ups." },
        { name: "Paolo", role: "Your ATL", note: "Great with people. The daily status report is often late." },
        { name: "Rina", role: "HR onboarding lead", note: "Owns the new-hire list. Under pressure from Operations." },
        { name: "Kevin", role: "Peer TL, Training systems", note: "His team finished its go-live prep early." }
      ]
    },
    mgr_ops: {
      change: "The unapplied-cash escalation",
      tagline: "Two teams, one client, and a problem neither can fix alone",
      scenario: "You manage the payment posting operation for a major client account, through four Team Leaders. On Monday the client escalated: unapplied cash has doubled in a month. Posting and AR (a peer Manager's area) are blaming each other, and Quality says it saw this coming. You'll lead your part of the account through it in this course.",
      cast: [
        { name: "Nisha", role: "Peer Manager, AR", note: "Protective of her team. Believes Posting caused this." },
        { name: "Leo", role: "Your TL, Posting", note: "Steady and trusted, but his team is exhausted." },
        { name: "Dana", role: "Your newest TL", note: "Sharp. Hesitates to bring you bad news." },
        { name: "Mara", role: "Quality lead", note: "Flagged a payer remittance change last month." },
        { name: "Ken", role: "MIS analyst", note: "Has the data nobody has asked for yet." },
        { name: "The client", role: "Account stakeholder", note: "Sees one account, not your org chart." }
      ]
    },
    mgr_sup: {
      change: "The onboarding breakdown",
      tagline: "HR, IT, and Training each own a piece of a new hire's first day",
      scenario: "You manage the IT Service Desk and Access team in Shared Services, through three Team Leaders. On Monday an Operations Director escalated: 30 new hires sat idle for two days without system access. HR, IT, and Training each say the delay started somewhere else, and the next wave of 60 starts in two weeks. You'll lead your part of the fix in this course.",
      cast: [
        { name: "Carmela", role: "Peer Manager, HR Onboarding", note: "Feels HR is being blamed for IT's delays." },
        { name: "Chris", role: "Your TL, Access provisioning", note: "Capable and loyal, but his team is exhausted." },
        { name: "Dana", role: "Your newest TL", note: "Sharp. Hesitates to bring you bad news." },
        { name: "Paul", role: "Training Manager", note: "Flagged the start-date timing problem a month ago." },
        { name: "Ken", role: "WFM analyst", note: "Has start-date data nobody has asked for yet." },
        { name: "The Operations Director", role: "Your internal customer", note: "Sees one onboarding process, not three teams." }
      ]
    }
  },

  modules: [],
  finalCheck: { passMark: 80, questions: [] }
};

/* Shared pieces reused by both paths. */
window.CT_SHARED = {
  crossword: { type: "crossword", id: "recap-crossword", title: "Recap crossword: the four skills",
    prompt: "Select a clue or a square, then type. Answers fill across or down; select a square twice to switch direction. Solved words light up as you go.",
    size: [13, 13],
    words: [
      { a: "STRATEGIC", r: 0, c: 2, d: "A", clue: "The network that helps you see what's coming" },
      { a: "DIAL", r: 0, c: 0, d: "D", clue: "Four-step method for turning down the heat in a conflict" },
      { a: "AVOIDING", r: 0, c: 5, d: "D", clue: "Conflict mode for trivial issues, or when tempers are high" },
      { a: "ARISTOTLE", r: 2, c: 0, d: "A", clue: "Google's Project ___ found psychological safety mattered more than talent" },
      { a: "CONTRIBUTOR", r: 5, c: 0, d: "A", clue: "Task-focused team-player style: expertise, data, and reliable work" },
      { a: "COMPETING", r: 4, c: 9, d: "D", clue: "Conflict mode for non-negotiables like compliance and client data" },
      { a: "SAFETY", r: 8, c: 6, d: "A", clue: "Psychological ___: it's safe to speak up, make mistakes, and ask for help" },
      { a: "SPECIFIC", r: 10, c: 5, d: "A", clue: "The kind of offer that actually gets accepted" },
      { a: "CHALLENGER", r: 12, c: 2, d: "A", clue: "Team-player style that questions assumptions and raises the bar" }
    ],
    key: [
      "Psychological safety comes first: people collaborate when it's safe to speak, fail, and ask.",
      "Match the conflict mode to the moment, and use DIAL to attack the problem, not the person.",
      "Specific offers get accepted. Every team-player style is needed, including yours.",
      "Strategic and developmental networks are where most leaders have the biggest gap."
    ] },

  safetyConcepts: { type: "concepts", items: [
    { title: "Speak up", text: "Share ideas, concerns, and disagreement without fear of embarrassment." },
    { title: "Make mistakes", text: "Admit errors early, so they get fixed early, before they reach the client." },
    { title: "Ask for help", text: "Say “I don't know” or “I'm stuck” without feeling judged." } ] },

  dialConcepts: { type: "concepts", cols: 4, items: [
    { title: "Describe", text: "The facts, not labels. What happened, when, how often." },
    { title: "Impact", text: "On the work, the team, or the client. Not on your feelings." },
    { title: "Ask", text: "For their view, then listen. The step most people skip." },
    { title: "Look forward", text: "Agree a next step together, with a check-in date." } ] },

  helpingConcepts: { type: "concepts", items: [
    { title: "Ask early", text: "Before it becomes a crisis. Asking is a skill, not a weakness." },
    { title: "Offer specifically", text: "What, how much, and when. Specific offers get accepted; vague ones rarely do." },
    { title: "Follow through", text: "Do what you offered, then close the loop so people know it's done." } ] },

  modesIntro: "Healthy teams don't avoid conflict; they handle it well. The Thomas-Kilmann model describes five ways to respond, based on how much you push for your own concerns (assertiveness) and how much you work to meet theirs (cooperativeness). Each one is right in some situations and wrong in others."
};
