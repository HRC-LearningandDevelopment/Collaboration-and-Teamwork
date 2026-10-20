/* PART 2 — LEADING CONNECTED TEAMS (AMs and Managers), tailored by function */
(function () {
  const V = window.CV, SH = window.CT_SHARED;

  window.COURSE.modules.push(
  /* ===================================================================== */
  {
    id: "mg1", part: "path", track: "mgr", minutes: 12,
    title: "Promote a collaborative environment",
    summary: "Make it safe for TLs and peers to bring bad news early, and replace silos with shared goals and shared routines.",
    screens: [
      {
        title: "Safe to bring bad news",
        blocks: [
          { type: "p", html: "People collaborate when they feel safe. Google's Project Aristotle studied 180 teams and found that psychological safety mattered more than who was on the team. As a Manager, your reactions set the climate for every team below you. If TLs learn that bad news gets punished, they stop bringing it, and you find out from the client." },
          { type: "p", html: "Across your teams, that means people feel safe to:" },
          SH.safetyConcepts,
          { type: "p", html: "At your level, three moves matter most. Open each one to see what it sounds like." },
          { type: "accordion", id: "mg1-moves", items: [
            { title: "Frame the work", html: V({
              ops: "<p>Name the shared goal above any single team's scorecard. People cooperate when they can see what they're cooperating for.</p><span class='eg'>“This account only wins if Posting, AR, Quality, and MIS win together.”</span>",
              sup: "<p>Name the shared goal above any single team's scorecard. People cooperate when they can see what they're cooperating for.</p><span class='eg'>“A new hire's first day only works if HR, IT, and Training all deliver.”</span>" }) },
            { title: "Invite input", html: "<p>Ask before you tell. Your title makes people wait for your view, then echo it. Ask for theirs first, especially from the newest or quietest leader.</p><span class='eg'>“What are we not seeing from your team's side?”</span>" },
            { title: "Respond productively", html: "<p>Thank people for bad news in public, and solve it with them. That's how you hear about the next problem early.</p><span class='eg'>“Thanks for raising it in the review. That's exactly what I need.”</span>" }
          ] }
        ]
      },
      {
        title: "Silo busting",
        blocks: [
          { type: "p", html: "Teams that blame each other rarely lack goodwill. They lack a shared goal and a shared routine. For each situation, pick the fix most likely to last." },
          V({
            ops: { type: "sim", id: "mg1-sim", title: "Three silos on the account",
              setup: "Your account has five processes and a Quality team. Each looks fine on its own scorecard, but the client keeps finding the gaps between them.",
              steps: [
                { label: "Ops and Quality", context: "Your TLs and Quality keep arguing about audit errors. Agents say “QA is out to get us.”", options: [
                  { text: "Escalate each dispute to the Tower Lead", correct: false, feedback: "Escalation settles one dispute and makes the next one more likely." },
                  { text: "Agree a shared quality goal and a 15-minute weekly joint calibration", correct: true, feedback: "A shared goal plus a regular routine turns opponents into partners." },
                  { text: "Ask Quality to audit fewer claims", correct: false, feedback: "This hides the problem, and risks errors reaching the client." } ] },
                { label: "Posting and AR", context: "Posting and AR blame each other for unapplied cash.", options: [
                  { text: "Whichever team caused it fixes it", correct: false, feedback: "Finding the culprit takes longer than fixing the problem, and the blame returns next month." },
                  { text: "Each team keeps tracking its own KPI", correct: false, feedback: "Separate scorecards keep the blame alive." },
                  { text: "Set a shared unapplied-cash goal and review it together every week", correct: true, feedback: "When both teams own the same number, they solve it together." } ] },
                { label: "Late news", context: "Dana tells you about a posting backlog late, after the client has noticed.", options: [
                  { text: "“Thanks for telling me. Let's fix it, then look at how we spot these earlier.”", correct: true, feedback: "Thanking people for bad news is how you get it early. Then fix the early-warning system together." },
                  { text: "“Why am I only hearing about this now?”", correct: false, feedback: "Next time, you'll hear about it even later." },
                  { text: "Raise it in her performance review", correct: false, feedback: "You'll teach every TL to hide problems." } ] }
              ],
              key: [
                "Silos come from separate goals and separate routines, not from bad people.",
                "A shared number reviewed together weekly does more than any escalation.",
                "How you react to late news decides whether the next news comes early."
              ] },
            sup: { type: "sim", id: "mg1-sim", title: "Three silos in onboarding",
              setup: "HR, IT, Training, and WFM each own a piece of a new hire's first day. Each looks fine on its own scorecard, but Operations keeps finding the gaps between them.",
              steps: [
                { label: "HR and IT", context: "HR and your team keep arguing about late access. HR says IT is slow; IT says HR's lists are incomplete.", options: [
                  { text: "Ask HR to send every list two weeks earlier, no exceptions", correct: false, feedback: "A one-sided rule. HR can't control every Operations start date, so it will break, and the blame returns." },
                  { text: "Escalate each dispute to the Director", correct: false, feedback: "Escalation settles one dispute and makes the next one more likely." },
                  { text: "Agree a shared goal (every new hire productive on day one) and a 15-minute weekly joint review of the next wave", correct: true, feedback: "A shared goal plus a regular routine turns opponents into partners." } ] },
                { label: "IT and Training", context: "Training and your team blame each other for failed test logins.", options: [
                  { text: "Set a shared “first-day login success” measure and review it together every week", correct: true, feedback: "When both teams own the same number, they solve it together." },
                  { text: "Each team keeps tracking its own SLA", correct: false, feedback: "Separate scorecards keep the blame alive." },
                  { text: "Whichever team caused it fixes it", correct: false, feedback: "Finding the culprit takes longer than fixing the problem." } ] },
                { label: "Late news", context: "Dana tells you that 12 accounts weren't ready, after the Operations Director complained.", options: [
                  { text: "“Why am I only hearing about this now?”", correct: false, feedback: "Next time, you'll hear about it even later." },
                  { text: "“Thanks for telling me. Let's fix it, then look at how we spot these earlier.”", correct: true, feedback: "Thanking people for bad news is how you get it early. Then fix the early-warning system together." },
                  { text: "Raise it in her performance review", correct: false, feedback: "You'll teach every TL to hide problems." } ] }
              ],
              key: [
                "Silos come from separate goals and separate routines, not from bad people.",
                "A shared number reviewed together weekly does more than any escalation.",
                "How you react to late news decides whether the next news comes early."
              ] } }),
          { type: "form", id: "mg1-design", title: "Design your own fix",
            fields: [
              { id: "friction", label: "A cross-team friction point in my area" },
              { id: "goal", label: "A shared goal both teams care about" },
              { id: "routine", label: "One routine that would help", prompt: "For example: a 15-minute weekly joint review." },
              { id: "stop", label: "One thing I'll stop doing" }
            ], saveLabel: "Save my fix" }
        ]
      },
      {
        title: "Spot the silo builders",
        blocks: [
          { type: "p", html: "Silos are often built by the leader, one sentence at a time. Here's an update a Manager sent to their TLs after a tough day." },
          { type: "hotspot", id: "mg1-hunt", title: "Find the four lines that build silos",
            prompt: "Select each sentence that pits teams against each other or makes it unsafe to raise problems. Sentences that are fine will tell you so.",
            find: 4,
            doc: V({
              ops: { kind: "message", heading: "Email to my Team Leaders", segments: [
                { t: "Team, quick update after today's client call.", fb: "A clear opener." },
                { t: "The client is unhappy about unapplied cash, and frankly it's AR's mess, not ours.", target: true, fb: "Blaming a peer team in writing tells your TLs it's fine to treat AR as the enemy. The client sees one account." },
                { t: "Ken from MIS will share a breakdown by payer tomorrow.", fb: "Bringing in data from another function. Good." },
                { t: "Please don't share our numbers with AR until I've reviewed them.", target: true, fb: "Hoarding data keeps the root cause hidden, and signals that peers are competitors." },
                { t: "I want to hear about any posting delays as soon as you see them.", fb: "A clear invitation to raise problems early." },
                { t: "Anyone whose team misses target this week will be explaining it to me personally.", target: true, fb: "A threat. TLs will hide problems or game the numbers instead of flagging them." },
                { t: "Leo's team cleared 3,000 items yesterday, so well done, Leo.", fb: "Specific, public recognition." },
                { t: "If Quality raises anything, push back; they don't understand our volumes.", target: true, fb: "This turns a partner into an opponent, and Mara's warning about the remittance change gets ignored again." } ] },
              sup: { kind: "message", heading: "Email to my Team Leaders", segments: [
                { t: "Team, quick update after today's escalation.", fb: "A clear opener." },
                { t: "The Operations Director is unhappy about idle new hires, and frankly it's HR's mess, not ours.", target: true, fb: "Blaming a peer team in writing tells your TLs it's fine to treat HR as the enemy. Operations sees one onboarding process." },
                { t: "Ken from WFM will share start-date data tomorrow.", fb: "Bringing in data from another function. Good." },
                { t: "Please don't share our ticket data with HR or Training until I've reviewed it.", target: true, fb: "Hoarding data keeps the root cause hidden, and signals that peers are competitors." },
                { t: "I want to hear about any provisioning delays as soon as you see them.", fb: "A clear invitation to raise problems early." },
                { t: "Anyone whose team misses SLA this week will be explaining it to me personally.", target: true, fb: "A threat. TLs will hide problems or game the numbers instead of flagging them." },
                { t: "Chris's team cleared 140 requests yesterday, so well done, Chris.", fb: "Specific, public recognition." },
                { t: "If Training raises anything, push back; they don't understand our workload.", target: true, fb: "This turns a partner into an opponent, and Paul's warning about start dates gets ignored again." } ] } }),
            key: [
              "Your language about peer teams becomes your TLs' language about them.",
              "Sharing data early is the fastest route to the root cause.",
              "Threats don't improve results; they delay the bad news."
            ] },
          { type: "form", id: "mg1-habit", title: "Your collaboration habit",
            fields: [ { id: "habit", label: "One thing I'll say or do in my next review to make it safer for TLs to bring bad news", prompt: "For example: open each review with “What's not going well that I should know about?”" } ],
            saveLabel: "Save my habit" }
        ]
      }
    ]
  },

  /* ===================================================================== */
  {
    id: "mg2", part: "path", track: "mgr", minutes: 14,
    title: "Manage conflict constructively",
    summary: "Choose the right response between teams, peers, and functions, and use DIAL to address friction before it reaches the client or customer.",
    screens: [
      {
        title: "Five ways to respond",
        blocks: [
          { type: "p", html: SH.modesIntro + " At your level, the conflicts are often between teams, peers, and functions rather than individuals." },
          { type: "flip", id: "mg2-modes", title: "The five conflict modes",
            cards: [
              { front: "Competing", sub: "Stand firm", back: V({ ops: "<strong>Use it for</strong> non-negotiables: compliance, client data, and contract terms.<br><br><strong>Example:</strong> a TL bypasses a compliance control to hit targets.<br><br><strong>Overused:</strong> peers stop sharing problems with you.", sup: "<strong>Use it for</strong> non-negotiables: access controls, privacy, audit, and payroll rules.<br><br><strong>Example:</strong> a TL skips access approvals to hit SLA.<br><br><strong>Overused:</strong> peers stop sharing problems with you." }) },
              { front: "Collaborating", sub: "Solve it together", back: V({ ops: "<strong>Use it when</strong> both sides' needs matter and the answer has to stick.<br><br><strong>Example:</strong> the client wants an SLA change you can't deliver without more people.<br><br><strong>Overused:</strong> slow decisions on small things.", sup: "<strong>Use it when</strong> both sides' needs matter and the answer has to stick.<br><br><strong>Example:</strong> Operations wants faster access than your controls allow.<br><br><strong>Overused:</strong> slow decisions on small things." }) },
              { front: "Compromising", sub: "Meet in the middle", back: "<strong>Use it for</strong> quick, fair fixes when time is short and the stakes are moderate.<br><br><strong>Example:</strong> two TLs want the same SME for the same week.<br><br><strong>Overused:</strong> every agreement leaves both sides half-satisfied." },
              { front: "Avoiding", sub: "Step back for now", back: "<strong>Use it for</strong> trivial issues, or when tempers are high and a pause will help.<br><br><strong>Example:</strong> two TLs in a heated email war. Take it offline first.<br><br><strong>Overused:</strong> real problems quietly grow." },
              { front: "Accommodating", sub: "Let them have it", back: "<strong>Use it when</strong> the bigger picture matters more, or to build goodwill.<br><br><strong>Example:</strong> a peer needs a slot that's inconvenient for you but works for three other teams.<br><br><strong>Overused:</strong> your teams pay for your goodwill." }
            ] }
        ]
      },
      {
        title: "Which mode fits?",
        blocks: [
          { type: "p", html: "Sort each situation into the mode that fits it best. Some situations have more than one good answer; any good fit counts." },
          { type: "bucket", id: "mg2-sort", title: "Match the mode to the moment",
            buckets: [ { id: "comp", label: "Competing" }, { id: "coll", label: "Collaborating" }, { id: "prom", label: "Compromising" }, { id: "avoi", label: "Avoiding" }, { id: "acco", label: "Accommodating" } ],
            items: V({
              ops: [
                { id: "a", text: "A TL is bypassing a compliance control to hit targets.", bucket: "comp" },
                { id: "b", text: "The client wants a mid-quarter SLA change you can't deliver without more people.", bucket: "coll" },
                { id: "c", text: "Nisha wants to borrow your best TL for her new process launch.", bucket: ["coll", "prom"] },
                { id: "d", text: "Quality wants a calibration slot that's inconvenient for you but works for three other teams.", bucket: "acco" },
                { id: "e", text: "Two of your TLs are in a heated email war about who caused an error.", bucket: "avoi" },
                { id: "f", text: "Two TLs want the same SME on the same day, and both have a fair case.", bucket: "prom" } ],
              sup: [
                { id: "a", text: "A TL is skipping access approvals to hit SLA.", bucket: "comp" },
                { id: "b", text: "Operations wants same-day access for every new hire, but your controls need 48 hours.", bucket: "coll" },
                { id: "c", text: "Carmela wants to borrow your best TL for HR's system migration.", bucket: ["coll", "prom"] },
                { id: "d", text: "Training wants a test window that's inconvenient for you but works for three other teams.", bucket: "acco" },
                { id: "e", text: "Two of your TLs are in a heated email war about who caused an outage.", bucket: "avoi" },
                { id: "f", text: "Two TLs want the same specialist on the same day, and both have a fair case.", bucket: "prom" } ] }),
            key: [
              "Competing is right for non-negotiables. Stand firm, and explain the why.",
              "Collaborating is worth the time when the answer must work for both sides for months.",
              "Avoiding a heated exchange is a pause: take it offline, then bring people together."
            ] }
        ]
      },
      {
        title: "DIAL: turning down the heat",
        blocks: [
          { type: "p", html: "When a conflict with a peer is worth addressing, use four steps in order. Attack the problem, not the person, and never the team." },
          SH.dialConcepts,
          { type: "sequence", id: "mg2-dial", title: "Rearrange the conversation",
            prompt: V({ ops: "Nisha's team keeps sending incomplete handoff files, and your TLs are spending hours on rework. Drag these four lines into DIAL order.", sup: "Carmela's team keeps sending new-hire lists with missing employee IDs, and your TLs are spending hours chasing them. Drag these four lines into DIAL order." }),
            items: V({
              ops: [
                { id: "d", text: "“Nisha, three of last week's handoff files were missing the payer ID column.”" },
                { id: "i", text: "“My TLs spent about six hours on rework, and two client deadlines got tight.”" },
                { id: "a", text: "“What's happening on your side when these go out?”" },
                { id: "l", text: "“Could we agree a quick handoff checklist and review it together in two weeks?”" } ],
              sup: [
                { id: "d", text: "“Carmela, three of the last four new-hire lists were missing employee IDs for ten or more people.”" },
                { id: "i", text: "“My team spent about six hours chasing them, and 30 new hires started without access.”" },
                { id: "a", text: "“What's happening on your side when the lists go out?”" },
                { id: "l", text: "“Could we agree a quick list checklist and review it together after the next wave?”" } ] }),
            key: [
              "Describe with specifics: which files, how many, when.",
              "Impact on the client or customer makes it a shared problem between peers.",
              "Ask genuinely. There may be a system issue on their side you can fix together."
            ] }
        ]
      },
      {
        title: "Your turn",
        blocks: [
          { type: "p", html: "Rewrite each heated message using DIAL. Write your version first, then compare it with a model answer. There's more than one good way to say it." },
          { type: "rewrite", id: "mg2-rewrite", title: "Rewrite with DIAL",
            items: V({
              ops: [
                { original: "To Nisha: “Your team's files are always a mess, and my TLs are sick of cleaning up after you.”", model: "“Nisha, three of last week's handoff files were missing the payer ID column, and my TLs spent about six hours on rework. Two client deadlines got tight. What's happening on your side when these go out? Could we agree a checklist and review it together in two weeks?”", why: "Facts instead of “always,” impact on the client, curiosity about her side, and a joint fix with a date." },
                { original: "To Dana: “Why am I always the last to know? This can't keep happening.”", model: "“Dana, I heard about the 40 unposted batches from the client on Wednesday, two days after your team found them. That put us on the back foot in the call. What made it hard to raise sooner? Let's agree how you can flag issues the same day, even before you have a fix.”", why: "Specific timing, impact on the account, a real question about the barrier, and a forward agreement that makes early news safe." } ],
              sup: [
                { original: "To Carmela: “Your team's lists are always incomplete, and my TLs are sick of chasing HR.”", model: "“Carmela, three of the last four new-hire lists were missing employee IDs for ten or more people. My team spent about six hours chasing them, and 30 new hires started without access. What's happening on your side when the lists go out? Could we agree a checklist and review it together after the next wave?”", why: "Facts instead of “always,” impact on new hires, curiosity about HR's side, and a joint fix with a date." },
                { original: "To Dana: “Why am I always the last to know? This can't keep happening.”", model: "“Dana, I heard about the 12 accounts from the Operations Director on Tuesday, a day after your team found them. That put us on the back foot. What made it hard to raise sooner? Let's agree how you can flag issues the same day, even before you have a fix.”", why: "Specific timing, impact on your internal customer, a real question about the barrier, and a forward agreement that makes early news safe." } ] }) },
          { type: "form", id: "mg2-own", title: "A real conflict",
            fields: [
              { id: "who", label: "A conflict between teams, peers, or functions that I'll DIAL instead of avoiding", prompt: "Who, and about what? Initials are fine." },
              { id: "open", label: "My Describe and Impact lines", prompt: "Facts with dates, then the effect on the client, customer, or account." }
            ], saveLabel: "Save my plan" }
        ]
      }
    ]
  },

  /* ===================================================================== */
  {
    id: "mg3", part: "path", track: "mgr", minutes: 9,
    title: "Support colleagues to reach shared goals",
    summary: "Win as a leadership team: share capacity, knowledge, and credit, and ask peers for help before it becomes a crisis.",
    screens: [
      {
        title: "One account, one team",
        blocks: [
          { type: "p", html: V({ ops: "Clients don't see your org chart. When one process fails, the whole account fails. The best AMs and Managers win as a leadership team: they share capacity, knowledge, and credit.", sup: "Internal customers don't see your org chart. When one support team fails, the whole service fails. The best Managers win as a leadership team: they share capacity, knowledge, and credit." }) },
          { type: "compare", cols: [
            { title: "A “my numbers” leadership team", items: V({ ops: ["“My process is green, so it's not my problem.”", "Best people and resources guarded", "Peers compete in reviews"], sup: ["“My SLA is green, so it's not my problem.”", "Best people and data guarded", "Peers compete in leadership meetings"] }) },
            { title: "An “our numbers” leadership team", items: V({ ops: ["“The client sees one account, not five teams.”", "Capacity and SMEs shared across teams", "Peers celebrate each other's wins"], sup: ["“Operations sees one service, not four teams.”", "Capacity and specialists shared across teams", "Peers celebrate each other's wins"] }) } ] },
          { type: "p", html: "<strong>The helping habit, at leadership level</strong>" },
          SH.helpingConcepts
        ]
      },
      {
        title: "Connect the dots",
        blocks: [
          { type: "match", id: "mg3-match", title: "Match each situation to the most helpful move",
            prompt: "Select a situation on the left, then the move on the right that helps most. A line connects each pair.",
            left: V({
              ops: [ { id: "l1", text: "Nisha's process is behind before a client review." }, { id: "l2", text: "Your TLs are struggling with night-shift attrition." }, { id: "l3", text: "Leo's team built a faster cash-matching method." }, { id: "l4", text: "Dana's numbers dipped, and she hasn't asked for help." } ],
              sup: [ { id: "l1", text: "Carmela's team is behind on the next new-hire list." }, { id: "l2", text: "Your TLs are struggling with weekend coverage." }, { id: "l3", text: "Chris's team built an access checklist that halved rework." }, { id: "l4", text: "Dana's numbers dipped, and she hasn't asked for help." } ] }),
            right: V({
              ops: [ { id: "r1", text: "“I can lend two SMEs on Thursday afternoon for your top payer backlog.”" }, { id: "r2", text: "Ask two peer Managers what's worked for them, this week, before it hits the client." }, { id: "r3", text: "Invite Leo to present it at the leadership meeting, and credit his team." }, { id: "r4", text: "Ask her what's getting in the way, and offer one specific support." } ],
              sup: [ { id: "r1", text: "“Chris can join your list review on Thursday to flag access issues early.”" }, { id: "r2", text: "Ask two peer Managers what's worked for them, this week, before it hits Operations." }, { id: "r3", text: "Invite Chris to present it to HR and Training, and credit his team." }, { id: "r4", text: "Ask her what's getting in the way, and offer one specific support." } ] }),
            pairs: { l1: "r1", l2: "r2", l3: "r3", l4: "r4" },
            key: [
              "Specific offers between peers build trust faster than any team-building event.",
              "Asking peers early is a strength. Someone may already have solved it.",
              "Credit given across teams spreads good practice and goodwill."
            ] },
          { type: "form", id: "mg3-ask", title: "Your ask and your offer",
            fields: [
              { id: "ask", label: "Something I need help with this month", prompt: V({ ops: "For example: a better way to run my weekly business review with the client.", sup: "For example: a better way to report service levels to Operations leaders." }) },
              { id: "who", label: "Who I'll ask, and when" },
              { id: "offer", label: "A specific offer I'll make to a peer", prompt: V({ ops: "For example: Nisha can sit in on my WBR on Tuesday to see the format.", sup: "For example: Carmela's team can use our access checklist from next week." }) }
            ], saveLabel: "Save my ask and offer" }
        ]
      }
    ]
  },

  /* ===================================================================== */
  {
    id: "mg4", part: "path", track: "mgr", minutes: 13,
    title: "Build networks",
    summary: "Strengthen the three networks every leader needs, find your gap, and recap all four skills in a crossword.",
    screens: [
      {
        title: "Three networks every leader needs",
        blocks: [
          { type: "p", html: "No team succeeds alone. Herminia Ibarra's research on leadership networks describes three kinds every leader needs. As leaders move up, the strategic network matters more, and it's usually the one that's thinnest." },
          { type: "concepts", items: V({
            ops: [
              { title: "Operational", tag: "Who helps us deliver today?", text: "Peer AMs and Managers, Quality, MIS, WFM, your HR business partner." },
              { title: "Developmental", tag: "Who helps me grow as a leader?", text: "Your mentor, senior leaders, peers in other towers." },
              { title: "Strategic", tag: "Who helps me see what's coming?", text: "Client stakeholders, Tower Leads, Finance, Solutions and Labs." } ],
            sup: [
              { title: "Operational", tag: "Who helps us deliver today?", text: "Peer Managers in HR, Training, and WFM, Operations TLs, vendors." },
              { title: "Developmental", tag: "Who helps me grow as a leader?", text: "Your mentor, senior leaders, peers in other functions." },
              { title: "Strategic", tag: "Who helps me see what's coming?", text: "Operations Directors, senior leadership, Finance, Solutions, sales and new-client teams." } ] }) },
          { type: "callout", tone: "rule", title: "Give before you ask", html: "Networks are two-way. Share knowledge, credit others, offer help. The best time to build a relationship is before you need it." },
          { type: "bucket", id: "mg4-sort", title: "Which network?",
            prompt: "Sort each person into the network they mainly belong to.",
            buckets: [ { id: "op", label: "Operational" }, { id: "dev", label: "Developmental" }, { id: "str", label: "Strategic" } ],
            items: V({
              ops: [
                { id: "a", text: "Your HR business partner", bucket: "op" },
                { id: "b", text: "A senior leader who mentors you quarterly", bucket: "dev" },
                { id: "c", text: "The client's operations lead", bucket: "str" },
                { id: "d", text: "Ken, the MIS analyst", bucket: "op" },
                { id: "e", text: "A Manager in another tower whose style you admire", bucket: "dev" },
                { id: "f", text: "A Tower Lead planning next year's work", bucket: "str" } ],
              sup: [
                { id: "a", text: "Ken, the WFM analyst", bucket: "op" },
                { id: "b", text: "A senior leader who mentors you quarterly", bucket: "dev" },
                { id: "c", text: "An Operations Director planning new clients", bucket: "str" },
                { id: "d", text: "Carmela, your HR onboarding peer", bucket: "op" },
                { id: "e", text: "A Manager in another function whose style you admire", bucket: "dev" },
                { id: "f", text: "A Finance leader shaping next year's budget", bucket: "str" } ] }) }
        ]
      },
      {
        title: "Map your network",
        blocks: [
          { type: "netmap", id: "mg4-net", title: "My network map",
            prompt: "List the people in each network, one per line. Names or roles are fine. Then find your gap and pick one person to connect with this week.",
            networks: V({
              ops: [ { id: "op", name: "Operational", q: "Who helps us deliver today?", who: "peer Managers, Quality, MIS, WFM, HR." },
                { id: "dev", name: "Developmental", q: "Who helps me grow as a leader?", who: "a mentor, senior leaders, peers in other towers." },
                { id: "str", name: "Strategic", q: "Who helps me see what's coming?", who: "client stakeholders, Tower Leads, Finance, Solutions." } ],
              sup: [ { id: "op", name: "Operational", q: "Who helps us deliver today?", who: "peer Managers, Operations TLs, WFM, vendors." },
                { id: "dev", name: "Developmental", q: "Who helps me grow as a leader?", who: "a mentor, senior leaders, peers in other functions." },
                { id: "str", name: "Strategic", q: "Who helps me see what's coming?", who: "Operations Directors, senior leaders, Finance, Solutions." } ] }),
            key: [
              "Your network is your teams' extended capability.",
              "The strategic network grows only if you schedule it. It won't grow from daily work.",
              "Lead with what you can offer. It makes the first conversation easy."
            ] }
        ]
      },
      {
        title: "Recap: the four skills",
        blocks: [
          { type: "p", html: "Before the capstone, check what's stuck. Every answer comes from this course." },
          SH.crossword
        ]
      }
    ]
  },

  /* ===================================================================== */
  {
    id: "mg5", part: "path", track: "mgr", minutes: 15, capstone: true,
    title: "Bringing it together",
    summary: "Lead the escalation huddle, test your recall in a quiz game, find the missing piece, and build your action plan.",
    screens: [
      {
        title: V({ ops: "The cross-team crunch", sup: "The onboarding huddle" }),
        blocks: [
          { type: "p", html: "Everything you've practiced comes together in one leadership huddle. Make a choice at each moment and see how it lands with the people in the room." },
          V({
            ops: { type: "sim", id: "mg5-sim", title: "The leadership huddle",
              setup: "The client has escalated: unapplied cash is rising and AR aging is up. Your Posting team and Nisha's AR team are blaming each other. Mara from Quality says the root cause is a payer remittance change she flagged last month. Leo says his team is exhausted. Your goal: a joint recovery plan the client can see by Friday. You call a leadership huddle.",
              steps: [
                { label: "Open", context: "Everyone's on the call. What do you say first?", options: [
                  { text: "“I need to know whose team caused this.”", correct: false, feedback: "Everyone starts defending their own team, and the root cause gets lost." },
                  { text: "“The client sees one account, not two teams. Let's find the root cause and agree a joint plan by Friday.”", correct: true, feedback: "You framed a shared goal. People lean in instead of digging in." },
                  { text: "“Nisha, your aging is up. What are you doing about it?”", correct: false, feedback: "Singling out a peer in front of others guarantees defensiveness." } ] },
                { label: "Nisha", context: "Nisha says: “My team's numbers were fine until Posting fell behind.”", options: [
                  { text: "“That's not accurate. Your team has issues too.”", correct: false, feedback: "Now it's a contest, and neither of you will back down." },
                  { text: "Say nothing, to avoid conflict", correct: false, feedback: "Avoiding here lets the blame stand and stalls the plan." },
                  { text: "“I hear you. Your team's numbers matter. What are you seeing on your side?”", correct: true, feedback: "Acknowledging and asking lowers the temperature. She shares that her queue has been flooded with unmatched payments." } ] },
                { label: "Quality", context: "Mara says: “I flagged this remittance change last month, and nobody listened.”", options: [
                  { text: "“You're right, we missed it. Walk us through the data. What should we fix first?”", correct: true, feedback: "Owning it earns her trust, and her data points straight to the fix." },
                  { text: "“Let's focus on now, not last month.”", correct: false, feedback: "You've just repeated what happened last month: she wasn't heard." },
                  { text: "“Can you send it by email after the call?”", correct: false, feedback: "You'll get the data, but you miss the chance to show she was heard." } ] },
                { label: "Leo", context: "Leo says his team is exhausted.", options: [
                  { text: "“We all are. We need one more push.”", correct: false, feedback: "His team hears that their wellbeing doesn't count." },
                  { text: "Promise an incentive, without changing the workload", correct: false, feedback: "Appreciated, but the team is still exhausted." },
                  { text: "Agree priorities, pause non-urgent work, and ask Nisha for an SME for two days", correct: true, feedback: "Support plus a specific ask. Your network shares the load." } ] },
                { label: "Close", context: "How do you close the huddle?", options: [
                  { text: "Summarize the plan, owners, and dates; agree to present it to the client together; thank each person for what they brought.", correct: true, feedback: "One plan, shared credit, and everyone leaves knowing their contribution mattered." },
                  { text: "“I'll update the client myself.”", correct: false, feedback: "The client gets an update, but your peers feel cut out." },
                  { text: "End the call to save time", correct: false, feedback: "No clear plan, no recognition. The blame will be back next week." } ] }
              ],
              key: [
                "No single leader could have solved this. The plan came from everyone, including the people who started out defensive.",
                "You used every skill: a shared goal to open, curiosity with a defensive peer, ownership with Quality, and a specific ask to your network.",
                "Presenting the plan together, with shared credit, is what keeps the silos from coming back."
              ] },
            sup: { type: "sim", id: "mg5-sim", title: "The leadership huddle",
              setup: "The Operations Director has escalated: 30 new hires sat idle for two days. Carmela's HR team and your team are blaming each other. Paul from Training says he flagged the start-date timing problem a month ago. Chris says his team is exhausted. The next wave of 60 starts in two weeks. Your goal: one joint onboarding plan the Operations Director can see by Friday. You call a leadership huddle.",
              steps: [
                { label: "Open", context: "Everyone's on the call. What do you say first?", options: [
                  { text: "“Carmela, HR's lists were late again. What are you doing about it?”", correct: false, feedback: "Singling out a peer in front of others guarantees defensiveness." },
                  { text: "“Operations sees one onboarding process, not three teams. Let's find the root cause and agree one plan by Friday.”", correct: true, feedback: "You framed a shared goal. People lean in instead of digging in." },
                  { text: "“I need to know whose team caused this.”", correct: false, feedback: "Everyone starts defending their own team, and the root cause gets lost." } ] },
                { label: "Carmela", context: "Carmela says: “My team's lists were fine until IT started rejecting them.”", options: [
                  { text: "“I hear you. Your team's work matters here. What are you seeing on your side?”", correct: true, feedback: "Acknowledging and asking lowers the temperature. She shares that Operations keeps changing start dates after the list is sent." },
                  { text: "“That's not accurate. Your lists had missing IDs.”", correct: false, feedback: "Now it's a contest, and neither of you will back down." },
                  { text: "Say nothing, to avoid conflict", correct: false, feedback: "Avoiding here lets the blame stand and stalls the plan." } ] },
                { label: "Training", context: "Paul says: “I flagged this timing problem a month ago, and nobody listened.”", options: [
                  { text: "“Let's focus on now, not last month.”", correct: false, feedback: "You've just repeated what happened last month: he wasn't heard." },
                  { text: "“Can you email it after the call?”", correct: false, feedback: "You'll get the data, but you miss the chance to show he was heard." },
                  { text: "“You're right, we missed it. Walk us through it. What should we fix first?”", correct: true, feedback: "Owning it earns his trust. His data shows start dates moving within 48 hours of day one, which is the real root cause." } ] },
                { label: "Chris", context: "Chris says his team is exhausted.", options: [
                  { text: "Agree priorities, pause non-urgent tickets, and ask Ken in WFM to send start-date changes daily so the team stops reworking", correct: true, feedback: "Support plus a specific ask. Your network removes the cause of the rework." },
                  { text: "“We all are. We need one more push.”", correct: false, feedback: "His team hears that their wellbeing doesn't count." },
                  { text: "Promise a team lunch, without changing the workload", correct: false, feedback: "Appreciated, but the team is still exhausted." } ] },
                { label: "Close", context: "How do you close the huddle?", options: [
                  { text: "“I'll update the Operations Director myself.”", correct: false, feedback: "The Director gets an update, but your peers feel cut out." },
                  { text: "End the call to save time", correct: false, feedback: "No clear plan, no recognition. The blame will be back next week." },
                  { text: "Summarize the plan, owners, and dates; agree to present it to the Operations Director together; thank each person for what they brought.", correct: true, feedback: "One plan, shared credit, and everyone leaves knowing their contribution mattered." } ] }
              ],
              key: [
                "No single leader could have solved this. The plan came from everyone, including the people who started out defensive.",
                "You used every skill: a shared goal to open, curiosity with a defensive peer, ownership with Training, and a specific ask to your network.",
                "Presenting the plan together, with shared credit, is what keeps the silos from coming back."
              ] } })
        ]
      },
      {
        title: "Review game",
        blocks: [
          { type: "p", html: "Pick any tile. Higher values are harder. Clear the board to finish; there's no penalty for a wrong answer." },
          { type: "jeopardy", id: "mg5-game", title: "Collaboration quiz board",
            cats: [
              { name: "Safe to speak", clues: [
                { v: 100, q: "What's the best way to make it safe for TLs to bring you bad news?", options: ["Ask why they didn't tell you sooner", "Thank them for raising it, then solve it together", "Note it for their review"], answer: 1, explain: "Thanking people for bad news is how you get it early." },
                { v: 200, q: "In a leadership review, why ask for your TLs' views before giving yours?", options: ["It saves time", "It avoids conflict", "Your title makes people wait for your view, then echo it"], answer: 2, explain: "Asking first gets you their real view, not a copy of yours." },
                { v: 300, q: "Two teams keep blaming each other. Which fix is most likely to last?", options: ["A shared goal with a short weekly joint review", "Escalate each dispute", "Separate KPIs for each team"], answer: 0, explain: "A shared goal plus a routine turns blame into joint problem-solving." } ] },
              { name: "Conflict", clues: [
                { v: 100, q: V({ ops: "A TL is bypassing a compliance control to hit targets. Which mode fits?", sup: "A TL is skipping access approvals to hit SLA. Which mode fits?" }), options: ["Compromising", "Competing", "Avoiding"], answer: 1, explain: "Non-negotiables call for standing firm, and explaining why." },
                { v: 200, q: "In DIAL, what does Describe mean?", options: ["State the facts, not labels", "Describe how you feel", "Describe the consequences"], answer: 0, explain: "Specific facts keep the conversation about the work." },
                { v: 300, q: V({ ops: "Quality wants a calibration slot that's inconvenient for you but works for three other teams. Which mode fits?", sup: "Training wants a test window that's inconvenient for you but works for three other teams. Which mode fits?" }), options: ["Competing", "Avoiding", "Accommodating"], answer: 2, explain: "The bigger picture wins, and you build goodwill you may need later." } ] },
              { name: "Helping", clues: [
                { v: 100, q: "Which offer to a peer is most likely to be accepted?", options: ["“Shout if you need anything.”", V({ ops: "“I can lend two SMEs on Thursday afternoon for your top payer backlog.”", sup: "“Chris can join your list review on Thursday to flag access issues early.”" }), "“Let's discuss at the next leadership meeting.”"], answer: 1, explain: "Specific offers name what, how much, and when." },
                { v: 200, q: "Your TLs are struggling with a problem a peer may have solved. When should you ask peers?", options: ["As soon as the trend appears", "Only once it reaches the client or customer", "Never; it reflects badly on you"], answer: 0, explain: "Asking early is a strength. Silence just slows everyone down." },
                { v: 300, q: "What does winning as a leadership team look like?", options: ["Each Manager protects their own scorecard", "The strongest process carries the others", "Peers share capacity, knowledge, and credit"], answer: 2, explain: "The client or customer experiences one service, so leaders have to act like one team." } ] },
              { name: "Networks", clues: [
                { v: 100, q: V({ ops: "Client stakeholders and Tower Leads belong to which network?", sup: "Operations Directors and senior leaders belong to which network?" }), options: ["Operational", "Developmental", "Strategic"], answer: 2, explain: "They help you see what's coming." },
                { v: 200, q: V({ ops: "Your HR business partner mainly belongs to which network?", sup: "Your WFM analyst mainly belongs to which network?" }), options: ["Operational", "Developmental", "Strategic"], answer: 0, explain: "Operational contacts help you deliver today." },
                { v: 300, q: "As leaders move up, which network usually needs the most deliberate effort?", options: ["Operational", "Strategic", "Developmental"], answer: 1, explain: "Strategic relationships don't grow from daily work. You have to schedule them." } ] }
            ] }
        ]
      },
      {
        title: "The missing piece",
        blocks: [
          { type: "puzzle", caption: "A leadership team with a piece missing isn't complete." },
          { type: "p", html: "Remember the missing line at the start? The story jumped from blame to a joint plan because someone's contribution was gone." },
          { type: "p", html: V({ ops: "Think about the huddle you just led: the plan only came together because each leader brought something. Your teams, your peers, and your client need what only you bring: your style, your experience, and your connections. When you hold back or work in a silo, the account is incomplete.", sup: "Think about the huddle you just led: the plan only came together because each leader brought something. Your teams, your peers, and your internal customers need what only you bring: your style, your experience, and your connections. When you hold back or work in a silo, the service is incomplete." }) },
          { type: "p", html: "<strong>That piece is you. And the leaders around you need to hear that they matter too.</strong>" },
          { type: "appreciate", id: "mg5-appr", title: "Say it to someone",
            prompt: "Write a short message to one TL or peer. Then send it today, in your own words.",
            label: "Your message, for example: “[Name], our leadership team is better because you…”" }
        ]
      },
      {
        title: "My action plan",
        blocks: [
          { type: "p", html: "Here's everything you committed to in this course. Add the last details and save. You'll get it as part of your PDF at the end; share it with your mentor or manager this week." },
          { type: "plan", id: "mg5-plan", title: "My collaboration action plan",
            rows: [
              { label: "My team-player style", ref: "f2-style" },
              { label: "What my teams miss when I'm not there", ref: "f2-reflect", field: "miss" },
              { label: "How I'll avoid overusing my style", ref: "f2-reflect", field: "overuse" },
              { label: "My cross-team fix", ref: "mg1-design" },
              { label: "My collaboration habit", ref: "mg1-habit", field: "habit" },
              { label: "A conflict I'll DIAL", ref: "mg2-own", field: "who" },
              { label: "My ask", ref: "mg3-ask", field: "ask" },
              { label: "My offer", ref: "mg3-ask", field: "offer" },
              { label: "My thinnest network", ref: "mg4-net", field: "weakest" },
              { label: "The person I'll connect with", ref: "mg4-net" },
              { label: "My appreciation message", ref: "mg5-appr" }
            ],
            fields: [
              { id: "share", label: "Who I'll share this plan with, and when", prompt: "Your mentor, your manager, or a peer Manager." },
              { id: "more", label: "Anything else I'll do (optional)", optional: true }
            ] }
        ]
      }
    ]
  });
})();
