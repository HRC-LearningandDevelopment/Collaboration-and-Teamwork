/* PART 2 — STRONGER TOGETHER (ATLs and Team Leaders), tailored by function */
(function () {
  const V = window.CV, SH = window.CT_SHARED;

  window.COURSE.modules.push(
  /* ===================================================================== */
  {
    id: "tl1", part: "path", track: "tl", minutes: 11,
    title: "Promote a collaborative environment",
    summary: "Make it safe for your team to speak up, admit mistakes, and ask for help, and see how your everyday responses build or break that safety.",
    screens: [
      {
        title: "Safe to speak, fail, and ask",
        blocks: [
          { type: "p", html: "People collaborate when they feel safe. Google's Project Aristotle studied 180 teams and found that psychological safety mattered more than who was on the team. Amy Edmondson, who coined the term, describes it as a shared belief that the team is safe for interpersonal risk-taking." },
          { type: "p", html: "On your team, that means people feel safe to:" },
          SH.safetyConcepts,
          { type: "p", html: "You build it, or break it, in small moments every day. Open each move to see what it sounds like." },
          { type: "accordion", id: "tl1-moves", items: [
            { title: "Frame the work", html: V({
              ops: "<p>Say out loud that the work is hard and that you need everyone's eyes on it. People speak up more when they know problems are expected.</p><span class='eg'>“Month-end is tough, and payers change rules without warning. I need everyone to flag problems early.”</span>",
              sup: "<p>Say out loud that the work is hard and that you need everyone's eyes on it. People speak up more when they know problems are expected.</p><span class='eg'>“Go-live weeks are messy, and the list will change. I need everyone to flag problems early.”</span>" }) },
            { title: "Invite input", html: "<p>Ask genuine questions, then wait. Silence after “Any questions?” isn't agreement; it's usually people deciding whether it's safe.</p><span class='eg'>“What am I missing?” or “Who sees this differently?”</span>" },
            { title: "Respond productively", html: "<p>How you react to bad news decides whether you hear the next piece of bad news. Thank first, fix second, learn third.</p><span class='eg'>“Thanks for flagging that. Let's fix it together, then look at what tripped us up.”</span>" }
          ] }
        ]
      },
      {
        title: "Safe or shut down?",
        blocks: [
          { type: "p", html: "Here are four everyday moments from your week. For each one, choose the response that builds safety. If you pick a weaker one, you'll see how it lands, and you can try again." },
          V({
            ops: { type: "sim", id: "tl1-sim", title: "Four moments on the floor",
              setup: "Month-end week. The team is behind, everyone is tired, and every reaction you have is being watched.",
              steps: [
                { label: "An error", context: "Carlo messages you: “I think I posted 20 payments to the wrong account.”", options: [
                  { text: "“How did that happen? You know the SOP.”", correct: false, feedback: "It feels natural under pressure, but it teaches people to hide errors. Next time, you hear about it from QA or the client instead of from Carlo." },
                  { text: "“Fix it quietly before QA sees it.”", correct: false, feedback: "Hiding it from QA teaches the whole team that errors are to be concealed, and QA may need to check whether the same cause affects other accounts." },
                  { text: "“Thanks for flagging it fast. Let's fix it, then look at what tripped you up.”", correct: true, feedback: "Thanking him for speaking up makes early reporting the norm. Looking at the cause, not the person, is how you stop it happening again." } ] },
                { label: "A question", context: "In the huddle, Bea, two months in, asks why today's target is so high.", options: [
                  { text: "“Good question. What makes you ask?”", correct: true, feedback: "Inviting the question shows challenge is welcome. Bea explains that new agents don't know the payer shortcuts yet, which is useful for planning the day." },
                  { text: "“The target comes from the client, so it's not up for debate.”", correct: false, feedback: "Possibly true, but it closes the door. Hear her first, then explain the why." },
                  { text: "“Let's not get into that now.”", correct: false, feedback: "Shutting it down tells everyone questions are unwelcome. The concern doesn't disappear; it goes underground." } ] },
                { label: "A third ask", context: "Bea asks for help with the same denial type for the third time this week.", options: [
                  { text: "“I explained this yesterday.”", correct: false, feedback: "Next time she'll guess instead of asking, and errors go up." },
                  { text: "“Ask Priya. I'm busy.”", correct: false, feedback: "Pairing her with a peer can work, but this brush-off tells her that asking you is a bother." },
                  { text: "“Let's walk through it once more. Which part is tricky?”", correct: true, feedback: "Patience protects quality and makes asking normal. Finding the tricky part tells you whether she needs a job aid, a buddy, or practice." } ] },
                { label: "A miss", context: "The team misses its daily target.", options: [
                  { text: "“What got in our way today, and what do we change tomorrow?”", correct: true, feedback: "Focusing on the system gets honest answers and a real fix: the team tells you the new payer rule is slowing every claim." },
                  { text: "“Who dropped the ball?”", correct: false, feedback: "Blame makes people defend themselves instead of solving the problem, and the real cause stays hidden." } ] }
              ],
              key: [
                "Thank people for bad news. It's the only way you'll keep hearing it early.",
                "Questions are information, not insubordination. Ask what's behind them.",
                "Ask “what got in our way?” instead of “who?”. Systems cause most misses."
              ] },
            sup: { type: "sim", id: "tl1-sim", title: "Four moments at the service desk",
              setup: "Go-live week. The team is stretched, the list keeps changing, and every reaction you have is being watched.",
              steps: [
                { label: "An error", context: "Ramon messages you: “I think I gave 12 new hires the wrong access profile.”", options: [
                  { text: "“How did that happen? You know the process.”", correct: false, feedback: "It feels natural under pressure, but it teaches people to hide errors. Next time, you hear about it from Training or an angry Ops manager instead of from Ramon." },
                  { text: "“Fix it quietly before HR or Training notices.”", correct: false, feedback: "Hiding it teaches the team that errors are to be concealed, and the wrong profile could be an access-control issue that others need to know about." },
                  { text: "“Thanks for flagging it fast. Let's fix it, then look at what tripped you up.”", correct: true, feedback: "Thanking him for speaking up makes early reporting the norm. Looking at the cause, not the person, is how you stop it happening again." } ] },
                { label: "A question", context: "At stand-up, Lia, one month in, asks why the ticket SLA is so tight during go-live.", options: [
                  { text: "“Good question. What makes you ask?”", correct: true, feedback: "Inviting the question shows challenge is welcome. Lia explains that new-client tickets need extra checks she doesn't know yet, which is useful for planning the day." },
                  { text: "“The SLA is set by leadership, so it's not up for debate.”", correct: false, feedback: "Possibly true, but it closes the door. Hear her first, then explain the why." },
                  { text: "“Let's not get into that now.”", correct: false, feedback: "Shutting it down tells everyone questions are unwelcome. The concern doesn't disappear; it goes underground." } ] },
                { label: "A third ask", context: "Lia asks for help with the same access-profile setup for the third time this week.", options: [
                  { text: "“I explained this yesterday.”", correct: false, feedback: "Next time she'll guess instead of asking, and wrong profiles go up." },
                  { text: "“Ask Ana. I'm busy.”", correct: false, feedback: "Pairing her with a peer can work, but this brush-off tells her that asking you is a bother." },
                  { text: "“Let's walk through it once more. Which part is tricky?”", correct: true, feedback: "Patience protects quality and makes asking normal. Finding the tricky part tells you whether she needs a job aid, a buddy, or practice." } ] },
                { label: "A miss", context: "The team misses its daily ticket target.", options: [
                  { text: "“What got in our way today, and what do we change tomorrow?”", correct: true, feedback: "Focusing on the system gets honest answers and a real fix: the team tells you late list changes are forcing rework on finished tickets." },
                  { text: "“Who dropped the ball?”", correct: false, feedback: "Blame makes people defend themselves instead of solving the problem, and the real cause stays hidden." } ] }
              ],
              key: [
                "Thank people for bad news. It's the only way you'll keep hearing it early.",
                "Questions are information, not insubordination. Ask what's behind them.",
                "Ask “what got in our way?” instead of “who?”. Systems cause most misses."
              ] } })
        ]
      },
      {
        title: "Spot the safety killers",
        blocks: [
          { type: "p", html: "Most leaders don't shut people down on purpose. It happens in throwaway lines. Here's a message a TL sent this morning." },
          { type: "hotspot", id: "tl1-hunt", title: "Find the four lines that shut people down",
            prompt: "Select each sentence that would make people less likely to speak up, admit a mistake, or ask for help. Sentences that are fine will tell you so.",
            find: 4,
            doc: V({
              ops: { kind: "message", heading: "Team chat: morning huddle", segments: [
                { t: "Morning team. Month-end target is 4,200 claims and we're 1,200 behind.", fb: "Clear facts about the gap. People need to know where they stand." },
                { t: "I don't want to hear excuses today.", target: true, fb: "Labeling blockers as “excuses” in advance means people stay quiet about real problems, like the payer rule change." },
                { t: "Priya spotted a pattern in the payer rejections, so thank you, Priya.", fb: "Specific, public recognition. This builds safety." },
                { t: "If you're stuck, check the SOP before asking anyone.", target: true, fb: "Making help a last resort means people guess instead. Errors rise, and you hear about them from QA." },
                { t: "QA will be reviewing a sample of everyone's work this week.", fb: "A neutral fact. On its own, it's fine." },
                { t: "Whoever posted the wrong adjustment codes yesterday knows who they are.", target: true, fb: "Public, veiled blame. Next time, the person who makes an error will hide it instead of flagging it." },
                { t: "Breaks as usual.", fb: "Clear and fair." },
                { t: "Any questions? No? Great, let's go.", target: true, fb: "Asking for questions and moving on in two seconds signals you don't want any. Try “What am I missing?” and wait." } ] },
              sup: { kind: "message", heading: "Team chat: morning stand-up", segments: [
                { t: "Morning team. 80 new hires go live Monday, and 35 access requests are still open.", fb: "Clear facts about the gap. People need to know where they stand." },
                { t: "I don't want to hear excuses today.", target: true, fb: "Labeling blockers as “excuses” in advance means people stay quiet about real problems, like the late list changes." },
                { t: "Ana spotted the missing client ID pattern, so thank you, Ana.", fb: "Specific, public recognition. This builds safety." },
                { t: "If you're stuck, check the knowledge base before asking anyone.", target: true, fb: "Making help a last resort means people guess instead. Wrong profiles rise, and you hear about them from Training." },
                { t: "Training will test every account on Friday.", fb: "A neutral fact. On its own, it's fine." },
                { t: "Whoever closed tickets without testing yesterday knows who they are.", target: true, fb: "Public, veiled blame. Next time, the person who makes an error will hide it instead of flagging it." },
                { t: "Lunch as usual.", fb: "Clear and fair." },
                { t: "Any questions? No? Great, let's go.", target: true, fb: "Asking for questions and moving on in two seconds signals you don't want any. Try “What am I missing?” and wait." } ] } }),
            key: [
              "Safety is lost in small, offhand lines more often than in big moments.",
              "Pre-empting “excuses” and veiled blame both teach people to stay quiet.",
              "A real invitation to speak includes a pause long enough for someone to use it."
            ] },
          { type: "form", id: "tl1-habit", title: "Your collaboration habit",
            fields: [ { id: "habit", label: "One thing I'll say or do in my next huddle to make it safer to speak up", prompt: "For example: end every huddle with “What am I missing?” and wait five seconds." } ],
            saveLabel: "Save my habit" }
        ]
      }
    ]
  },

  /* ===================================================================== */
  {
    id: "tl2", part: "path", track: "tl", minutes: 14,
    title: "Manage conflict constructively",
    summary: "Choose the right response from five conflict modes, then use DIAL to have the conversation without avoiding it or escalating it.",
    screens: [
      {
        title: "Five ways to respond",
        blocks: [
          { type: "p", html: SH.modesIntro },
          { type: "flip", id: "tl2-modes", title: "The five conflict modes",
            cards: [
              { front: "Competing", sub: "Stand firm", back: V({ ops: "<strong>Use it for</strong> non-negotiables: compliance, client data, and safety.<br><br><strong>Example:</strong> an agent skips a compliance step to save time.<br><br><strong>Overused:</strong> people stop telling you things.", sup: "<strong>Use it for</strong> non-negotiables: access controls, privacy, and audit rules.<br><br><strong>Example:</strong> someone wants to skip an access approval to save time.<br><br><strong>Overused:</strong> people stop telling you things." }) },
              { front: "Collaborating", sub: "Solve it together", back: V({ ops: "<strong>Use it when</strong> both sides' needs matter and you have time to find a joint answer.<br><br><strong>Example:</strong> QA marks claims as errors you believe are correct.<br><br><strong>Overused:</strong> slow decisions on small things.", sup: "<strong>Use it when</strong> both sides' needs matter and you have time to find a joint answer.<br><br><strong>Example:</strong> HR and your team disagree on when the new-hire list is final.<br><br><strong>Overused:</strong> slow decisions on small things." }) },
              { front: "Compromising", sub: "Meet in the middle", back: "<strong>Use it for</strong> quick, fair fixes when time is short and the stakes are moderate.<br><br><strong>Example:</strong> two people want the same shift off.<br><br><strong>Overused:</strong> everyone ends up half-satisfied, every time." },
              { front: "Avoiding", sub: "Step back for now", back: "<strong>Use it for</strong> trivial issues, or when tempers are high and a pause will help.<br><br><strong>Example:</strong> two people snap at each other five minutes before shift end.<br><br><strong>Overused:</strong> real problems quietly grow." },
              { front: "Accommodating", sub: "Let them have it", back: "<strong>Use it when</strong> the issue matters more to them than to you, or to build goodwill.<br><br><strong>Example:</strong> a peer TL needs a favour that costs you little.<br><br><strong>Overused:</strong> your team pays for your goodwill." }
            ] }
        ]
      },
      {
        title: "Which mode fits?",
        blocks: [
          { type: "p", html: "Sort each situation into the mode that fits it best. Some situations have more than one good answer; any good fit counts." },
          { type: "bucket", id: "tl2-sort", title: "Match the mode to the moment",
            buckets: [ { id: "comp", label: "Competing" }, { id: "coll", label: "Collaborating" }, { id: "prom", label: "Compromising" }, { id: "avoi", label: "Avoiding" }, { id: "acco", label: "Accommodating" } ],
            items: V({
              ops: [
                { id: "a", text: "Carlo skips a compliance step on a claim “to save time.”", bucket: "comp" },
                { id: "b", text: "QA marks claims as errors that you believe are correct, and it's hurting your team's scores.", bucket: "coll" },
                { id: "c", text: "Two agents argue over a shift swap. It's small, but both are upset.", bucket: "prom" },
                { id: "d", text: "Two agents snap at each other over something trivial, five minutes before shift end.", bucket: "avoi" },
                { id: "e", text: "Asha wants to borrow two of your agents during your quiet afternoon.", bucket: ["acco", "coll"] },
                { id: "f", text: "Marco and Priya disagree on how to split the payer queue, and both have good reasons.", bucket: ["coll", "prom"] } ],
              sup: [
                { id: "a", text: "Ramon wants to grant access before the manager approves it “to save time.”", bucket: "comp" },
                { id: "b", text: "Training says your accounts fail testing; your team says Training's test scripts are wrong.", bucket: "coll" },
                { id: "c", text: "Two coordinators argue over who covers Saturday. It's small, but both are upset.", bucket: "prom" },
                { id: "d", text: "Two coordinators snap at each other over something trivial, five minutes before shift end.", bucket: "avoi" },
                { id: "e", text: "Kevin wants to borrow one of your people during your quiet afternoon.", bucket: ["acco", "coll"] },
                { id: "f", text: "Paolo and Ana disagree on how to batch the new-hire requests, and both have good reasons.", bucket: ["coll", "prom"] } ] }),
            key: [
              "Competing isn't rude when the issue is non-negotiable. Stand firm, and explain why.",
              "Collaborating is worth the time when both sides need the same answer to stick.",
              "Avoiding is a pause, not a decision. Come back to it when people are calm."
            ] }
        ]
      },
      {
        title: "DIAL: turning down the heat",
        blocks: [
          { type: "p", html: "When a conflict is worth addressing, use four steps in order. Attack the problem, not the person." },
          SH.dialConcepts,
          { type: "sequence", id: "tl2-dial", title: "Rearrange the conversation",
            prompt: V({ ops: "Marco, your ATL, has sent the shift report late three times this week, and you've had to chase it each time. Drag these four lines into DIAL order.", sup: "Paolo, your ATL, has sent the daily status report late three times this week, and you've had to chase it each time. Drag these four lines into DIAL order." }),
            items: V({
              ops: [
                { id: "d", text: "“Marco, the shift report came in after 10am on Monday, Wednesday, and Friday.”" },
                { id: "i", text: "“When it's late, our AM can't update the client's SLA tracker on time.”" },
                { id: "a", text: "“What's making it hard to send by 9am?”" },
                { id: "l", text: "“Let's agree what will help you send it by 9, and check in on Friday.”" } ],
              sup: [
                { id: "d", text: "“Paolo, the status report came in after 10am on Monday, Wednesday, and Friday.”" },
                { id: "i", text: "“When it's late, Rina can't confirm the new-hire list with Operations on time.”" },
                { id: "a", text: "“What's making it hard to send by 9am?”" },
                { id: "l", text: "“Let's agree what will help you send it by 9, and check in on Friday.”" } ] }),
            key: [
              "Describe with dates and facts. “Always” and “never” start arguments.",
              "Impact on the work or the client makes it a shared problem, not a personal one.",
              "Ask, then really listen: there may be a blocker you don't know about."
            ] }
        ]
      },
      {
        title: "Your turn",
        blocks: [
          { type: "p", html: "Rewrite each heated message using DIAL. Write your version first, then compare it with a model answer. There's more than one good way to say it." },
          { type: "rewrite", id: "tl2-rewrite", title: "Rewrite with DIAL",
            items: V({
              ops: [
                { original: "To Carlo: “You're always rushing, and your errors are making the whole team look bad.”", model: "“Carlo, QA flagged six posting errors in your queue this week, all on the same payer. They pushed our team score below target. What's happening with that payer's claims? Let's agree a fix and look at Friday's numbers together.”", why: "Facts instead of “always,” impact on the team's work, a real question, and a shared next step with a date." },
                { original: "To Asha, in chat: “Your team keeps dumping leftover claims on us at end of shift. It's not fair.”", model: "“Asha, on Tuesday and Thursday about 60 claims came to our queue after 9pm, and my night shift couldn't finish its own work. What's driving the late handoffs? Could we agree a cut-off time and review it next week?”", why: "Specific days and volume, impact on your team, curiosity about her side, and a proposal you can both test." } ],
              sup: [
                { original: "To Ramon: “You keep rushing tickets, and it makes the whole team look bad.”", model: "“Ramon, four access tickets you closed this week had the wrong profile, all for the new client. Training had to pause sessions while we fixed them. What's happening with those tickets? Let's agree a quick check and look at next week's numbers together.”", why: "Facts instead of “keep,” impact on Training and new hires, a real question, and a shared next step." },
                { original: "To Rina, in chat: “Your team keeps sending us new-hire lists at the last minute. It's not fair.”", model: "“Rina, the last two new-hire lists reached us on Friday after 3pm, with 12 changes. That left a few hours to set up 80 accounts. What's making the list late on your side? Could we agree a Wednesday cut-off and review it after this wave?”", why: "Specific timing and volume, impact on the go-live, curiosity about HR's pressures, and a proposal you can both test." } ] }) },
          { type: "form", id: "tl2-own", title: "A real conflict",
            fields: [
              { id: "who", label: "A conflict I'll DIAL instead of avoiding", prompt: "Who, and about what? Initials are fine." },
              { id: "open", label: "My Describe and Impact lines", prompt: "Facts with dates, then the effect on the work." }
            ], saveLabel: "Save my plan" }
        ]
      }
    ]
  },

  /* ===================================================================== */
  {
    id: "tl3", part: "path", track: "tl", minutes: 9,
    title: "Support colleagues to reach shared goals",
    summary: "Move your team from “my numbers” to “our numbers”: ask early, offer specifically, and follow through.",
    screens: [
      {
        title: "From my numbers to our numbers",
        blocks: [
          { type: "p", html: V({ ops: "In our teams, one person's backlog becomes everyone's SLA problem. The best TLs make helping normal and asking for help easy.", sup: "In support teams, one person's backlog becomes an Operations problem by Monday. The best TLs make helping normal and asking for help easy." }) },
          { type: "compare", cols: [
            { title: "A “my numbers” team", items: V({ ops: ["“I hit my target, so it's not my problem.”", "Shortcuts and know-how kept to yourself", "People help only when the TL asks"], sup: ["“My tickets are closed, so it's not my problem.”", "Templates and fixes kept to yourself", "People help only when the TL asks"] }) },
            { title: "An “our numbers” team", items: V({ ops: ["“We hit target when everyone does.”", "Faster agents coach and help slower ones", "People offer before being asked"], sup: ["“We go live when every account is ready.”", "Templates and fixes shared the same day", "People offer before being asked"] }) } ] },
          { type: "p", html: "<strong>The helping habit</strong>" },
          SH.helpingConcepts
        ]
      },
      {
        title: "Connect the dots",
        blocks: [
          { type: "match", id: "tl3-match", title: "Match each situation to the most helpful move",
            prompt: "Select a situation on the left, then the move on the right that helps most. A line connects each pair.",
            left: V({
              ops: [ { id: "l1", text: "Asha's team is behind on month-end." }, { id: "l2", text: "Bea is struggling with a new payer's denial codes." }, { id: "l3", text: "Your team will miss target unless something changes by noon." }, { id: "l4", text: "Carlo found a faster way to work rejections." } ],
              sup: [ { id: "l1", text: "Kevin's team is short-staffed for go-live testing." }, { id: "l2", text: "Lia is struggling with the new client's access profiles." }, { id: "l3", text: "Your team will miss Monday unless something changes by Friday noon." }, { id: "l4", text: "Ramon built a template that halves setup time." } ] }),
            right: V({
              ops: [ { id: "r1", text: "“I can take 30 claims from your queue between 2 and 4pm.”" }, { id: "r2", text: "Pair her with Priya for 20 minutes on three real claims." }, { id: "r3", text: "Message your AM and Asha now, with the gap and a specific ask." }, { id: "r4", text: "Ask him to demo it in tomorrow's huddle, and credit him by name." } ],
              sup: [ { id: "r1", text: "“I can test 15 accounts for you between 2 and 4pm.”" }, { id: "r2", text: "Pair her with Ana for 20 minutes on three real tickets." }, { id: "r3", text: "Message your Manager and Kevin now, with the gap and a specific ask." }, { id: "r4", text: "Ask him to demo it at tomorrow's stand-up, and credit him by name." } ] }),
            pairs: { l1: "r1", l2: "r2", l3: "r3", l4: "r4" },
            key: [
              "Specific offers name what, how much, and when. That's why they get accepted.",
              "Asking early, with a clear gap and a clear ask, is a leadership skill.",
              "Sharing a good idea, with credit, multiplies it across the team."
            ] },
          { type: "form", id: "tl3-ask", title: "Your ask and your offer",
            fields: [
              { id: "ask", label: "Something I need help with this month", prompt: V({ ops: "For example: ideas to get my team using the dashboard in huddles.", sup: "For example: a faster way to handle last-minute list changes." }) },
              { id: "who", label: "Who I'll ask, and when" },
              { id: "offer", label: "A specific offer I'll make to someone", prompt: V({ ops: "For example: my SME can do a 15-minute portal demo for Asha's team on Thursday.", sup: "For example: Ana can show Kevin's team our access checklist on Thursday." }) }
            ], saveLabel: "Save my ask and offer" }
        ]
      }
    ]
  },

  /* ===================================================================== */
  {
    id: "tl4", part: "path", track: "tl", minutes: 13,
    title: "Build networks",
    summary: "Strengthen the three networks every leader needs, find your gap, and recap all four skills in a crossword.",
    screens: [
      {
        title: "Three networks every leader needs",
        blocks: [
          { type: "p", html: "No team succeeds alone. Research on leadership networks by Herminia Ibarra describes three kinds every leader needs. Most new leaders have a strong operational network and weak developmental and strategic ones." },
          { type: "concepts", items: V({
            ops: [
              { title: "Operational", tag: "Who helps me get today's work done?", text: "QA, MIS, Trainers, WFM, peer TLs, and ATLs." },
              { title: "Developmental", tag: "Who helps me grow?", text: "Your mentor, your AM, a TL you admire." },
              { title: "Strategic", tag: "Who helps me see what's coming?", text: "AMs in other processes, the Solutions team, client-facing leads." } ],
            sup: [
              { title: "Operational", tag: "Who helps me get today's work done?", text: "HR onboarding, Training, WFM, Operations TLs, peer TLs in Shared Services." },
              { title: "Developmental", tag: "Who helps me grow?", text: "Your mentor, your Manager, a leader in another function you admire." },
              { title: "Strategic", tag: "Who helps me see what's coming?", text: "Operations managers, the Solutions team, people who hear about new clients first." } ] }) },
          { type: "callout", tone: "rule", title: "Give before you ask", html: "Networks are two-way. Share knowledge, credit others, offer help. The best time to build a relationship is before you need it." },
          { type: "bucket", id: "tl4-sort", title: "Which network?",
            prompt: "Sort each person into the network they mainly belong to.",
            buckets: [ { id: "op", label: "Operational" }, { id: "dev", label: "Developmental" }, { id: "str", label: "Strategic" } ],
            items: V({
              ops: [
                { id: "a", text: "The MIS analyst who builds your daily report", bucket: "op" },
                { id: "b", text: "A senior TL who mentors you monthly", bucket: "dev" },
                { id: "c", text: "An AM who hears about new clients early", bucket: "str" },
                { id: "d", text: "Joy, your QA analyst", bucket: "op" },
                { id: "e", text: "A leader in another tower whose style you admire", bucket: "dev" },
                { id: "f", text: "Someone in Solutions working on automation", bucket: "str" } ],
              sup: [
                { id: "a", text: "Rina, your HR onboarding contact", bucket: "op" },
                { id: "b", text: "A senior TL who mentors you monthly", bucket: "dev" },
                { id: "c", text: "An Operations manager who hears about new clients early", bucket: "str" },
                { id: "d", text: "The WFM analyst who sends start dates", bucket: "op" },
                { id: "e", text: "A leader in another function whose style you admire", bucket: "dev" },
                { id: "f", text: "Someone in Solutions working on automation", bucket: "str" } ] }) }
        ]
      },
      {
        title: "Map your network",
        blocks: [
          { type: "netmap", id: "tl4-net", title: "My network map",
            prompt: "List the people in each network, one per line. Names or roles are fine. Then find your gap and pick one person to connect with this week.",
            networks: V({
              ops: [ { id: "op", name: "Operational", q: "Who helps me get today's work done?", who: "QA, MIS, Trainers, WFM, peer TLs." },
                { id: "dev", name: "Developmental", q: "Who helps me grow?", who: "a mentor, your AM, a TL you admire." },
                { id: "str", name: "Strategic", q: "Who helps me see what's coming?", who: "AMs in other processes, Solutions, client-facing leads." } ],
              sup: [ { id: "op", name: "Operational", q: "Who helps me get today's work done?", who: "HR, Training, WFM, Operations TLs." },
                { id: "dev", name: "Developmental", q: "Who helps me grow?", who: "a mentor, your Manager, a leader you admire." },
                { id: "str", name: "Strategic", q: "Who helps me see what's coming?", who: "Operations managers, Solutions, new-client teams." } ] }),
            key: [
              "Your network is your team's extended capability.",
              "Developmental and strategic contacts rarely appear by accident. Schedule them.",
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
    id: "tl5", part: "path", track: "tl", minutes: 15, capstone: true,
    title: "Bringing it together",
    summary: "Lead your team through the crunch, test your recall in a quiz game, find the missing piece, and build your action plan.",
    screens: [
      {
        title: V({ ops: "Month-end crunch", sup: "Go-live countdown" }),
        blocks: [
          { type: "p", html: "Everything you've practiced comes together in one huddle. Make a choice at each moment and see how it lands with the people in the room." },
          V({
            ops: { type: "sim", id: "tl5-sim", title: "The month-end huddle",
              setup: "Two days to month-end, and your team is 1,200 claims behind. QA has flagged an error spike and wants a recalibration today. Carlo says he's doing more than everyone else and is fed up. Asha's team is ahead of target. Your goal: a plan that hits month-end without burning out the team. You call a quick huddle with everyone involved.",
              steps: [
                { label: "Open", context: "Everyone's waiting. What do you say first?", options: [
                  { text: "“We're 1,200 behind. Everyone pushes harder today, no breaks.”", correct: false, feedback: "Pressure without input. People nod, and nobody raises what's actually in the way." },
                  { text: "“We're 1,200 behind with two days to go. I need everyone's ideas. What's getting in our way?”", correct: true, feedback: "You framed the problem and invited input. People start sharing real blockers, starting with the payer rule change." },
                  { text: "“Joy, can we skip calibration so we can focus on volume?”", correct: false, feedback: "You jumped to a solution and put QA on the defensive before hearing anyone." } ] },
                { label: "Carlo", context: "Carlo says: “I'm doing more than everyone, and nobody notices.”", options: [
                  { text: "“Let's not make this about you right now.”", correct: false, feedback: "He goes quiet, and his effort drops for the rest of the week." },
                  { text: "“Everyone's busy. We all have to manage.”", correct: false, feedback: "True, but dismissive. He feels unseen." },
                  { text: "“You've been carrying a lot, and I see it. What would make the workload feel fairer?”", correct: true, feedback: "Acknowledging him and asking turns a complaint into an idea: he suggests splitting the hardest payer's claims across the whole team." } ] },
                { label: "QA", context: "Joy insists on recalibration today.", options: [
                  { text: "“Could we do a focused 20-minute calibration on the top two error types right now?”", correct: true, feedback: "A collaborative middle ground: QA gets the fix at the source, and you protect capacity." },
                  { text: "“Volume comes first. We'll do it after month-end.”", correct: false, feedback: "Competing here risks errors reaching the client, and damages trust with QA." },
                  { text: "“Fine, let's do the full two-hour session.”", correct: false, feedback: "Accommodating builds goodwill with QA but costs the backlog. There's a better option that works for both." } ] },
                { label: "Asha", context: "Asha offers three agents if your SME helps her team next week.", options: [
                  { text: "“Thanks, but we'll manage ourselves.”", correct: false, feedback: "Pride over the goal. You turned down help that was right there." },
                  { text: "“Great, send whoever's free.”", correct: false, feedback: "Accepting is right, but vague terms lead to confusion later." },
                  { text: "“Yes. Can your three take the payer A queue from 2 to 6pm? My SME will block Tuesday morning for your team.”", correct: true, feedback: "A specific ask and a specific offer. Your network just added capacity." } ] },
                { label: "Close", context: "How do you close the huddle?", options: [
                  { text: "“Okay, let's get going.”", correct: false, feedback: "People leave unsure of the plan, and nobody feels thanked." },
                  { text: "Recap the plan and owners, then thank each person for what they brought: Carlo's idea, Joy's flexibility, Asha's help.", correct: true, feedback: "Everyone leaves knowing the plan, and knowing their contribution mattered." },
                  { text: "“I'll email the plan later.”", correct: false, feedback: "The plan arrives, but the moment to recognize people has passed." } ] }
              ],
              key: [
                "No single person could have solved this. The plan came from everyone, including the person who was frustrated.",
                "You used every skill: safety to open, curiosity to defuse, collaborating with QA, and a specific ask to your network.",
                "Closing with specific thanks is what makes people bring their best next time."
              ] },
            sup: { type: "sim", id: "tl5-sim", title: "The go-live stand-up",
              setup: "Two days to go-live, and 35 of 80 access requests are still open. HR's list just changed again: nine new names, four removed. Training needs every account tested by Friday noon. Ramon says he's doing more than everyone else and is fed up. Kevin's team finished its prep early. Your goal: every new hire ready for Monday, without burning out the team. You call a quick stand-up with Ramon, Ana, Rina from HR, and Kevin.",
              steps: [
                { label: "Open", context: "Everyone's waiting. What do you say first?", options: [
                  { text: "“We have 35 open requests and two days. I need everyone's ideas. What's getting in our way?”", correct: true, feedback: "You framed the problem and invited input. People start sharing real blockers, starting with the late list changes." },
                  { text: "“We're 35 behind. Everyone pushes, no breaks until it's done.”", correct: false, feedback: "Pressure without input. People nod, and nobody raises what's actually in the way." },
                  { text: "“Rina, can HR please stop changing the list so we can catch up?”", correct: false, feedback: "You jumped to blame before hearing anyone, and put HR on the defensive." } ] },
                { label: "Ramon", context: "Ramon says: “I'm doing more than everyone, and nobody notices.”", options: [
                  { text: "“Everyone's busy. We all have to manage.”", correct: false, feedback: "True, but dismissive. He feels unseen." },
                  { text: "“You've been carrying a lot, and I see it. What would make the workload feel fairer?”", correct: true, feedback: "Acknowledging him and asking turns a complaint into an idea: he suggests batching requests by access profile so everyone works one type at a time." },
                  { text: "“Let's not make this about you right now.”", correct: false, feedback: "He goes quiet, and his effort drops for the rest of the week." } ] },
                { label: "HR", context: "Rina says: “Operations keeps sending me changes. I can't freeze the list.”", options: [
                  { text: "“Then we can't promise Monday.”", correct: false, feedback: "Competing here pushes the problem back to HR, and the new hires lose either way." },
                  { text: "“Fine, send changes whenever. We'll cope.”", correct: false, feedback: "Accommodating builds goodwill with HR, but your team pays with rework all weekend. There's a better option." },
                  { text: "“Could we agree one daily cut-off, say 2pm, with anything later going into a Tuesday batch?”", correct: true, feedback: "A collaborative fix: HR keeps flexibility, and your team gets a stable list to work from." } ] },
                { label: "Kevin", context: "Kevin offers two testers if your team sets up access for his trainers next week.", options: [
                  { text: "“Yes. Can your two test the 40 accounts in batch A from 2 to 6pm? Ana will set up your trainers' access on Tuesday morning.”", correct: true, feedback: "A specific ask and a specific offer. Your network just added capacity." },
                  { text: "“Thanks, but we'll manage ourselves.”", correct: false, feedback: "Pride over the goal. You turned down help that was right there." },
                  { text: "“Great, send whoever's free.”", correct: false, feedback: "Accepting is right, but vague terms lead to confusion later." } ] },
                { label: "Close", context: "How do you close the stand-up?", options: [
                  { text: "“I'll email the plan later.”", correct: false, feedback: "The plan arrives, but the moment to recognize people has passed." },
                  { text: "“Okay, let's get going.”", correct: false, feedback: "People leave unsure of the plan, and nobody feels thanked." },
                  { text: "Recap the plan and owners, then thank each person for what they brought: Ramon's batching idea, Rina's cut-off, Kevin's testers.", correct: true, feedback: "Everyone leaves knowing the plan, and knowing their contribution mattered." } ] }
              ],
              key: [
                "No single person could have solved this. The plan came from everyone, including the person who was frustrated.",
                "You used every skill: safety to open, curiosity to defuse, collaborating with HR, and a specific ask to your network.",
                "Closing with specific thanks is what makes people bring their best next time."
              ] } })
        ]
      },
      {
        title: "Review game",
        blocks: [
          { type: "p", html: "Pick any tile. Higher values are harder. Clear the board to finish; there's no penalty for a wrong answer." },
          { type: "jeopardy", id: "tl5-game", title: "Collaboration quiz board",
            cats: [
              { name: "Safe to speak", clues: [
                { v: 100, q: "Which response makes it most likely people will report their errors early?", options: ["“How did that happen?”", "“Thanks for flagging it. Let's fix it together.”", "“Make sure it doesn't happen again.”"], answer: 1, explain: "Thanking people for bad news is how you keep hearing it early." },
                { v: 200, q: "Google's Project Aristotle found which factor mattered most in high-performing teams?", options: ["Individual talent", "Psychological safety", "Clear job descriptions"], answer: 1, explain: "How safe people felt mattered more than who was on the team." },
                { v: 300, q: "You ask “Any questions?” and nobody answers. What's the best next move?", options: ["Move on; silence means agreement", "Call on the newest person", "Ask “What am I missing?” and wait a few seconds"], answer: 2, explain: "Silence is usually people deciding whether it's safe. A real question plus a real pause helps them decide." } ] },
              { name: "Conflict", clues: [
                { v: 100, q: V({ ops: "An agent skips a compliance step to save time. Which mode fits?", sup: "Someone grants access before approval to save time. Which mode fits?" }), options: ["Compromising", "Competing", "Accommodating"], answer: 1, explain: "Non-negotiables call for standing firm, and explaining why." },
                { v: 200, q: "In DIAL, what does the A stand for?", options: ["Agree", "Assess the risk", "Ask for their view"], answer: 2, explain: "Ask, then listen. It's the step most people skip." },
                { v: 300, q: "Two people snap at each other over something trivial five minutes before shift end. Which mode fits?", options: ["Avoiding for now, then check in tomorrow", "Competing", "Collaborating right now"], answer: 0, explain: "Avoiding is a pause, not a decision. Come back when people are calm." } ] },
              { name: "Helping", clues: [
                { v: 100, q: "Which offer is most likely to be accepted?", options: ["“Let me know if you need anything.”", V({ ops: "“I can take 30 claims from your queue this afternoon.”", sup: "“I can test 15 accounts for you this afternoon.”" }), "“I'm always happy to help.”"], answer: 1, explain: "Specific offers name what, how much, and when." },
                { v: 200, q: "When is the best time to ask for help with a growing backlog?", options: ["When it first starts building", "Only when you'll miss the deadline", "Afterwards, to avoid bothering anyone"], answer: 0, explain: "Asking early is cheap. Asking at the deadline is expensive for everyone." },
                { v: 300, q: "The helping habit is ask early, offer specifically, and…", options: ["escalate quickly", "follow through and close the loop", "keep track of who owes you"], answer: 1, explain: "Following through is what makes your next offer believable." } ] },
              { name: "Networks", clues: [
                { v: 100, q: "Which network helps you see what's coming?", options: ["Operational", "Developmental", "Strategic"], answer: 2, explain: "Strategic contacts help you see beyond today's work." },
                { v: 200, q: "Your mentor belongs mainly in which network?", options: ["Developmental", "Operational", "Strategic"], answer: 0, explain: "Developmental contacts help you grow as a leader." },
                { v: 300, q: "What's the best way to start a new relationship in your network?", options: ["Ask for a favour", "Wait until you need them", "Offer something first: knowledge, credit, or help"], answer: 2, explain: "Give before you ask. It makes the first conversation easy." } ] }
            ] }
        ]
      },
      {
        title: "The missing piece",
        blocks: [
          { type: "puzzle", caption: "A team with a piece missing isn't complete." },
          { type: "p", html: "Remember the missing line at the start? The story jumped from problem to solution because someone's contribution was gone." },
          { type: "p", html: V({ ops: "Think about the huddle you just led: the plan only came together because each person brought something. Your team needs your style, your know-how, and your voice in the huddle. When you hold back, the team is incomplete.", sup: "Think about the stand-up you just led: the plan only came together because each person brought something. Your team needs your style, your know-how, and your voice at stand-up. When you hold back, the team is incomplete." }) },
          { type: "p", html: "<strong>That piece is you. And the people around you need to hear that they matter too.</strong>" },
          { type: "appreciate", id: "tl5-appr", title: "Say it to someone",
            prompt: "Write a short message to one person on your real team. Then send it today, in your own words.",
            label: "Your message, for example: “[Name], the team is better because you…”" }
        ]
      },
      {
        title: "My action plan",
        blocks: [
          { type: "p", html: "Here's everything you committed to in this course. Add the last details and save. You'll get it as part of your PDF at the end; share it with your mentor or manager this week." },
          { type: "plan", id: "tl5-plan", title: "My collaboration action plan",
            rows: [
              { label: "My team-player style", ref: "f2-style" },
              { label: "What my team misses when I'm not there", ref: "f2-reflect", field: "miss" },
              { label: "How I'll avoid overusing my style", ref: "f2-reflect", field: "overuse" },
              { label: "My collaboration habit", ref: "tl1-habit", field: "habit" },
              { label: "A conflict I'll DIAL", ref: "tl2-own", field: "who" },
              { label: "My ask", ref: "tl3-ask", field: "ask" },
              { label: "My offer", ref: "tl3-ask", field: "offer" },
              { label: "My thinnest network", ref: "tl4-net", field: "weakest" },
              { label: "The person I'll connect with", ref: "tl4-net" },
              { label: "My appreciation message", ref: "tl5-appr" }
            ],
            fields: [
              { id: "share", label: "Who I'll share this plan with, and when", prompt: "Your mentor, your manager, or a peer TL." },
              { id: "more", label: "Anything else I'll do (optional)", optional: true }
            ] }
        ]
      }
    ]
  });
})();
