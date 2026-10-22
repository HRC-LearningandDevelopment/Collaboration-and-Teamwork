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
          { type: "figure", src: "img/illustrations/huddle.svg", alt: "A team huddles around a table, speaking up" },
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
          { type: "media", src: "img/photos/video-call.webp", shape: "circle", alt: "A laptop showing a video call with a grid of colleagues", html: "Teams that blame each other rarely lack goodwill. They lack a shared goal and a shared routine. For each situation, pick the fix most likely to last." },
          V({
            ops: { type: "sim", id: "mg1-sim", title: "Three silos on the account",
              setup: "Your account has five processes and a Quality team. Each looks fine on its own scorecard, but the client keeps finding the gaps between them.",
              steps: [
                { label: "Ops and Quality", context: "Your TLs and Quality keep arguing about audit errors. Agents say “QA is out to get us.”", options: [
                  { text: "Escalate disputed audits to the Tower Lead for a ruling", correct: false, feedback: "Settles one dispute and teaches both teams to fight through you. The next dispute arrives sooner." },
                  { text: "Set one shared accuracy goal and calibrate jointly each week", correct: true, feedback: "A shared goal plus a regular routine turns opponents into partners. Disputes become calibration agenda items." },
                  { text: "Have Quality explain its audit criteria at your next town hall", correct: false, feedback: "Transparency helps, but it's one-way. Agents still feel judged, and nobody owns the result together." } ] },
                { label: "Posting and AR", context: "Posting and AR blame each other for unapplied cash.", options: [
                  { text: "Ask MIS to trace which team created each unapplied item", correct: false, feedback: "Forensic, slow, and it keeps the blame alive. You'll have a perfect answer to the wrong question." },
                  { text: "Move two AR specialists into Posting until it clears", correct: false, feedback: "Adds capacity, but the handoff that caused the problem is unchanged. It comes back when they leave." },
                  { text: "Give both teams one shared target, reviewed jointly", correct: true, feedback: "When both teams own the same number, they solve it together." } ] },
                { label: "Late news", context: "Dana tells you about a posting backlog late, after the client has noticed.", options: [
                  { text: "Point out, calmly, that you'd rather hear bad news early", correct: false, feedback: "True, and you should say it eventually, but said now it lands as a reprimand. She learns to hide it better." },
                  { text: "Thank her, fix it, then agree an earlier warning trigger", correct: true, feedback: "Thanking people for bad news is how you get it early. Then fix the early-warning system together." },
                  { text: "Ask her to send you daily backlog numbers from now on", correct: false, feedback: "Monitoring replaces trust. She'll report numbers, not problems, and you'll still hear the real news late." } ] }
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
                  { text: "Escalate disputed requests to the Director for a ruling", correct: false, feedback: "Settles one dispute and teaches both teams to fight through you. The next dispute arrives sooner." },
                  { text: "Require HR to send every list two weeks ahead, no exceptions", correct: false, feedback: "A one-sided rule. HR can't control every Operations start date, so it will break, and the blame returns." },
                  { text: "Set one shared day-one goal and review each wave together", correct: true, feedback: "A shared goal plus a regular routine turns opponents into partners." } ] },
                { label: "IT and Training", context: "Training and your team blame each other for failed test logins.", options: [
                  { text: "Give both teams one login-success target, reviewed jointly", correct: true, feedback: "When both teams own the same number, they solve it together." },
                  { text: "Ask IT Security to trace the cause of every failed login", correct: false, feedback: "Forensic, slow, and it keeps the blame alive. You'll have a perfect answer to the wrong question." },
                  { text: "Lend Training one of your specialists for test days", correct: false, feedback: "Adds capacity, but the handoff that caused the problem is unchanged. It comes back when they leave." } ] },
                { label: "Late news", context: "Dana tells you that 12 accounts weren't ready, after the Operations Director complained.", options: [
                  { text: "Ask her to send you daily readiness numbers from now on", correct: false, feedback: "Monitoring replaces trust. She'll report numbers, not problems, and you'll still hear the real news late." },
                  { text: "Point out, calmly, that you'd rather hear bad news early", correct: false, feedback: "True, and you should say it eventually, but said now it lands as a reprimand. She learns to hide it better." },
                  { text: "Thank her, fix it, then agree an earlier warning trigger", correct: true, feedback: "Thanking people for bad news is how you get it early. Then fix the early-warning system together." } ] }
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
          { type: "figure", src: "img/illustrations/conflict.svg", alt: "Two colleagues face each other while a DIAL gauge turns toward calm" },
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
        title: "Three conflicts, one afternoon",
        blocks: [
          { type: "p", html: "Knowing the five modes is the easy part. The skill is choosing quickly, under pressure, when several conflicts compete for your attention." },
          window.CT_CASES.afternoon
        ]
      },
      {
        title: "DIAL: turning down the heat",
        blocks: [
          { type: "media", src: "img/photos/frustrated.webp", shape: "circle", alt: "A frustrated professional gestures at his laptop", html: "When a conflict with a peer is worth addressing, use four steps in order. Attack the problem, not the person, and never the team." },
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
          { type: "figure", src: "img/illustrations/support.svg", alt: "Colleagues pass work along toward a shared goal" },
          { type: "media", src: "img/photos/helping.webp", shape: "circle", alt: "One colleague leans in to help another at her laptop", html: V({ ops: "Clients don't see your org chart. When one process fails, the whole account fails. The best AMs and Managers win as a leadership team: they share capacity, knowledge, and credit.", sup: "Internal customers don't see your org chart. When one support team fails, the whole service fails. The best Managers win as a leadership team: they share capacity, knowledge, and credit." }) },
          { type: "compare", cols: [
            { title: "A “my numbers” leadership team", items: V({ ops: ["“My process is green, so it's not my problem.”", "Best people and resources guarded", "Peers compete in reviews"], sup: ["“My SLA is green, so it's not my problem.”", "Best people and data guarded", "Peers compete in leadership meetings"] }) },
            { title: "An “our numbers” leadership team", items: V({ ops: ["“The client sees one account, not five teams.”", "Capacity and SMEs shared across teams", "Peers celebrate each other's wins"], sup: ["“Operations sees one service, not four teams.”", "Capacity and specialists shared across teams", "Peers celebrate each other's wins"] }) } ] },
          { type: "p", html: "<strong>The helping habit, at leadership level</strong>" },
          SH.helpingConcepts
        ]
      },
      {
        title: "When a peer asks for help",
        blocks: [
          window.CT_CASES.sme,
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
    summary: "Strengthen the three networks every leader needs, find your gap, and decide whose help to ask for first.",
    screens: [
      {
        title: "Three networks every leader needs",
        blocks: [
          { type: "figure", src: "img/illustrations/network.svg", alt: "A leader at the center of operational, developmental, and strategic networks" },
          { type: "media", src: "img/photos/handshake.webp", shape: "portrait", alt: "Two colleagues shake hands and smile", html: "No team succeeds alone. Herminia Ibarra's research on leadership networks describes three kinds every leader needs. As leaders move up, the strategic network matters more, and it's usually the one that's thinnest." },
          { type: "concepts", items: V({
            ops: [
              { title: "Operational", tag: "Who helps us deliver today?", text: "Peer AMs and Managers, Quality, MIS, WFM, your HR business partner." },
              { title: "Developmental", tag: "Who helps me grow as a leader?", text: "Your mentor, senior leaders, peers in other towers." },
              { title: "Strategic", tag: "Who helps me see what's coming?", text: "Client stakeholders, Tower Leads, Finance, Solutions and Labs." } ],
            sup: [
              { title: "Operational", tag: "Who helps us deliver today?", text: "Peer Managers in HR, Training, and WFM, Operations TLs, vendors." },
              { title: "Developmental", tag: "Who helps me grow as a leader?", text: "Your mentor, senior leaders, peers in other functions." },
              { title: "Strategic", tag: "Who helps me see what's coming?", text: "Operations Directors, senior leadership, Finance, Solutions, sales and new-client teams." } ] }) },
          { type: "callout", tone: "rule", title: "Give before you ask", html: "Networks are two-way. Share knowledge, credit others, offer help. The best time to build a relationship is before you need it." }
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
        title: "Who do you call first?",
        blocks: [
          { type: "p", html: "A strong network is only useful if you know which part of it to use. Three situations; you choose the first call." },
          window.CT_CASES.whocall
        ]
      }
    ]
  },

  /* ===================================================================== */
  {
    id: "mg5", part: "path", track: "mgr", minutes: 15, capstone: true,
    title: "Bringing it together",
    summary: "Lead the escalation huddle, make the calls for an executive review, find the missing piece, and build your action plan.",
    screens: [
      {
        title: V({ ops: "The cross-team crunch", sup: "The onboarding huddle" }),
        blocks: [
          { type: "figure", src: "img/illustrations/capstone.svg", alt: "A team climbs rising steps toward a flag" },
          { type: "p", html: "Everything you've practiced comes together in one leadership huddle. Make a choice at each moment and see how it lands with the people in the room." },
          V({
            ops: { type: "sim", id: "mg5-sim", title: "The leadership huddle",
              setup: "The client has escalated: unapplied cash is rising and AR aging is up. Your Posting team and Nisha's AR team are blaming each other. Mara from Quality says the root cause is a payer remittance change she flagged last month. Leo says his team is exhausted. Your goal: a joint recovery plan the client can see by Friday. You call a leadership huddle.",
              steps: [
                { label: "Open", context: "Everyone's on the call. What do you say first?", options: [
                  { text: "“Let's go team by team, starting with what each of you has found.”", correct: false, feedback: "Sounds fair, but a round-robin turns into each team defending its own numbers." },
                  { text: "“Before causes, let's agree what the client must see by Friday.”", correct: true, feedback: "You framed a shared goal first. People lean in instead of digging in." },
                  { text: "“Nisha, your aging is up most. Talk us through what's happening.”", correct: false, feedback: "Singling out a peer in front of others guarantees defensiveness." } ] },
                { label: "Nisha", context: "Nisha says: “My team's numbers were fine until Posting fell behind.”", options: [
                  { text: "“Let's park who caused it and focus on the fix.”", correct: false, feedback: "Avoids the blame, but also skips her information. She shuts down, and you lose what AR knows." },
                  { text: "“Fair. What changed on your side when it started?”", correct: true, feedback: "Acknowledging and asking lowers the temperature. She shares that her queue has been flooded with unmatched payments." },
                  { text: "“Our data says otherwise, but let's look at it together.”", correct: false, feedback: "The invitation is good, but the first half starts a contest she now has to win." } ] },
                { label: "Quality", context: "Mara says: “I flagged this remittance change last month, and nobody listened.”", options: [
                  { text: "“Let's understand why the flag didn't reach us.”", correct: false, feedback: "A fair question for later. Right now it sounds like process-talk, and she still hasn't been heard." },
                  { text: "“Thanks. Can you send the analysis after this call?”", correct: false, feedback: "Polite, but it repeats last month: her insight goes into an inbox instead of the room." },
                  { text: "“You're right, we missed it. What should we fix first?”", correct: true, feedback: "Owning it earns her trust, and her data points straight to the fix." } ] },
                { label: "Leo", context: "Leo says his team is exhausted.", options: [
                  { text: "Approve overtime this week and check in with Leo on Friday", correct: false, feedback: "Overtime adds hours to people who are already tired. Quality usually drops first." },
                  { text: "Pause the clean-up project and borrow an SME from Nisha", correct: true, feedback: "Removes work and adds help. Your network shares the load." },
                  { text: "Bring in two people from your other site for the week", correct: false, feedback: "Adds hands, but they don't know this client's payers. Expect rework that lands on Leo's team." } ] },
                { label: "Close", context: "How do you close the huddle?", options: [
                  { text: "Update the client yourself, to keep one clear voice", correct: false, feedback: "One voice sounds sensible, but your peers feel cut out and stop owning the plan." },
                  { text: "Summarize the plan by email tonight so nothing is lost", correct: false, feedback: "Useful, but the moment to agree owners and thank people has passed." },
                  { text: "Agree owners, then present to the client together", correct: true, feedback: "One plan, shared credit, and everyone leaves knowing their contribution mattered." } ] }
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
                  { text: "“Carmela, HR's lists were late most. Talk us through what happened.”", correct: false, feedback: "Singling out a peer in front of others guarantees defensiveness." },
                  { text: "“Let's go team by team, starting with what each of you has found.”", correct: false, feedback: "Sounds fair, but a round-robin turns into each team defending its own numbers." },
                  { text: "“Before causes, let's agree what Operations must see by Friday.”", correct: true, feedback: "You framed a shared goal first. People lean in instead of digging in." } ] },
                { label: "Carmela", context: "Carmela says: “My team's lists were fine until IT started rejecting them.”", options: [
                  { text: "“Fair. What changed on your side when it started?”", correct: true, feedback: "Acknowledging and asking lowers the temperature. She shares that Operations keeps changing start dates after the list is sent." },
                  { text: "“Let's park who caused it and focus on the fix.”", correct: false, feedback: "Avoids the blame, but also skips her information. She shuts down, and you lose what HR knows." },
                  { text: "“Our tickets say otherwise, but let's look together.”", correct: false, feedback: "The invitation is good, but the first half starts a contest she now has to win." } ] },
                { label: "Training", context: "Paul says: “I flagged this timing problem a month ago, and nobody listened.”", options: [
                  { text: "“You're right, we missed it. What should we fix first?”", correct: true, feedback: "Owning it earns his trust. His data shows start dates moving within 48 hours of day one: the real root cause." },
                  { text: "“Let's understand why the flag didn't reach us.”", correct: false, feedback: "A fair question for later. Right now it sounds like process-talk, and he still hasn't been heard." },
                  { text: "“Thanks. Can you send the analysis after this call?”", correct: false, feedback: "Polite, but it repeats last month: his insight goes into an inbox instead of the room." } ] },
                { label: "Chris", context: "Chris says his team is exhausted.", options: [
                  { text: "Approve overtime this week and check in with Chris on Friday", correct: false, feedback: "Overtime adds hours to people who are already tired. Errors usually rise first." },
                  { text: "Bring in two people from the general service desk", correct: false, feedback: "Adds hands, but they don't know the new client's access profiles. Expect rework that lands on Chris's team." },
                  { text: "Ask WFM for daily date changes so the rework stops", correct: true, feedback: "Removes the cause of the rework instead of adding hours. Your network shares the load." } ] },
                { label: "Close", context: "How do you close the huddle?", options: [
                  { text: "Agree owners, then present to Operations together", correct: true, feedback: "One plan, shared credit, and everyone leaves knowing their contribution mattered." },
                  { text: "Update the Operations Director yourself, as one clear voice", correct: false, feedback: "One voice sounds sensible, but your peers feel cut out and stop owning the plan." },
                  { text: "Summarize the plan by email tonight so nothing is lost", correct: false, feedback: "Useful, but the moment to agree owners and thank people has passed." } ] }
              ],
              key: [
                "No single leader could have solved this. The plan came from everyone, including the people who started out defensive.",
                "You used every skill: a shared goal to open, curiosity with a defensive peer, ownership with Training, and a specific ask to your network.",
                "Presenting the plan together, with shared credit, is what keeps the silos from coming back."
              ] } })
        ]
      },
      {
        title: "Executive review",
        blocks: [
          { type: "p", html: "The huddle produced a plan. Now you have to tell the story upward and outward, using the numbers." },
          window.CT_CASES.review
        ]
      },
      {
        title: "The missing piece",
        blocks: [
          { type: "puzzle", caption: "A leadership team with a piece missing isn't complete." },
          { type: "p", html: "Remember the missing line at the start? The story jumped from blame to a joint plan because someone's contribution was gone." },
          { type: "p", html: V({ ops: "Think about the huddle you just led: the plan only came together because each leader brought something. Your teams, your peers, and your client need what only you bring: your style, your experience, and your connections. When you hold back or work in a silo, the account is incomplete.", sup: "Think about the huddle you just led: the plan only came together because each leader brought something. Your teams, your peers, and your internal customers need what only you bring: your style, your experience, and your connections. When you hold back or work in a silo, the service is incomplete." }) },
          { type: "media", src: "img/photos/thumbs-up.webp", shape: "circle", alt: "A row of hands giving a thumbs-up", html: "<strong>That piece is you. And the leaders around you need to hear that they matter too.</strong>" },
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
