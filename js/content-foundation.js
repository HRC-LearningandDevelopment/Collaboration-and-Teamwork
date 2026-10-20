/* PART 1 — FOUNDATION (all profiles, tailored by role and function) */
(function () {
  const V = window.CV;

  window.COURSE.modules.push(
  {
    id: "f1", part: "foundation", track: "all", minutes: 9,
    title: "Every piece matters",
    summary: "Meet your scenario, find the missing line in a team story, and discover the words that hold a team together.",
    screens: [
      {
        title: "Meet your scenario",
        blocks: [
          { type: "p", html: V({
            tl: "Everything in this course is built around one demanding week with your team, and the people you'll lead through it. You'll meet them again and again.",
            mgr: "Everything in this course is built around one escalation you're part of, and the leaders and partners you'll need to solve it. You'll meet them again and again." }) },
          { type: "briefing" },
          { type: "callout", title: "How to use the scenario", html: V({
            tl: "When an activity asks what you'd say or do, answer as the leader of this team. Then, in the reflections, apply it to your real team.",
            mgr: "When an activity asks for a decision, make it as the manager in this scenario. Then, in the reflections, apply it to your real teams, peers, and stakeholders." }) }
        ]
      },
      {
        title: "The missing line",
        blocks: [
          { type: "p", html: "Here's a short story from your scenario's world. It has five lines, but one is missing." },
          { type: "story", id: "f1-story", title: "Fill in the missing line",
            label: "Write the missing line. What did someone do?",
            placeholder: "Someone on the team…",
            lines: V({
              tl_ops: ["It was the last day of month-end, and the dashboard turned red at 9pm.", "Priya noticed that every claim for one payer was being rejected.", "", "By midnight, the rejections had dropped to zero.", "The client never knew there had been a problem."],
              tl_sup: ["It was Friday at 4pm, and 40 new hires still had no system access for Monday.", "Ana noticed that every failed request was missing the same client ID.", "", "By 7pm, every account was live and tested.", "On Monday, all 80 new hires logged in on the first try."],
              mgr_ops: ["On Monday, a client escalated: unapplied cash had doubled in a month.", "Posting and AR each said the other team had caused it.", "", "By Thursday, both teams were working from one recovery plan.", "On Friday, the client said it was the best update they'd had all year."],
              mgr_sup: ["On Monday, an Operations Director escalated: 30 new hires had sat idle for two days.", "HR, IT, and Training each said the delay started with someone else.", "", "By Thursday, all three teams were working from one onboarding checklist.", "Two weeks later, the next wave of 60 started on time, fully set up."] }),
            gap: 2,
            reveal: V({
              tl_ops: "Without line 3, the story jumps from problem to solution with nothing in between. Someone did something that made the difference: spotted the pattern, called QA, stayed late, shared a fix. Every team member is a line in the story. When one is missing, the story doesn't work. Keep this in mind; it comes back at the end.",
              tl_sup: "Without line 3, the story jumps from problem to solution with nothing in between. Someone did something that made the difference: called HR to correct the list, stayed to test accounts, shared a shortcut with Training. Every team member is a line in the story. When one is missing, the story doesn't work. Keep this in mind; it comes back at the end.",
              mgr_ops: "Without line 3, the story jumps from blame to a joint plan with nothing in between. Someone did something that made the difference: called both Managers together, brought in Quality's data, shared the credit. Every leader is a line in the account's story. When one is missing, the story doesn't work. Keep this in mind; it comes back at the end.",
              mgr_sup: "Without line 3, the story jumps from blame to a joint checklist with nothing in between. Someone did something that made the difference: got HR, IT, and Training in one room, asked WFM for the start-date data, owned their part publicly. Every leader is a line in the story. When one is missing, the story doesn't work. Keep this in mind; it comes back at the end." }),
            key: [
              "Results are rarely one person's work. They come from a chain of small contributions.",
              "The contributions that matter most are often invisible: noticing, asking, sharing, staying.",
              "A team is only complete when every person brings their piece, including you."
            ] }
        ]
      },
      {
        title: "What holds a team together",
        blocks: [
          { type: "p", html: "Eight words are hidden in the grid. Each one is part of what makes a team work. As you find each word, you'll see why it matters." },
          { type: "wordsearch", id: "f1-words", title: "Find the eight words", size: 11,
            words: [
              { w: "TRUST", note: "The foundation. People share problems and ideas only with people they trust." },
              { w: "SAFETY", note: "Psychological safety: it's safe to speak up, admit mistakes, and ask for help." },
              { w: "LISTEN", note: "Ask, then listen. It's the step most people skip in a disagreement." },
              { w: "CANDOR", note: "Saying the hard thing, with care for how it lands. Teams need it to spot risks." },
              { w: "CREDIT", note: "Share it generously. Credit costs nothing and builds goodwill fast." },
              { w: "OFFER", note: "Specific offers of help get accepted. Vague ones rarely do." },
              { w: "NETWORK", note: "The people beyond your team who help you deliver, grow, and see what's coming." },
              { w: "GOAL", note: "A shared goal turns “my numbers” into “our numbers.”" }
            ] },
          { type: "p", html: "In Part 2 you'll practice four skills that bring these words to life. Open each one for a preview." },
          { type: "accordion", id: "f1-skills", items: [
            { title: "Promote a collaborative environment", html: V({ tl: "<p>Make it safe for your team to speak up, admit mistakes, and ask for help, starting with how you respond in your next huddle.</p>", mgr: "<p>Make it safe for your TLs and peers to bring bad news early, and break down the silos between teams and functions.</p>" }) },
            { title: "Manage conflict constructively", html: "<p>Choose the right response for the moment from five conflict modes, and use DIAL to turn down the heat without avoiding the issue.</p>" },
            { title: "Support colleagues to reach shared goals", html: V({ tl: "<p>Move your team from “my numbers” to “our numbers”: ask early, offer specifically, and follow through.</p>", mgr: "<p>Win as a leadership team: share capacity, knowledge, and credit across processes, functions, and sites.</p>" }) },
            { title: "Build networks", html: "<p>Strengthen the three networks every leader needs (operational, developmental, and strategic), and give before you ask.</p>" }
          ] }
        ]
      }
    ]
  },

  {
    id: "f2", part: "foundation", track: "all", minutes: 11,
    title: "What kind of team player are you?",
    summary: "Discover your team-player style, what it brings, what to watch for, and why your team needs every style.",
    screens: [
      {
        title: "Your team-player style",
        blocks: [
          { type: "p", html: "Teams need four kinds of contribution. Before you learn what they are, find out which ones come most naturally to you." },
          { type: "styleassess", id: "f2-style", title: "Team-player self-assessment",
            intro: "For each statement, choose the option most like you on a normal workday, not on your best day. Every option describes something teams need, so none is better than the others. Your answers stay in this browser.",
            items: [
              { q: "When a new piece of work starts, I'm most likely to…", options: [
                { t: "Get clear on my tasks and the quality expected", s: "Contributor" }, { t: "Test whether the plan will actually work", s: "Challenger" },
                { t: "Check that everyone knows each other's role and is comfortable", s: "Communicator" }, { t: "Make sure we all agree on the end goal", s: "Collaborator" } ] },
              { q: "In a team meeting, I usually…", options: [
                { t: "Keep the discussion moving toward the goal", s: "Collaborator" }, { t: "Bring data and facts from my area", s: "Contributor" },
                { t: "Draw out quieter people and sum up views", s: "Communicator" }, { t: "Point out risks others may have missed", s: "Challenger" } ] },
              { q: "When the team hits a problem, I…", options: [
                { t: "Raise concerns openly, even if they're unpopular", s: "Challenger" }, { t: "Dig into the details to find the fix", s: "Contributor" },
                { t: "Pitch in wherever needed, even outside my role", s: "Collaborator" }, { t: "Make sure people are talking, not blaming", s: "Communicator" } ] },
              { q: "Colleagues most often come to me for…", options: [
                { t: "Accurate information and know-how", s: "Contributor" }, { t: "A listening ear, or help easing tension", s: "Communicator" },
                { t: "A frank opinion", s: "Challenger" }, { t: "Help seeing the bigger picture", s: "Collaborator" } ] },
              { q: "What frustrates me most in a team is…", options: [
                { t: "People pulling in different directions", s: "Collaborator" }, { t: "Sloppy work or missed deadlines", s: "Contributor" },
                { t: "People avoiding the real issue", s: "Challenger" }, { t: "Tension, or people being left out", s: "Communicator" } ] },
              { q: "When a decision is being made, I care most that…", options: [
                { t: "It's based on good data", s: "Contributor" }, { t: "Everyone has had a say", s: "Communicator" },
                { t: "It moves us toward our goal", s: "Collaborator" }, { t: "We've tested our assumptions", s: "Challenger" } ] },
              { q: "The part of team life that drains me most is…", options: [
                { t: "Meetings that pull me away from getting my work done", s: "Contributor" }, { t: "Long discussions that never reach a decision", s: "Collaborator" },
                { t: "Tension between people that never gets resolved", s: "Communicator" }, { t: "Agreeing to something nobody has questioned", s: "Challenger" } ] },
              { q: "Under pressure, I tend to…", options: [
                { t: "Focus harder on getting my own part right", s: "Contributor" }, { t: "Push the team to stay on target", s: "Collaborator" },
                { t: "Check how people are coping", s: "Communicator" }, { t: "Say directly what isn't working", s: "Challenger" } ] },
              { q: "People who know me well might say I sometimes…", options: [
                { t: "Get lost in the details", s: "Contributor" }, { t: "Take on too much myself", s: "Collaborator" },
                { t: "Avoid hard conversations to keep the peace", s: "Communicator" }, { t: "Come across as critical", s: "Challenger" } ] }
            ],
            styles: {
              Contributor: { color: "#1270A0", focus: "Task-focused", bring: "Expertise, data, and reliable, high-quality work.", watch: "Getting lost in detail, or perfectionism that slows the team.", need: "Share your know-how generously, and keep the bigger goal in view." },
              Collaborator: { color: "#157A72", focus: "Goal-focused", bring: "Keeps everyone pointed at the goal, and pitches in anywhere.", watch: "Taking on too much, or overlooking details.", need: "Keep the team on target, and let others own their pieces." },
              Communicator: { color: "#7A4BB5", focus: "People-focused", bring: "Listening, inclusion, and a positive climate.", watch: "Avoiding hard issues to keep the peace.", need: "Keep people connected, and voice the hard thing too." },
              Challenger: { color: "#C2410C", focus: "Quality-focused", bring: "Candor. Questions assumptions and raises the bar.", watch: "Coming across as negative or rigid.", need: "Keep asking tough questions, with care for how they land." }
            },
            after: "Most people are a blend, and your style can shift with the situation. Every style is essential: a team of only Challengers argues all day; a team of only Communicators never makes the hard call. Your style fills a gap no one else can.",
            key: [
              "There's no best style. Each brings something the team can't do without.",
              "Every strength has an overused version. Knowing yours is how you keep it a strength.",
              "Teams struggle most when one style is missing entirely, not when styles clash."
            ] }
        ]
      },
      {
        title: "Every style, every team",
        blocks: [
          { type: "p", html: "The four styles come from Glenn Parker's research on team players. Flip each card to see what that style brings, and what happens when it's overused." },
          { type: "flip", id: "f2-flip", title: "The four team-player styles",
            cards: [
              { front: "Contributor", sub: "Task-focused", back: "<strong>Brings:</strong> expertise, data, and dependable work.<br><br><strong>Overused:</strong> perfectionism, or losing sight of the team goal while polishing one piece.<br><br><strong>Without one:</strong> the plan is right, but the details slip." },
              { front: "Collaborator", sub: "Goal-focused", back: "<strong>Brings:</strong> a clear shared goal, and willingness to pitch in.<br><br><strong>Overused:</strong> taking on everything, and missing the detail.<br><br><strong>Without one:</strong> everyone works hard in slightly different directions." },
              { front: "Communicator", sub: "People-focused", back: "<strong>Brings:</strong> listening, inclusion, and a climate where people speak.<br><br><strong>Overused:</strong> keeping the peace instead of facing the issue.<br><br><strong>Without one:</strong> quieter voices go unheard, and tension builds." },
              { front: "Challenger", sub: "Quality-focused", back: "<strong>Brings:</strong> candor, and the questions nobody else asks.<br><br><strong>Overused:</strong> sounding negative or rigid, so people stop listening.<br><br><strong>Without one:</strong> the team moves confidently in the wrong direction." }
            ] },
          { type: "form", id: "f2-reflect", title: "Your style at work",
            fields: [
              { id: "miss", label: "What does my team miss when I'm not there?", prompt: V({ tl: "Think about your real team on a busy day.", mgr: "Think about your teams, your peers, and the leadership table." }) },
              { id: "gap", label: V({ tl: "Which style is missing or weakest in my team, and what does that cost us?", mgr: "Which style is missing or weakest in my leadership team, and what does that cost us?" }) },
              { id: "overuse", label: "One thing I'll do to avoid overusing my style", prompt: "For example: “Before I raise a risk, I'll say what I like about the plan.”" }
            ], saveLabel: "Save my reflection" }
        ]
      },
      {
        title: "Hear the styles in action",
        blocks: [
          { type: "p", html: "You'll hear all four styles in any good huddle. Sort each comment into the style it shows. Some comments could sound like more than one; choose the best fit." },
          { type: "bucket", id: "f2-sort", title: "Who's speaking?",
            prompt: V({ ops: "Comments from a month-end huddle.", sup: "Comments from a go-live stand-up." }),
            buckets: [ { id: "con", label: "Contributor" }, { id: "col", label: "Collaborator" }, { id: "com", label: "Communicator" }, { id: "cha", label: "Challenger" } ],
            items: V({
              ops: [
                { id: "a", text: "“Before we split the queue, can we agree what ‘done’ looks like today?”", bucket: "col" },
                { id: "b", text: "“I pulled the rejection report: 80% are one payer, one denial code.”", bucket: "con" },
                { id: "c", text: "“Bea, you've worked this payer before. What are you seeing?”", bucket: "com" },
                { id: "d", text: "“What happens to accuracy if we skip the second check?”", bucket: "cha" },
                { id: "e", text: "“I'll double-check the remark codes before we post anything.”", bucket: "con" },
                { id: "f", text: "“Let's park the shift-swap debate. Month-end target first.”", bucket: "col" },
                { id: "g", text: "“It sounds like you two agree on the fix, just not the timing.”", bucket: "com" },
                { id: "h", text: "“We've done it this way for years. Is it still the best way?”", bucket: "cha" } ],
              sup: [
                { id: "a", text: "“Before we split the requests, can we agree what ‘ready for Monday’ means?”", bucket: "col" },
                { id: "b", text: "“I checked the failed tickets: they're all missing the same client ID.”", bucket: "con" },
                { id: "c", text: "“Lia, you set up the last client. What did you learn?”", bucket: "com" },
                { id: "d", text: "“What happens to security if we skip the approval step?”", bucket: "cha" },
                { id: "e", text: "“I'll test every account before we mark it complete.”", bucket: "con" },
                { id: "f", text: "“Let's park the template debate. Monday's go-live comes first.”", bucket: "col" },
                { id: "g", text: "“It sounds like HR and Training agree on the fix, just not the timing.”", bucket: "com" },
                { id: "h", text: "“We've always set up access this way. Is it still the best way?”", bucket: "cha" } ] }),
            key: [
              "Contributors bring facts and quality; Collaborators bring focus on the goal.",
              "Communicators bring people in; Challengers bring the uncomfortable question.",
              "Listen for the missing voice in your own huddles. If no one ever challenges, invite it."
            ] }
        ]
      }
    ]
  });
})();
