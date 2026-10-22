/* =========================================================================
   MANAGER CASE STUDIES (AMs and Managers only)
   Each option has a score: 2 = strongest call, 1 = defensible with a cost,
   0 = weak. Options are shuffled for every learner. Keep option lengths
   similar, and make sure the strongest call is not always the longest.
   ========================================================================= */
(function () {
  const V = window.CV;
  window.CT_CASES = {

  /* Part 1, module 1 ---------------------------------------------------- */
  signal: V({
    ops: { type: "case", id: "f1-case", title: "The signal nobody shared", only: "mgr",
      brief: "<p>Six weeks ago, one payer changed its remittance format. Every team saw part of the problem. Nobody saw all of it until the client escalated. Read the timeline, then make three calls.</p>",
      exhibits: [ { kind: "timeline", title: "What each team saw", items: [
        { when: "Week 2", text: "Leo's Posting team notices unmatched payments rising. He raises it in his own huddle and asks agents to work them manually." },
        { when: "Week 3", text: "Nisha's AR team sees aging creep up and puts it down to a payer slowdown." },
        { when: "Week 4", text: "Mara's Quality team notes the format change in its monthly report, page 6." },
        { when: "Week 5", text: "Unapplied cash passes $1.5M. Each team is working harder on its own piece." },
        { when: "Week 6", text: "The client escalates. Each team presents a different explanation." } ] } ],
      questions: [
        { q: "Where did collaboration break down first?", options: [
          { t: "Week 2: the signal stayed inside one team", score: 2, fb: "This is the first moment a cross-team share would have changed everything. Leo acted responsibly, but only within his walls." },
          { t: "Week 3: AR misread the trend on its own", score: 1, fb: "A real miss, but an understandable one. Without Posting's data, a payer slowdown was a reasonable guess. It's a symptom of week 2." },
          { t: "Week 4: Quality buried an urgent risk", score: 1, fb: "A monthly report is the wrong channel for an urgent risk, but the signal already existed two weeks earlier." },
          { t: "Week 6: the client got there before us", score: 0, fb: "That's the consequence, not the breakdown. Fixing escalation handling won't stop the next one." } ] },
        { q: "As Posting's manager, what's the most useful thing you do this week?", options: [
          { t: "Ask your TLs to escalate any unusual trend straight to you", score: 1, fb: "Faster, but still vertical. Signals reach you, not AR or Quality, and you become the bottleneck." },
          { t: "Start a 15-minute weekly signal check with AR and Quality", score: 2, fb: "Puts the three partial views in one room every week. Cheap, regular, and it would have caught this in week 2." },
          { t: "Send the client a root-cause summary before AR agrees it", score: 0, fb: "Quick, but it fixes the story in Posting's favour and tells Nisha you'll go around her." },
          { t: "Ask Quality to send urgent format changes the same day", score: 1, fb: "Helps one channel. The bigger gap is that teams don't compare what they're seeing." } ] },
        { q: "Which measure tells you the fix is working?", options: [
          { t: "Unapplied cash back under $1M", score: 1, fb: "The outcome you want, but it lags. It won't tell you whether the next signal is travelling faster." },
          { t: "Days from first signal to a joint discussion", score: 2, fb: "Measures the collaboration itself. If this drops, the next problem gets caught while it's small." },
          { t: "Number of escalations reaching you each week", score: 0, fb: "Rising escalations could mean better sharing or more problems. It measures traffic to you, not across teams." },
          { t: "Attendance at the new weekly signal check", score: 0, fb: "Turning up isn't the same as sharing. Teams can attend and still hold back what they see." } ] }
      ],
      key: [
        "Collaboration usually fails quietly, when each team acts sensibly inside its own walls.",
        "The fix is a shared routine where partial views meet, not a faster route up to you.",
        "Measure how fast signals travel across teams, not just the final outcome."
      ] },
    sup: { type: "case", id: "f1-case", title: "The signal nobody shared", only: "mgr",
      brief: "<p>Over six weeks, Operations kept moving new hires' start dates at short notice. Every support team saw part of the problem. Nobody saw all of it until the Operations Director escalated. Read the timeline, then make three calls.</p>",
      exhibits: [ { kind: "timeline", title: "What each team saw", items: [
        { when: "Week 2", text: "Chris's access team notices rework rising on new-hire accounts. He raises it in his own stand-up and asks the team to recheck dates." },
        { when: "Week 3", text: "Carmela's HR onboarding team sees more list corrections and puts it down to one demanding client." },
        { when: "Week 4", text: "Paul's Training team notes the date changes in its monthly report, page 6." },
        { when: "Week 5", text: "Day-one readiness falls to 61%. Each team is working harder on its own piece." },
        { when: "Week 6", text: "The Operations Director escalates. Each team presents a different explanation." } ] } ],
      questions: [
        { q: "Where did collaboration break down first?", options: [
          { t: "Week 2: the signal stayed inside one team", score: 2, fb: "This is the first moment a cross-team share would have changed everything. Chris acted responsibly, but only within his walls." },
          { t: "Week 3: HR misread the trend on its own", score: 1, fb: "A real miss, but an understandable one. Without IT's rework data, a demanding client was a reasonable guess. It's a symptom of week 2." },
          { t: "Week 4: Training buried an urgent risk", score: 1, fb: "A monthly report is the wrong channel for an urgent risk, but the signal already existed two weeks earlier." },
          { t: "Week 6: Operations got there before us", score: 0, fb: "That's the consequence, not the breakdown. Fixing escalation handling won't stop the next one." } ] },
        { q: "As the IT Service Desk manager, what's the most useful thing you do this week?", options: [
          { t: "Ask your TLs to escalate any unusual trend straight to you", score: 1, fb: "Faster, but still vertical. Signals reach you, not HR or Training, and you become the bottleneck." },
          { t: "Start a 15-minute weekly signal check with HR and Training", score: 2, fb: "Puts the three partial views in one room every week. Cheap, regular, and it would have caught this in week 2." },
          { t: "Send Operations a root-cause summary before HR agrees it", score: 0, fb: "Quick, but it fixes the story in IT's favour and tells Carmela you'll go around her." },
          { t: "Ask Training to send urgent date issues the same day", score: 1, fb: "Helps one channel. The bigger gap is that teams don't compare what they're seeing." } ] },
        { q: "Which measure tells you the fix is working?", options: [
          { t: "Day-one readiness back above 90%", score: 1, fb: "The outcome you want, but it lags. It won't tell you whether the next signal is travelling faster." },
          { t: "Days from first signal to a joint discussion", score: 2, fb: "Measures the collaboration itself. If this drops, the next problem gets caught while it's small." },
          { t: "Number of escalations reaching you each week", score: 0, fb: "Rising escalations could mean better sharing or more problems. It measures traffic to you, not across teams." },
          { t: "Attendance at the new weekly signal check", score: 0, fb: "Turning up isn't the same as sharing. Teams can attend and still hold back what they see." } ] }
      ],
      key: [
        "Collaboration usually fails quietly, when each team acts sensibly inside its own walls.",
        "The fix is a shared routine where partial views meet, not a faster route up to you.",
        "Measure how fast signals travel across teams, not just the final outcome."
      ] } }),

  /* Part 1, module 2 ---------------------------------------------------- */
  taskforce: V({
    ops: { type: "case", id: "f2-case", title: "Staff the task force", only: "mgr",
      brief: "<p>You're setting up a six-week task force to fix the handoff between Posting and AR. You can choose four people. Use what you now know about team-player styles.</p>",
      exhibits: [ { kind: "table", title: "Candidates", head: ["Person", "Role", "Style", "What you know"], rows: [
        ["Leo", "TL, Posting", "Contributor", "Knows every payer's quirks; your strongest operator"],
        ["Ken", "MIS analyst", "Contributor", "Fast, accurate data; quiet in meetings"],
        ["Arun", "TL, AR", "Collaborator", "Keeps meetings on target; pitches in anywhere"],
        ["Sofia", "Trainer", "Communicator", "Trusted by agents in both teams"],
        ["Mara", "Quality lead", "Challenger", "Flagged the root cause first; direct in email"],
        ["Dana", "Your newest TL", "Challenger", "Sharp questions; hesitant to bring bad news"] ] } ],
      questions: [
        { q: "Which four do you choose?", options: [
          { t: "Leo, Ken, Arun, and Sofia", score: 1, fb: "Strong delivery and good relationships, but nobody whose job is to pressure-test the plan. Risks get found late." },
          { t: "Leo, Mara, Arun, and Sofia", score: 2, fb: "Every style is covered: payer expertise, a goal-keeper, frontline trust, and the person who found the root cause." },
          { t: "Leo, Ken, Mara, and Dana", score: 0, fb: "Plenty of expertise and challenge, but nobody to keep it moving or bring the agents along. Expect sharp debates and slow progress." },
          { t: "Ken, Arun, Mara, and Dana", score: 1, fb: "Balanced on paper, but you've dropped your deepest payer knowledge and the person agents trust." } ] },
        { q: "In week one, Mara's challenges are landing as criticism and Arun is frustrated. What do you do?", options: [
          { t: "Ask Mara to bring her concerns to you privately first", score: 0, fb: "Takes the challenge out of the room and makes you the filter. The team loses the thing you picked her for." },
          { t: "Agree a team norm: raise a concern with a proposed fix", score: 2, fb: "Keeps the challenge, changes how it lands. It also gives Arun a way to respond that isn't personal." },
          { t: "Remind Arun that some tension is normal in new teams", score: 1, fb: "True, and worth saying, but nothing changes for Mara or Arun next week." },
          { t: "Have Sofia facilitate the next two working sessions", score: 1, fb: "Likely to soften the tone, but it treats the symptom. The team still has no shared way to disagree." } ] }
      ],
      key: [
        "Pick for balance, not just talent. A team of your four strongest performers often has a blind spot.",
        "Challengers are valuable precisely because they're uncomfortable. Shape how they challenge; don't remove it.",
        "Simple team norms do more than personal coaching to make different styles work together."
      ] },
    sup: { type: "case", id: "f2-case", title: "Staff the task force", only: "mgr",
      brief: "<p>You're setting up a six-week task force to fix the handoff between HR, IT, and Training for new hires. You can choose four people. Use what you now know about team-player styles.</p>",
      exhibits: [ { kind: "table", title: "Candidates", head: ["Person", "Role", "Style", "What you know"], rows: [
        ["Chris", "TL, Access", "Contributor", "Knows every access profile; your strongest operator"],
        ["Ken", "WFM analyst", "Contributor", "Fast, accurate data; quiet in meetings"],
        ["Rhea", "TL, HR onboarding", "Collaborator", "Keeps meetings on target; pitches in anywhere"],
        ["Sofia", "Ops trainer", "Communicator", "Trusted by new hires and Ops TLs"],
        ["Paul", "Training Manager", "Challenger", "Flagged the root cause first; direct in email"],
        ["Dana", "Your newest TL", "Challenger", "Sharp questions; hesitant to bring bad news"] ] } ],
      questions: [
        { q: "Which four do you choose?", options: [
          { t: "Chris, Ken, Rhea, and Sofia", score: 1, fb: "Strong delivery and good relationships, but nobody whose job is to pressure-test the plan. Risks get found late." },
          { t: "Chris, Paul, Rhea, and Sofia", score: 2, fb: "Every style is covered: access expertise, a goal-keeper, frontline trust, and the person who found the root cause." },
          { t: "Chris, Ken, Paul, and Dana", score: 0, fb: "Plenty of expertise and challenge, but nobody to keep it moving or bring Operations along. Expect sharp debates and slow progress." },
          { t: "Ken, Rhea, Paul, and Dana", score: 1, fb: "Balanced on paper, but you've dropped your deepest access knowledge and the person new hires trust." } ] },
        { q: "In week one, Paul's challenges are landing as criticism and Rhea is frustrated. What do you do?", options: [
          { t: "Ask Paul to bring his concerns to you privately first", score: 0, fb: "Takes the challenge out of the room and makes you the filter. The team loses the thing you picked him for." },
          { t: "Agree a team norm: raise a concern with a proposed fix", score: 2, fb: "Keeps the challenge, changes how it lands. It also gives Rhea a way to respond that isn't personal." },
          { t: "Remind Rhea that some tension is normal in new teams", score: 1, fb: "True, and worth saying, but nothing changes for Paul or Rhea next week." },
          { t: "Have Sofia facilitate the next two working sessions", score: 1, fb: "Likely to soften the tone, but it treats the symptom. The team still has no shared way to disagree." } ] }
      ],
      key: [
        "Pick for balance, not just talent. A team of your four strongest performers often has a blind spot.",
        "Challengers are valuable precisely because they're uncomfortable. Shape how they challenge; don't remove it.",
        "Simple team norms do more than personal coaching to make different styles work together."
      ] } }),

  /* Conflict module ----------------------------------------------------- */
  afternoon: V({
    ops: { type: "case", id: "mg2-case", title: "Three conflicts, one afternoon",
      brief: "<p>It's a Tuesday in month-end week. Three conflicts land on your desk in one afternoon. For each, choose the mode and the move.</p>",
      questions: [
        { q: "<strong>2:00pm.</strong> A TL tells you one site has been skipping a compliance check on low-value claims to hit target.", options: [
          { t: "Collaborate: ask the site to propose a joint fix by Friday", score: 0, fb: "Sounds respectful, but the compliance gap stays open for three more days. Some issues can't wait for consensus." },
          { t: "Compete: stop it today, then hear why it started", score: 2, fb: "Non-negotiable first, curiosity second. Stopping it isn't the end; the pressure that caused it still needs fixing." },
          { t: "Accommodate: let Quality lead, since it's their control", score: 1, fb: "Quality should know, but it's your team's practice. Handing it off looks like avoiding ownership." },
          { t: "Compromise: allow it under $50 until month-end", score: 0, fb: "A compliance control isn't yours to trade. This turns a lapse into a decision." } ] },
        { q: "<strong>3:00pm.</strong> Nisha asks to borrow Leo, your best TL, for six weeks to launch her new process.", options: [
          { t: "Accommodate: say yes, the goodwill is worth the gap", score: 1, fb: "Generous, and it builds trust, but your team loses its anchor during month-end and recovery." },
          { t: "Compete: decline, since your recovery has to come first", score: 0, fb: "Protects your numbers, costs the account. Nisha will remember it the next time you need her." },
          { t: "Collaborate: Leo two days a week, with a named backup", score: 2, fb: "Meets both needs and develops your backup. It takes a 20-minute conversation, which is worth it here." },
          { t: "Compromise: lend him for two weeks, then review", score: 1, fb: "Workable, but the two-week limit is arbitrary. It splits the difference instead of solving either need." } ] },
        { q: "<strong>4:30pm.</strong> Two of your TLs are trading sharp emails about who caused an error, and they've copied their teams.", options: [
          { t: "Collaborate now: call both into a meeting this afternoon", score: 1, fb: "The right destination, the wrong moment. With tempers high, a meeting now often hardens positions." },
          { t: "Compete: reply-all with your ruling on who was right", score: 0, fb: "Ends the thread, but publicly picks a loser. Both teams learn to escalate to you instead of talking." },
          { t: "Avoid for now: stop the thread, meet both tomorrow", score: 2, fb: "Avoiding is a pause, not a decision. Taking it offline protects both TLs, and tomorrow they can solve it." },
          { t: "Accommodate: let them settle it themselves", score: 0, fb: "Their teams are watching. Silence from you reads as approval of the behavior." } ] }
      ],
      key: [
        "Competing is right for non-negotiables. It's a leadership act, not an aggressive one.",
        "Collaborating takes time; save it for conflicts where both needs matter for months.",
        "Avoiding is a legitimate pause when tempers are high, as long as you come back to it."
      ] },
    sup: { type: "case", id: "mg2-case", title: "Three conflicts, one afternoon",
      brief: "<p>It's a Tuesday in a hiring-wave week. Three conflicts land on your desk in one afternoon. For each, choose the mode and the move.</p>",
      questions: [
        { q: "<strong>2:00pm.</strong> A TL tells you one shift has been granting access before manager approval to hit SLA.", options: [
          { t: "Collaborate: ask the shift to propose a joint fix by Friday", score: 0, fb: "Sounds respectful, but the access-control gap stays open for three more days. Some issues can't wait for consensus." },
          { t: "Compete: stop it today, then hear why it started", score: 2, fb: "Non-negotiable first, curiosity second. Stopping it isn't the end; the pressure that caused it still needs fixing." },
          { t: "Accommodate: let IT Security lead, since it's their control", score: 1, fb: "Security should know, but it's your team's practice. Handing it off looks like avoiding ownership." },
          { t: "Compromise: allow it for trainees until the wave ends", score: 0, fb: "An access control isn't yours to trade. This turns a lapse into a decision." } ] },
        { q: "<strong>3:00pm.</strong> Carmela asks to borrow Chris, your best TL, for six weeks for HR's system migration.", options: [
          { t: "Accommodate: say yes, the goodwill is worth the gap", score: 1, fb: "Generous, and it builds trust, but your team loses its anchor during the hiring wave." },
          { t: "Compete: decline, since the hiring wave has to come first", score: 0, fb: "Protects your SLA, costs the partnership. Carmela will remember it the next time you need HR." },
          { t: "Collaborate: Chris two days a week, with a named backup", score: 2, fb: "Meets both needs and develops your backup. It takes a 20-minute conversation, which is worth it here." },
          { t: "Compromise: lend him for two weeks, then review", score: 1, fb: "Workable, but the two-week limit is arbitrary. It splits the difference instead of solving either need." } ] },
        { q: "<strong>4:30pm.</strong> Two of your TLs are trading sharp emails about who caused an outage, and they've copied their teams.", options: [
          { t: "Collaborate now: call both into a meeting this afternoon", score: 1, fb: "The right destination, the wrong moment. With tempers high, a meeting now often hardens positions." },
          { t: "Compete: reply-all with your ruling on who was right", score: 0, fb: "Ends the thread, but publicly picks a loser. Both teams learn to escalate to you instead of talking." },
          { t: "Avoid for now: stop the thread, meet both tomorrow", score: 2, fb: "Avoiding is a pause, not a decision. Taking it offline protects both TLs, and tomorrow they can solve it." },
          { t: "Accommodate: let them settle it themselves", score: 0, fb: "Their teams are watching. Silence from you reads as approval of the behavior." } ] }
      ],
      key: [
        "Competing is right for non-negotiables. It's a leadership act, not an aggressive one.",
        "Collaborating takes time; save it for conflicts where both needs matter for months.",
        "Avoiding is a legitimate pause when tempers are high, as long as you come back to it."
      ] } }),

  /* Support module ------------------------------------------------------ */
  sme: V({
    ops: { type: "case", id: "mg3-case", title: "Two asks, one pair of SMEs",
      brief: "<p>Wednesday morning. A peer needs help, and so might you. Read both exhibits, then make three calls.</p>",
      exhibits: [
        { kind: "memo", title: "Message from Nisha", from: "Nisha, Peer Manager, AR · 8:42am", html: "<p>Client review Thursday 3pm. We're three days behind on denials for their top payer. Could you lend two SMEs Wednesday and Thursday? I know it's month-end for you too.</p>" },
        { kind: "table", title: "Your position this morning", head: ["Measure", "Status"], rows: [
          ["Posting backlog", "One day behind; recoverable by Monday"], ["Month-end close", "Six working days away"],
          ["SMEs available", "Two, both in Leo's team"], ["Leo's team", "Tired after last week's push"] ] } ],
      questions: [
        { q: "What do you reply to Nisha?", options: [
          { t: "Both SMEs for both days; your gap can wait", score: 1, fb: "Generous, and Nisha will remember it, but you've put your own month-end at risk without checking." },
          { t: "Both SMEs Wednesday, one on Thursday", score: 2, fb: "Covers her peak before the review and keeps your one-day gap recoverable. Specific, and honest about your limits." },
          { t: "Not now, but both SMEs after your month-end", score: 0, fb: "Help after Thursday's review is no help. Nisha learns not to ask you." },
          { t: "Your SME job aids today, people if still needed", score: 1, fb: "Useful, but documents don't clear a three-day backlog in two days. It looks like help without the cost." } ] },
        { q: "How do you bring Leo in?", options: [
          { t: "Tell him it's decided and the SMEs move today", score: 0, fb: "Fast, but Leo hears about his own team's capacity as an instruction. His trust drops just when you need him." },
          { t: "Ask him whether he's comfortable lending them", score: 1, fb: "Respectful, but it makes an account-level decision his call, and puts him in an awkward spot with a peer." },
          { t: "Give him the reason, and ask him to plan cover", score: 2, fb: "The decision stays yours, the why is clear, and Leo owns how his team absorbs it." },
          { t: "Let Nisha ask Leo directly, peer to peer", score: 0, fb: "Skips you on a resourcing call and leaves Leo to say no to a Manager." } ] },
        { q: "Thursday's review goes well. What now?", options: [
          { t: "Thank the two SMEs by name, to Nisha and your team", score: 2, fb: "Recognition is what makes people volunteer next time. Naming them in front of both teams spreads it further." },
          { t: "Ask Nisha for two of her people at your month-end", score: 1, fb: "A fair ask, but making it now turns help into a trade. Better to ask when you actually need it." },
          { t: "Mention the loan in your next update to the VP", score: 0, fb: "It's fine for leaders to know, but leading with it reads as credit-taking for your SMEs' work." },
          { t: "Move on; helping peers is simply part of the job", score: 1, fb: "True, and humble, but silent help goes unnoticed by the people who actually did it." } ] }
      ],
      key: [
        "The best offers are specific and honest about your limits.",
        "Make resourcing calls yourself, and give your TL the reason and the planning.",
        "Thank the people who did the work, by name, where their peers can hear it."
      ] },
    sup: { type: "case", id: "mg3-case", title: "Two asks, one pair of specialists",
      brief: "<p>Wednesday morning. A peer needs help, and so might you. Read both exhibits, then make three calls.</p>",
      exhibits: [
        { kind: "memo", title: "Message from Carmela", from: "Carmela, Peer Manager, HR Onboarding · 8:42am", html: "<p>Next wave list review Thursday 3pm with the Operations Director. We're behind on 60 profiles. Could you lend two access specialists Wednesday and Thursday to help us check them? I know your queue is full too.</p>" },
        { kind: "table", title: "Your position this morning", head: ["Measure", "Status"], rows: [
          ["Access backlog", "One day behind; recoverable by Monday"], ["Payroll access changes", "Due in six working days"],
          ["Specialists available", "Two, both in Chris's team"], ["Chris's team", "Tired after last week's wave"] ] } ],
      questions: [
        { q: "What do you reply to Carmela?", options: [
          { t: "Both specialists for both days; your gap can wait", score: 1, fb: "Generous, and Carmela will remember it, but you've put payroll access at risk without checking." },
          { t: "Both specialists Wednesday, one on Thursday", score: 2, fb: "Covers her peak before the review and keeps your one-day gap recoverable. Specific, and honest about your limits." },
          { t: "Not now, but both specialists after payroll", score: 0, fb: "Help after Thursday's review is no help. Carmela learns not to ask you." },
          { t: "Your access checklist today, people if still needed", score: 1, fb: "Useful, but a checklist doesn't clear 60 profiles in two days. It looks like help without the cost." } ] },
        { q: "How do you bring Chris in?", options: [
          { t: "Tell him it's decided and they move today", score: 0, fb: "Fast, but Chris hears about his own team's capacity as an instruction. His trust drops just when you need him." },
          { t: "Ask him whether he's comfortable lending them", score: 1, fb: "Respectful, but it makes a cross-team decision his call, and puts him in an awkward spot with a peer." },
          { t: "Give him the reason, and ask him to plan cover", score: 2, fb: "The decision stays yours, the why is clear, and Chris owns how his team absorbs it." },
          { t: "Let Carmela ask Chris directly, peer to peer", score: 0, fb: "Skips you on a resourcing call and leaves Chris to say no to a Manager." } ] },
        { q: "Thursday's review goes well. What now?", options: [
          { t: "Thank the two specialists by name, to Carmela and your team", score: 2, fb: "Recognition is what makes people volunteer next time. Naming them in front of both teams spreads it further." },
          { t: "Ask Carmela for HR's help with your payroll access changes", score: 1, fb: "A fair ask, but making it now turns help into a trade. Better to ask when you actually need it." },
          { t: "Mention the loan in your next update to the COO", score: 0, fb: "It's fine for leaders to know, but leading with it reads as credit-taking for your specialists' work." },
          { t: "Move on; helping peers is simply part of the job", score: 1, fb: "True, and humble, but silent help goes unnoticed by the people who actually did it." } ] }
      ],
      key: [
        "The best offers are specific and honest about your limits.",
        "Make resourcing calls yourself, and give your TL the reason and the planning.",
        "Thank the people who did the work, by name, where their peers can hear it."
      ] } }),

  /* Networks module ----------------------------------------------------- */
  whocall: V({
    ops: { type: "case", id: "mg4-case", title: "Who do you call first?",
      brief: "<p>Three situations from the next month. In each, decide whose number you dial first. Every option is a reasonable person to talk to; the question is who moves things furthest, fastest.</p>",
      questions: [
        { q: "You hear the client may add a new payer mix next quarter, but nothing is confirmed.", options: [
          { t: "Your TLs, so they can start preparing", score: 0, fb: "Spreads an unconfirmed rumour and creates work that may not be needed." },
          { t: "A Tower Lead close to the client's roadmap", score: 2, fb: "Your strategic network exists for exactly this: what's coming, how likely it is, and when." },
          { t: "Ken in MIS, to model the possible volume", score: 1, fb: "Useful once you know it's real. Modelling a rumour first is effort in the wrong order." },
          { t: "Nisha, to compare what she's heard", score: 1, fb: "Peers help you make sense of it, but she's likely hearing the same rumour you are." } ] },
        { q: "Your recovery plan needs payer-level data your team doesn't own, by Friday.", options: [
          { t: "Ken in MIS, with the exact cut and the deadline", score: 2, fb: "An operational ask to the right person, made specific. Specific asks get answered first." },
          { t: "The VP, to make it a priority across teams", score: 0, fb: "Using senior weight for a routine data pull costs goodwill you'll want later." },
          { t: "Nisha, since AR already uses that data daily", score: 1, fb: "She may have a version, but it's built for AR's purpose. You'd likely still need MIS." },
          { t: "Mara in Quality, who analysed the root cause", score: 1, fb: "She has part of it, but not at payer level. A good second call." } ] },
        { q: "You want to get better at presenting to senior client stakeholders.", options: [
          { t: "The client's ops lead, for direct feedback", score: 0, fb: "Asking a client to coach you mid-escalation puts them in an odd position." },
          { t: "A peer Manager who finds it just as difficult", score: 1, fb: "Good for support and practice, but you'll both be learning from scratch." },
          { t: "A senior leader whose client reviews you admire", score: 2, fb: "Your developmental network at work: someone who does it well, and can tell you what they do." },
          { t: "Your HR business partner, about a presentation course", score: 1, fb: "A course can help, but watching and debriefing with someone who does it well is faster." } ] }
      ],
      key: [
        "Strategic contacts help you see what's coming; use them before you act on rumours.",
        "Operational asks land faster when they're specific: what, by when, and why.",
        "Developmental contacts are people who do well what you want to learn."
      ] },
    sup: { type: "case", id: "mg4-case", title: "Who do you call first?",
      brief: "<p>Three situations from the next month. In each, decide whose number you dial first. Every option is a reasonable person to talk to; the question is who moves things furthest, fastest.</p>",
      questions: [
        { q: "You hear a new client may onboard 200 people next quarter, but nothing is confirmed.", options: [
          { t: "Your TLs, so they can start preparing", score: 0, fb: "Spreads an unconfirmed rumour and creates work that may not be needed." },
          { t: "An Operations Director close to the deal", score: 2, fb: "Your strategic network exists for exactly this: what's coming, how likely it is, and when." },
          { t: "Ken in WFM, to model the possible volume", score: 1, fb: "Useful once you know it's real. Modelling a rumour first is effort in the wrong order." },
          { t: "Carmela, to compare what she's heard", score: 1, fb: "Peers help you make sense of it, but she's likely hearing the same rumour you are." } ] },
        { q: "Your onboarding plan needs start-date data your team doesn't own, by Friday.", options: [
          { t: "Ken in WFM, with the exact cut and the deadline", score: 2, fb: "An operational ask to the right person, made specific. Specific asks get answered first." },
          { t: "The COO, to make it a priority across teams", score: 0, fb: "Using senior weight for a routine data pull costs goodwill you'll want later." },
          { t: "Carmela, since HR already uses that data daily", score: 1, fb: "She may have a version, but it's built for HR's purpose. You'd likely still need WFM." },
          { t: "Paul in Training, who analysed the root cause", score: 1, fb: "He has part of it, but not by start date. A good second call." } ] },
        { q: "You want to get better at presenting to senior Operations leaders.", options: [
          { t: "The Operations Director, for direct feedback", score: 0, fb: "Asking your escalating customer to coach you puts them in an odd position." },
          { t: "A peer Manager who finds it just as difficult", score: 1, fb: "Good for support and practice, but you'll both be learning from scratch." },
          { t: "A senior leader whose reviews you admire", score: 2, fb: "Your developmental network at work: someone who does it well, and can tell you what they do." },
          { t: "Your HR business partner, about a presentation course", score: 1, fb: "A course can help, but watching and debriefing with someone who does it well is faster." } ] }
      ],
      key: [
        "Strategic contacts help you see what's coming; use them before you act on rumours.",
        "Operational asks land faster when they're specific: what, by when, and why.",
        "Developmental contacts are people who do well what you want to learn."
      ] } }),

  /* Capstone ------------------------------------------------------------ */
  review: V({
    ops: { type: "case", id: "mg5-case", title: "Read the data before the client does",
      brief: "<p>The VP wants one recovery story for next Thursday's quarterly business review with the client. Read the scorecard and the VP's note, then make four calls.</p>",
      exhibits: [
        { kind: "table", title: "Account scorecard, last six weeks", head: ["Measure", "Target", "Six weeks ago", "Now"], rows: [
          ["Posting productivity", "100%", "101%", "104%"], ["AR collections", "100%", "99%", "97%"],
          { cells: ["Unapplied cash", "Under $1.0M", "$0.9M", "$1.9M"], flag: true }, ["Quality accuracy", "98%", "98.4%", "98.6%"],
          { cells: ["Client satisfaction", "4.0 / 5", "4.2", "3.1"], flag: true } ] },
        { kind: "memo", title: "Note from the VP", from: "VP Operations · Monday", html: "<p>I want one recovery story for Thursday, not three team updates. Tell me what we lead with, what we're changing, and who's in the room.</p>" } ],
      questions: [
        { q: "Which number should lead your recovery story?", options: [
          { t: "Unapplied cash: it's what the client feels", score: 2, fb: "Lead with their pain, in their terms. Everything else in the story should explain or fix this number." },
          { t: "Posting productivity, to show the team's effort", score: 0, fb: "It's your best number, which is exactly why it sounds defensive. The client will ask why effort hasn't helped." },
          { t: "Quality accuracy, as proof the work is sound", score: 1, fb: "True and reassuring, but it's beside the point the client is upset about." },
          { t: "Client satisfaction, to show we heard them", score: 1, fb: "It shows empathy, but it's an outcome you can't move directly. Lead with the lever." } ] },
        { q: "Posting is at 104% productivity while unapplied cash has doubled. What's the most likely explanation?", options: [
          { t: "Posting needs more people to keep pace", score: 0, fb: "Productivity is above target. Adding people to a team that's already fast won't fix what it's being fast at." },
          { t: "AR's follow-up is the real bottleneck", score: 0, fb: "AR is slipping too, but this is the old blame story with a new chart." },
          { t: "Speed is rewarded over clean matching", score: 2, fb: "When a team beats its target while the shared outcome worsens, look at what the target rewards." },
          { t: "Posting's target is set too low for this client", score: 1, fb: "Possibly, but raising the bar on speed would make the matching problem worse." } ] },
        { q: "What do you change first?", options: [
          { t: "Pause Posting's productivity target until the backlog clears", score: 1, fb: "Reduces the pressure on speed, but neither team owns the shared result yet." },
          { t: "Put one unapplied-cash measure on both scorecards", score: 2, fb: "Both teams now win or lose together, which is what the client already assumes." },
          { t: "Ask Quality to audit every unmatched payment this month", score: 0, fb: "Inspecting thousands of items is slow and treats a system problem as an accuracy problem." },
          { t: "Swap the Posting and AR TLs for two weeks", score: 1, fb: "Builds empathy across teams, but it's disruptive in the middle of a recovery." } ] },
        { q: "Who presents the recovery plan on Thursday?", options: [
          { t: "You alone, since the escalation came through Posting", score: 0, fb: "One voice sounds tidy, but it tells the client this is still a Posting problem, and it cuts out Nisha." },
          { t: "You and Nisha, with Mara on the root cause", score: 2, fb: "The client sees one account and a joint plan, and the person who spotted the root cause gets the credit." },
          { t: "The VP, to show senior ownership", score: 1, fb: "Signals seriousness, but the people doing the fix aren't the ones committing to it." },
          { t: "Nisha, since AR owns the client relationship", score: 1, fb: "Generous, but the client will want to hear from Posting too. Half the plan is yours." } ] }
      ],
      key: [
        "Lead with the number your client or customer feels, not the one that flatters your team.",
        "When a team beats its own target while the shared result worsens, the target is the problem.",
        "Shared measures and joint presentations are what keep silos from coming back."
      ] },
    sup: { type: "case", id: "mg5-case", title: "Read the data before Operations does",
      brief: "<p>The COO wants one onboarding recovery story for next Thursday's Operations leadership review. Read the scorecard and the COO's note, then make four calls.</p>",
      exhibits: [
        { kind: "table", title: "Onboarding scorecard, last six weeks", head: ["Measure", "Target", "Six weeks ago", "Now"], rows: [
          ["IT access tickets within SLA", "95%", "95%", "96%"], ["HR lists on time", "95%", "92%", "70%"],
          ["Training test pass rate", "90%", "91%", "88%"], { cells: ["New hires ready on day one", "90%", "88%", "61%"], flag: true },
          { cells: ["Operations satisfaction", "4.0 / 5", "4.1", "2.8"], flag: true } ] },
        { kind: "memo", title: "Note from the COO", from: "COO · Monday", html: "<p>I want one onboarding story for Thursday, not three team updates. Tell me what we lead with, what we're changing, and who's in the room.</p>" } ],
      questions: [
        { q: "Which number should lead your recovery story?", options: [
          { t: "Day-one readiness: it's what Operations feels", score: 2, fb: "Lead with their pain, in their terms. Everything else in the story should explain or fix this number." },
          { t: "IT's 96% SLA, to show your team's effort", score: 0, fb: "It's your best number, which is exactly why it sounds defensive. Operations will ask why it hasn't helped." },
          { t: "Training's pass rate, as proof hires are learning", score: 1, fb: "True and reassuring, but it's beside the point Operations is upset about." },
          { t: "Operations satisfaction, to show we heard them", score: 1, fb: "It shows empathy, but it's an outcome you can't move directly. Lead with the lever." } ] },
        { q: "IT meets 96% of its SLAs while only 61% of new hires are ready on day one. What's the most likely explanation?", options: [
          { t: "IT needs more people during every hiring wave", score: 0, fb: "IT is above its SLA. Adding people to a team that's already on time won't fix the gaps between teams." },
          { t: "HR's late lists are the real bottleneck here", score: 0, fb: "HR is slipping too, but this is the old blame story with a new chart." },
          { t: "Each SLA ignores the handoffs between teams", score: 2, fb: "When every team hits its own target while the shared outcome worsens, look at what the targets leave out." },
          { t: "IT's SLA target is set too generously", score: 1, fb: "Possibly, but tightening one team's clock won't help if requests start late." } ] },
        { q: "What do you change first?", options: [
          { t: "Pause IT's SLA reporting until the wave is over", score: 1, fb: "Reduces pressure to close tickets fast, but no team owns the shared result yet." },
          { t: "Share one day-one readiness measure across all three", score: 2, fb: "All three teams now win or lose together, which is what Operations already assumes." },
          { t: "Ask Internal Audit to review every late request this month", score: 0, fb: "Reviewing every item is slow and treats a system problem as a compliance problem." },
          { t: "Swap the HR and IT TLs for the next two weeks", score: 1, fb: "Builds empathy across teams, but it's disruptive in the middle of a hiring wave." } ] },
        { q: "Who presents the recovery plan on Thursday?", options: [
          { t: "You alone, since access was the visible failure", score: 0, fb: "One voice sounds tidy, but it tells Operations this is still an IT problem, and it cuts out Carmela." },
          { t: "You and Carmela, with Paul on the root cause", score: 2, fb: "Operations sees one onboarding process and a joint plan, and the person who spotted the root cause gets the credit." },
          { t: "The COO, to show senior ownership", score: 1, fb: "Signals seriousness, but the people doing the fix aren't the ones committing to it." },
          { t: "Carmela, since HR owns the new-hire relationship", score: 1, fb: "Generous, but Operations will want to hear from IT too. Half the plan is yours." } ] }
      ],
      key: [
        "Lead with the number your client or customer feels, not the one that flatters your team.",
        "When a team beats its own target while the shared result worsens, the target is the problem.",
        "Shared measures and joint presentations are what keep silos from coming back."
      ] } })
  };
})();
