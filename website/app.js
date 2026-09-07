/* PATHWISE website — frontend-only replica of the mobile prototype.
   Styled with Tailwind CSS (CDN + brand tokens in index.html).
   Same sample data, same deterministic rules, same copy. No backend. */
(function () {
  "use strict";

  /* ---------------- sample data (mirrors src/data/model.ts) ---------------- */
  var INITIAL_PROFILE = {
    name: "Priya",
    role: "Retail operations associate",
    location: "Kochi, Kerala",
    goal: "Data analyst",
    budget: 60000,
    hours: 8,
    relocate: false,
    earnSoon: false,
    support: ["Flexible learning", "Written instructions"],
    strengths: ["Problem solving", "Working with numbers", "Customer insight"]
  };

  var PATHWAYS = [
    {
      id: "a", label: "Plan A", title: "Become a data analyst",
      subtitle: "Build skills alongside your current job",
      cost: 48000, months: 9, tag: "Build technical depth",
      description: "Turn your experience with stock, sales, and customers into a career working with data.",
      why: "Your retail experience already gives you a head start in spotting patterns. Part-time, remote learning lets you keep earning and stay in Kochi.",
      tradeoff: "A deeper technical learning curve. Consistent weekly practice matters, and a new job is not guaranteed.",
      eligibility: "Start with spreadsheet basics and access to a laptop. Course and employer requirements need to be checked individually.",
      skills: ["Excel", "SQL", "Power BI", "Data storytelling"],
      milestones: [
        { title: "Build your foundations", detail: "Refresh spreadsheets and learn how to ask useful questions of data.", duration: "Months 1–2" },
        { title: "Learn the analyst toolkit", detail: "Practice SQL and Power BI with small retail datasets.", duration: "Months 3–5" },
        { title: "Make your experience visible", detail: "Build two portfolio projects around sales trends and stock planning.", duration: "Months 6–7" },
        { title: "Take the next career step", detail: "Prepare for interviews and apply to suitable junior analyst roles.", duration: "Months 8–9" }
      ]
    },
    {
      id: "b", label: "Plan B", title: "Move into business operations",
      subtitle: "Use the strengths you already have",
      cost: 18000, months: 6, tag: "A gentler transition",
      description: "Move toward an operations analyst role through stronger reporting and process improvement skills.",
      why: "This route builds directly on your current work. A lower learning budget and an internal transition could make the change more manageable.",
      tradeoff: "Less technical depth at first. Internal openings and manager support may determine the timing.",
      eligibility: "Experience with day-to-day business operations is useful. Internal transfer policies and job requirements vary.",
      skills: ["Advanced Excel", "Process mapping", "Reporting", "Stakeholder communication"],
      milestones: [
        { title: "Map your transferable skills", detail: "Collect examples of process improvements from your current role.", duration: "Month 1" },
        { title: "Strengthen business reporting", detail: "Practice Excel, dashboards, and communicating clear recommendations.", duration: "Months 2–3" },
        { title: "Run a small improvement project", detail: "Propose a stock or sales reporting project at work.", duration: "Months 4–5" },
        { title: "Explore an adjacent role", detail: "Discuss internal openings and apply to business operations roles.", duration: "Month 6" }
      ]
    },
    {
      id: "c", label: "Plan C", title: "Start with reporting projects",
      subtitle: "A smaller step into a new field",
      cost: 8000, months: 4, tag: "Start smaller",
      description: "Learn practical spreadsheet reporting and build a small project portfolio before a larger career move.",
      why: "A smaller upfront commitment gives you room to explore. Your retail knowledge can help you design useful reports for small businesses.",
      tradeoff: "Project income can be irregular and is not guaranteed. Keep your current income while testing this route.",
      eligibility: "Basic computer skills and a laptop. Check each project\u2019s requirements before committing to paid work.",
      skills: ["Spreadsheets", "Simple dashboards", "Client briefs", "Portfolio building"],
      milestones: [
        { title: "Choose one practical skill", detail: "Learn spreadsheet cleanup, formulas, and clear charts.", duration: "Month 1" },
        { title: "Build a useful sample report", detail: "Create a weekly sales dashboard using sample data.", duration: "Month 2" },
        { title: "Test a small project", detail: "Ask a local business about a reporting need; agree on clear boundaries.", duration: "Month 3" },
        { title: "Review your next move", detail: "Use your experience to decide between more projects and deeper study.", duration: "Month 4" }
      ]
    }
  ];

  var OPPORTUNITIES = [
    { id: "excel", kind: "Course", title: "Excel for real-world decisions", provider: "Pathwise Learning Studio", location: "Online · self-paced", cost: "\u20B92,400", time: "4 weeks",
      description: "Practice formulas, pivot tables, and clean charts with everyday business problems. Short lessons fit around a working week.",
      requirements: "Basic spreadsheet familiarity and access to a computer. Captions and downloadable notes are included in this example.",
      skills: ["Excel", "Business reporting"] },
    { id: "analyst", kind: "Job", title: "Junior operations analyst", provider: "Northstar Retail", location: "Kochi · hybrid", cost: "Salary to confirm", time: "Full-time",
      description: "Turn retail performance data into weekly reports and help the operations team spot opportunities to improve.",
      requirements: "Spreadsheet skills, clear communication, and retail experience. Hybrid attendance and workplace accommodations require confirmation.",
      skills: ["Reporting", "Retail operations"] },
    { id: "return", kind: "Programme", title: "Your next chapter fellowship", provider: "Career Bridge Collective", location: "Online · evenings", cost: "Funding to confirm", time: "12 weeks",
      description: "An example of a supported career-transition programme combining mentoring, flexible study, and portfolio feedback.",
      requirements: "Designed for working adults exploring a career change. Funding, selection criteria, and support provision require confirmation.",
      skills: ["Mentoring", "Career transition"] },
    { id: "sql", kind: "Course", title: "A practical introduction to SQL", provider: "Pathwise Learning Studio", location: "Online · self-paced", cost: "\u20B93,600", time: "6 weeks",
      description: "Learn to find answers in data, from your first query to joining sales and product tables.",
      requirements: "A laptop and comfort with basic tables. No programming experience is assumed in this example.",
      skills: ["SQL", "Data analysis"] }
  ];

  var TASKS = [
    { id: "skills", title: "Map the skills you already use", detail: "Write down three ways you work with numbers.", time: "10 min" },
    { id: "lesson", title: "Try your first spreadsheet lesson", detail: "Explore a short course before committing.", time: "20 min" },
    { id: "schedule", title: "Make room for your next chapter", detail: "Choose two learning slots for this week.", time: "5 min" },
    { id: "project", title: "Find one problem worth exploring", detail: "Think of a question about sales or stock.", time: "15 min" }
  ];

  var TASK_EXTRA = [
    "Think about stock counts, weekly targets, customer feedback, or reports you already create. Note your examples in your own notebook.",
    "Browse a sample course and decide whether its subject interests you. You can mark this step complete once you have explored.",
    "Find two slots that work around your existing responsibilities.",
    "For example: which products sell best on weekends? One specific question can become your first portfolio project."
  ];

  var QUESTIONS = {
    goal: { title: "What would you like your next chapter to look like?", detail: "We\u2019ll build on what you already know. Which direction feels interesting?", options: ["Data analyst", "Business analyst", "Reporting specialist"] },
    priority: { title: "What matters most as you make this change?", detail: "A plan should make room for the life you already have.", options: ["Keep my current income", "Keep learning affordable", "Make time for family"] },
    budget: { title: "What feels comfortable to invest in learning?", detail: "Let\u2019s work with a total budget you can actually live with.", options: ["\u20B960,000 over time", "Up to \u20B920,000", "Start small · \u20B98,000"] },
    time: { title: "How much room is there in your week?", detail: "Small, consistent steps count. There\u2019s no perfect answer.", options: ["8 hours a week", "4 hours a week", "12 hours a week"] },
    support: { title: "What would make learning easier for you?", detail: "Share a preference if you\u2019d like. You don\u2019t need to explain why.", options: ["Flexible learning hours", "Captions and written notes", "Step-by-step guidance"] }
  };

  var SUPPORT_OPTIONS = ["Flexible learning", "Written instructions", "Captions & transcripts", "Step-by-step guidance", "Screen-reader support"];
  var STRENGTH_OPTIONS = ["Problem solving", "Working with numbers", "Customer insight", "Communication", "Organising people"];

  /* ---------------- deterministic rules (same as model.ts) ---------------- */
  function money(v) { return "\u20B9" + Number(v).toLocaleString("en-IN"); }
  function duration(path, profile) { return Math.ceil((path.months * 8) / Math.max(1, profile.hours)); }
  function pathById(id) { for (var i = 0; i < PATHWAYS.length; i++) if (PATHWAYS[i].id === id) return PATHWAYS[i]; return PATHWAYS[0]; }
  function oppById(id) { for (var i = 0; i < OPPORTUNITIES.length; i++) if (OPPORTUNITIES[i].id === id) return OPPORTUNITIES[i]; return null; }
  function recommend(profile) {
    var preferred = profile.goal === "Business analyst" ? "b" : profile.goal === "Reporting specialist" ? "c" : "a";
    if (profile.earnSoon) return "c";
    var pref = pathById(preferred);
    if (profile.budget >= pref.cost && (profile.hours >= 6 || preferred !== "a")) return preferred;
    if (profile.budget >= PATHWAYS[1].cost) return "b";
    return "c";
  }
  function fitMessage(path, profile) {
    if (path.cost > profile.budget) return money(path.cost - profile.budget) + " above your budget";
    if (profile.earnSoon && path.id !== "c") return "A longer route before testing new income";
    if (profile.hours < 6 && path.id === "a") return "Needs a longer study timeline";
    return "Within your budget · flexible learning";
  }
  function recommendationReason(profile) {
    var path = pathById(recommend(profile));
    if (path.cost > profile.budget) return "Even the smallest sample route exceeds this budget. Explore free introductory learning before committing to any paid option.";
    if (profile.earnSoon) return "Try a smaller reporting project sooner while protecting your existing income. Paid work is not guaranteed.";
    if (profile.hours < 6) return "A gradual route is easier to fit around your week. All timelines have been extended for your available study time.";
    if (profile.budget < 48000) return "A lower-cost route leaves more room in your budget while building on your operations experience.";
    if (profile.goal === "Business analyst") return "Business operations builds on your current experience and aligns with your business analyst goal.";
    if (profile.goal === "Reporting specialist") return "Practical reporting projects give you a focused starting point for your reporting specialist goal.";
    return "Part-time learning gives you a route into data analytics while keeping your current job and staying close to home.";
  }

  /* ---------------- store (mirrors DemoContext, persisted for web) ---------------- */
  var KEY = "pathwise-web-v1";
  function freshState() {
    return { profile: JSON.parse(JSON.stringify(INITIAL_PROFILE)), activePath: "a", saved: [], completed: [], started: false, revision: 0 };
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return freshState();
      var s = JSON.parse(raw);
      if (!s.profile || !s.profile.goal) return freshState();
      return s;
    } catch (e) { return freshState(); }
  }
  var state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function resetStore() { state = freshState(); save(); _adv = null; _whatif = null; _edit = null; _expanded = null; }

  /* ---------------- Tailwind component class shortcuts ---------------- */
  var B = "inline-flex items-center justify-center gap-2.5 rounded-[17px] min-h-[52px] px-[22px] py-3.5 text-sm font-bold no-underline transition active:scale-[.985] cursor-pointer border border-transparent disabled:opacity-45 disabled:cursor-not-allowed";
  var BP = B + " bg-teal text-white hover:bg-teal-dark";
  var BS = B + " bg-mint text-teal border-[#C5DED3] hover:bg-[#cfe7da]";
  var BG = B + " bg-transparent text-teal";
  var BW = B + " bg-white text-teal border-line hover:bg-faded";
  var BSM = " min-h-[44px] px-4 py-2 text-[13px] rounded-[13px]";
  var IB = "w-12 h-12 rounded-2xl inline-grid place-items-center border border-line bg-white cursor-pointer shrink-0 text-ink hover:bg-faded";
  var CARD = "bg-white border border-line rounded-[22px] p-[22px] shadow-card";
  var MICRO = "text-xs text-mute";
  var LEAD = "text-mute text-[17px] leading-[1.65] mb-[22px] max-w-[34rem]";
  var KICK = "text-xs font-extrabold tracking-[.14em] uppercase text-teal mb-2.5";
  var HSEC = "font-extrabold tracking-[-1.2px] leading-[1.12] mb-3 text-[clamp(28px,3.4vw,40px)]";
  var HDISP = "font-extrabold tracking-[-2.2px] leading-[1.04] my-5 text-[clamp(40px,5.4vw,64px)]";
  var FLD = "block font-bold mt-[22px] mb-2.5";
  var INP = "w-full bg-white border border-line rounded-[14px] min-h-[52px] px-4 py-3 text-sm text-ink";
  var CTA = "flex flex-col sm:flex-row gap-3 sm:items-center sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto";
  var WRAP = "mx-auto max-w-[1120px] px-4 md:px-[22px]";
  var PH1 = "font-extrabold tracking-[-1px] leading-[1.12] m-0 text-[clamp(28px,3vw,36px)]";

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function toast(msg) {
    var root = document.getElementById("toast-root");
    root.innerHTML = '<div class="fixed left-1/2 bottom-24 -translate-x-1/2 bg-deep text-white px-[18px] py-3 rounded-[14px] text-[13.5px] font-semibold z-[120] shadow-pop" role="status">' + esc(msg) + "</div>";
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { root.innerHTML = ""; }, 2200);
  }

  var ICONS = {
    path: '<path d="M6 20 C6 14 7 13 10 13 C14 13 11 8 15 8 C18 8 19 6 19 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="6" cy="20" r="2.2" fill="currentColor"/><circle cx="19" cy="4" r="2.2" fill="currentColor"/>',
    arrow: '<path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    clock: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    rupee: '<path d="M6 4h12M6 8.5h12M6 4c6 0 9 2 9 5s-3 4.5-6 4.5L17 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    pin: '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="2"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 20.5V5.5M20 18v3H6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    briefcase: '<rect x="3.5" y="7.5" width="17" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" fill="none" stroke="currentColor" stroke-width="2"/>',
    graduation: '<path d="M12 4L2.5 8.5 12 13l9.5-4.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M6.5 10.5V15c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5M21.5 8.5V14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    compass: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    sparkle: '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4zM19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z" fill="currentColor"/>',
    sliders: '<path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="7" r="2.4" fill="#fff" stroke="currentColor" stroke-width="2"/><circle cx="15" cy="12" r="2.4" fill="#fff" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="17" r="2.4" fill="#fff" stroke="currentColor" stroke-width="2"/>',
    bookmark: '<path d="M7 3.5h10a1 1 0 0 1 1 1V21l-6-3.8L6 21V4.5a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    bookmarkFill: '<path d="M7 3.5h10a1 1 0 0 1 1 1V21l-6-3.8L6 21V4.5a1 1 0 0 1 1-1z" fill="currentColor"/>',
    info: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1.3" fill="currentColor"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    flag: '<path d="M6 21V4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 4.5h11l-2.5 3.5L17 11.5H6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    down: '<path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    chevron: '<path d="M9.5 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    back: '<path d="M20 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    send: '<path d="M21 3L10.5 13.5M21 3l-7 18-3.5-7.5L3 10z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    camera: '<path d="M4 8h3l2-2.5h6L17 8h3a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 19V9.5A1.5 1.5 0 0 1 4 8z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="14" r="3.4" fill="none" stroke="currentColor" stroke-width="2"/>',
    minus: '<path d="M6 12h12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    plus: '<path d="M12 6v12M6 12h12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    home: '<path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    user: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    note: '<path d="M5 4h14v12H9l-4 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 9h6M9 12.5h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    external: '<path d="M9 5H5v14h14v-4M14 4h6v6M20 4l-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    reset: '<path d="M4 5v6h6M4.5 11a8 8 0 1 1-1 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    shield: '<path d="M12 3l7.5 3v6c0 4.5-3.2 7.3-7.5 9-4.3-1.7-7.5-4.5-7.5-9V6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 12l2.2 2.2L15.5 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    bulb: '<path d="M9.5 18h5M10.5 21h3M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.2 1.3 2.2h4.6c.2-1 .6-1.6 1.3-2.2A6 6 0 0 0 12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor"/>'
  };
  function icon(name, size) {
    size = size || 18;
    var body = ICONS[name] || ICONS.info;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="shrink-0">' + body + "</svg>";
  }
  function pill(text, opts) {
    opts = opts || {};
    var cls = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold max-w-full " +
      (opts.white ? "bg-white text-mute border border-line" : opts.sand ? "bg-sand text-honey" : opts.deep ? "bg-[#315B47] text-[#DBF0D7]" : "bg-mint text-teal");
    return '<span class="' + cls + '">' + (opts.icon ? icon(opts.icon, 13) : "") + "<span>" + text + "</span></span>";
  }
  function notice(text, warning) {
    return '<div class="flex gap-2.5 items-start rounded-[14px] p-3.5 text-[13.5px] font-medium ' + (warning ? "bg-sand text-honey" : "bg-mint text-teal") + '" role="note">' + icon("info", 17) + "<span>" + text + "</span></div>";
  }
  function journeySVG() {
    return '<svg viewBox="0 0 350 270" width="100%" height="250" role="img" aria-label="Three possible routes branch from your experience toward a new career">' +
      '<defs><linearGradient id="trail" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ABD1BC"/><stop offset="1" stop-color="#116B5A"/></linearGradient></defs>' +
      '<circle cx="178" cy="141" r="108" fill="none" stroke="#DCE8DF" stroke-width="1" stroke-dasharray="3 8"/>' +
      '<circle cx="178" cy="141" r="73" fill="none" stroke="#E3EDE6" stroke-width="1"/>' +
      '<path d="M65 235 C65 182 70 170 128 170 C196 170 132 87 208 87 C259 87 274 71 274 35" fill="none" stroke="#E1EEE5" stroke-width="20" stroke-linecap="round"/>' +
      '<path d="M65 235 C65 182 70 170 128 170 C196 170 132 87 208 87 C259 87 274 71 274 35" fill="none" stroke="url(#trail)" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M127 170 C200 170 237 182 274 151" fill="none" stroke="#98B5AA" stroke-width="2" stroke-dasharray="5 6" stroke-linecap="round"/>' +
      '<path d="M168 120 C110 114 96 85 90 60" fill="none" stroke="#B7C4C9" stroke-width="2" stroke-dasharray="5 6" stroke-linecap="round"/>' +
      '<circle cx="65" cy="235" r="7" fill="#116B5A" stroke="white" stroke-width="3"/>' +
      '<circle cx="128" cy="170" r="7" fill="white" stroke="#116B5A" stroke-width="3"/>' +
      '<circle cx="208" cy="87" r="7" fill="white" stroke="#116B5A" stroke-width="3"/>' +
      '<circle cx="274" cy="35" r="19" fill="#116B5A"/>' +
      '<path d="M266 35 L272 41 L282 29" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="274" cy="151" r="5" fill="#B1C5BA"/><circle cx="90" cy="60" r="5" fill="#C1CDD2"/>' +
      "</svg>";
  }
  function timeline(compact) {
    var steps = ["Your strengths", "New skills", "New chapter"];
    var out = steps.map(function (l, i) {
      var dot = i === 0
        ? '<span class="w-[26px] h-[26px] rounded-full grid place-items-center bg-[#CCE8B5] border border-[#CCE8B5] text-deep">' + icon("check", 12) + "</span>"
        : '<span class="w-[26px] h-[26px] rounded-full grid place-items-center border border-[#729584] text-[#C2D5C9]">' + icon(i === 1 ? "book" : "flag", 12) + "</span>";
      return (i > 0 ? '<div class="flex-1 h-px bg-[#638773] mt-[13px]"></div>' : "") +
        '<div class="flex-[2] flex flex-col items-center gap-2 text-center">' + dot + '<span class="text-[10.5px] text-[#C2D5C9]">' + l + "</span></div>";
    }).join("");
    return '<div class="flex items-start ' + (compact ? "my-0" : "my-[22px] mx-0 mb-2") + '">' + out + "</div>";
  }

  /* ---------------- per-page ephemeral UI state ---------------- */
  var _adv = null, _whatif = null, _exp = { filter: "All", q: "", savedOnly: false }, _compare = false, _expanded = null, _edit = null, _menu = false, _confirmReset = false, _camera = false;

  function freshAdvisor() {
    return { draft: JSON.parse(JSON.stringify(state.profile)), stage: "goal", order: ["goal", "priority", "budget", "time", "support", "review"], reply: "", text: "", hint: "", voice: false };
  }
  function freshWhatIf() { return { draft: JSON.parse(JSON.stringify(state.profile)), preview: false }; }

  /* ---------------- actions ---------------- */
  function doStart() { state.started = true; save(); }
  function doProfile(p) { state.profile = JSON.parse(JSON.stringify(p)); state.activePath = recommend(p); state.revision++; save(); }
  function doScenario(p) { state.profile = JSON.parse(JSON.stringify(p)); state.activePath = recommend(p); state.revision++; save(); }
  function doPath(id) { state.activePath = id; save(); }
  function doSave(id) {
    var i = state.saved.indexOf(id);
    if (i >= 0) state.saved.splice(i, 1); else state.saved.push(id);
    save();
  }
  function doTask(id) {
    var i = state.completed.indexOf(id);
    if (i >= 0) state.completed.splice(i, 1); else state.completed.push(id);
    save();
  }

  /* ---------------- chrome ---------------- */
  var TABS = [
    { href: "#/home", label: "Home", ic: "home", key: "home" },
    { href: "#/paths", label: "Paths", ic: "path", key: "paths" },
    { href: "#/explore", label: "Explore", ic: "compass", key: "explore" },
    { href: "#/profile", label: "Profile", ic: "user", key: "profile" }
  ];
  function topbar(active) {
    var links = TABS.map(function (t) {
      return '<a href="' + t.href + '" class="no-underline text-mute font-semibold text-[13.5px] px-3.5 py-2.5 rounded-xl min-h-[44px] inline-flex items-center hover:bg-faded hover:text-ink' + (active === t.key ? " bg-mint text-teal" : "") + '">' + esc(t.label) + "</a>";
    }).join("") + '<a href="#/next-steps" class="no-underline text-mute font-semibold text-[13.5px] px-3.5 py-2.5 rounded-xl min-h-[44px] inline-flex items-center hover:bg-faded hover:text-ink' + (active === "steps" ? " bg-mint text-teal" : "") + '">Next steps</a>';
    return '<header class="sticky top-0 z-50 bg-mist/90 backdrop-blur-md border-b border-line"><div class="mx-auto max-w-[1120px] px-4 md:px-[22px] py-3 flex items-center gap-3.5">' +
      '<a class="flex items-center gap-2.5 no-underline text-ink font-extrabold text-[21px] tracking-[-.7px]" href="#/" aria-label="Pathwise home"><span class="w-9 h-9 rounded-xl bg-teal grid place-items-center shrink-0 text-white">' + icon("path", 22) + '</span><span>pathwise<span class="block text-[10px] font-semibold tracking-[.14em] uppercase text-mute">Your next chapter</span></span></a>' +
      '<nav class="hidden lg:flex gap-1 ml-2" aria-label="Primary">' + links + "</nav>" +
      '<div class="ml-auto flex gap-2.5 items-center">' +
      '<a class="' + BS + BSM + ' max-md:hidden" href="#/what-if">' + icon("sliders", 16) + "<span>What if?</span></a>" +
      '<a class="' + BP + BSM + '" href="#/advisor">' + icon("sparkle", 16) + "<span>Advisor</span></a>" +
      '<button class="' + IB + ' lg:hidden" aria-label="Open menu" onclick="PW.menu(true)">' + icon("sliders", 20) + "</button>" +
      "</div></div></header>";
  }
  function tabbar(active) {
    return '<nav class="flex lg:hidden fixed left-3 right-3 bottom-3 z-[60] bg-white border border-line rounded-[22px] p-2 shadow-pop" aria-label="App tabs">' + TABS.map(function (t) {
      return '<a href="' + t.href + '" class="flex-1 flex flex-col items-center gap-[3px] no-underline text-mute text-[10.5px] font-bold p-2 rounded-[14px] min-h-[56px] justify-center' + (active === t.key ? " bg-mint text-teal" : "") + '">' + icon(t.ic, 22) + "<span>" + esc(t.label) + "</span></a>";
    }).join("") + "</nav>";
  }
  function footer() {
    return '<footer class="border-t border-line mt-[60px] pt-[34px] pb-[130px] lg:pb-[110px] text-mute text-[13px]"><div class="mx-auto max-w-[1120px] px-4 md:px-[22px] flex gap-5 justify-between flex-wrap">' +
      '<div class="max-w-[34rem]"><div class="flex gap-2.5 items-center mb-2.5"><span class="w-[30px] h-[30px] rounded-[10px] bg-teal grid place-items-center text-white">' + icon("path", 18) + '</span><b class="text-ink">pathwise</b></div>' +
      "<p class='m-0'>Calm, interactive prototype for a career pathway advisor. All people, providers, listings, costs and timelines are illustrative samples — not verified opportunities, guaranteed employment, or scholarship decisions. No live AI, recording, application submission or enrollment.</p>" +
      '<p class="text-xs mt-2.5">Frontend-only hackathon prototype · styled with Tailwind CSS · <a class="text-teal" href="#/profile">Reset demo</a> restores Priya\u2019s starting journey.</p></div>' +
      '<div class="flex gap-[26px] flex-wrap"><div><b class="text-ink">Demo</b><br><a class="text-teal" href="#/advisor">Advisor chat</a><br><a class="text-teal" href="#/paths">Compare paths</a><br><a class="text-teal" href="#/what-if">What-if simulator</a><br><a class="text-teal" href="#/explore">Explore</a></div>' +
      '<div><b class="text-ink">Progress</b><br><a class="text-teal" href="#/next-steps">Next steps</a><br><a class="text-teal" href="#/profile">Profile</a><br><a class="text-teal" href="#/edit-profile">Edit profile</a></div></div>' +
      "</div></footer>";
  }
  function sideNav(active) {
    var link = function (href, key, ic, label) {
      return '<a href="' + href + '" class="flex gap-3 items-center px-3.5 py-3 rounded-[14px] no-underline text-mute font-bold text-sm min-h-[52px] hover:bg-faded hover:text-ink' + (active === key ? " bg-mint text-teal" : "") + '">' + icon(ic, 20) + "<span>" + label + "</span></a>";
    };
    var p = state.profile;
    return '<aside class="hidden lg:flex sticky top-[76px] bg-white border border-line rounded-[22px] p-3.5 flex-col gap-1.5" aria-label="Demo navigation">' +
      link("#/home", "home", "home", "Home") + link("#/paths", "paths", "path", "Paths") +
      link("#/explore", "explore", "compass", "Explore") + link("#/profile", "profile", "user", "Profile") +
      link("#/next-steps", "steps", "check", "Next steps") + link("#/advisor", "advisor", "sparkle", "Advisor") + link("#/what-if", "whatif", "sliders", "What if?") +
      '<div class="mt-2.5 bg-mist border border-line rounded-2xl p-3.5 text-[12.5px] text-mute"><b class="text-ink">' + esc(p.name) + " · " + esc(p.goal) + "</b><br>" + esc(money(p.budget)) + " · " + esc(String(p.hours)) + ' hrs/wk<br>Active: <b class="text-ink">' + esc(pathById(state.activePath).label) + "</b></div>" +
      "</aside>";
  }
  function appShell(active, inner) {
    return topbar(active) + '<div class="mx-auto max-w-[1120px] px-4 md:px-[22px] py-[26px] pb-[100px] grid gap-[26px] items-start lg:grid-cols-[230px_1fr]">' + sideNav(active) + '<main id="main" class="min-w-0 fade">' + inner + "</main></div>" + tabbar(active) + footer() + mobileMenu();
  }
  function landingShell(inner) {
    return topbar("") + '<main id="main" class="fade">' + inner + "</main>" + tabbar("") + footer() + mobileMenu();
  }
  function mobileMenu() {
    if (!_menu) return "";
    var link = function (href, ic, label) {
      return '<a href="' + href + '" onclick="PW.menu(false)" class="flex p-3.5 rounded-xl no-underline text-ink font-bold min-h-[52px] items-center gap-2.5 hover:bg-faded">' + icon(ic, 20) + "<span>" + label + "</span></a>";
    };
    return '<div class="fixed inset-0 z-[90] bg-[rgba(12,34,27,.45)]" onclick="if(event.target===this)PW.menu(false)"><div class="bg-white rounded-t-[22px] absolute left-0 right-0 bottom-0 p-[18px]" role="dialog" aria-label="Menu">' +
      link("#/home", "home", "Home") + link("#/paths", "path", "Paths") + link("#/explore", "compass", "Explore") + link("#/profile", "user", "Profile") +
      link("#/next-steps", "check", "Next steps") + link("#/advisor", "sparkle", "Advisor") + link("#/what-if", "sliders", "What if?") +
      '<button class="' + BG + ' w-full" onclick="PW.menu(false)">Close</button></div></div>';
  }

  /* ---------------- views ---------------- */
  function vLanding() {
    var p = state.profile;
    var active = pathById(state.activePath);
    var rec = recommend(p);
    var cards = PATHWAYS.map(function (pw, i) {
      var fit = fitMessage(pw, p);
      var warn = pw.cost > p.budget;
      var bg = ["#DDEFE8", "#DCE8ED", "#F4ECD9"][i];
      return '<article class="' + CARD + (rec === pw.id ? " border-teal border-[1.5px]" : "") + '">' +
        '<div class="flex gap-2.5 items-center mb-3"><span class="w-[34px] h-[34px] rounded-[11px] grid place-items-center font-extrabold text-[13px]" style="background:' + bg + '">' + pw.id.toUpperCase() + '</span><span class="' + MICRO + '">' + esc(pw.tag) + "</span>" +
        (rec === pw.id ? '<span class="ml-auto">' + pill("Suggested", { icon: "sparkle" }) + "</span>" : "") + "</div>" +
        '<h3 class="m-0 text-[20px] leading-[1.3] font-extrabold tracking-[-.4px]">' + esc(pw.title) + "</h3>" +
        '<p class="' + MICRO + ' mt-0.5 mb-2">' + esc(pw.subtitle) + "</p>" +
        '<p class="my-2 text-mute text-sm">' + esc(pw.description) + "</p>" +
        '<div class="flex gap-[18px] items-center mt-4 font-semibold text-[13.5px] flex-wrap"><span class="inline-flex gap-1.5 items-center text-mute font-semibold">' + icon("rupee", 15) + esc(money(pw.cost)) + '</span><span class="inline-flex gap-1.5 items-center text-mute font-semibold">' + icon("clock", 15) + esc(String(duration(pw, p))) + " months</span></div>" +
        '<div class="text-xs font-bold mt-3 ' + (warn ? "text-honey" : "text-teal") + '">' + esc(fit) + "</div>" +
        '<div class="mt-4"><a class="' + BS + BSM + ' w-full" href="#/pathway/' + pw.id + '">Explore ' + esc(pw.label) + " " + icon("arrow", 15) + "</a></div></article>";
    }).join("");

    var opps = OPPORTUNITIES.slice(0, 3).map(function (o) {
      var bg = o.kind === "Course" ? "#DCE8ED" : o.kind === "Job" ? "#F4ECD9" : "#EAE6F1";
      var icn = o.kind === "Course" ? "book" : o.kind === "Job" ? "briefcase" : "graduation";
      return '<article class="' + CARD + '"><div class="flex gap-2.5 items-center mb-2.5"><span class="w-[46px] h-[46px] rounded-[14px] grid place-items-center shrink-0 text-ink" style="background:' + bg + '">' + icon(icn, 22) + "</span>" + pill(esc(o.kind), { white: true }) + "</div>" +
        '<h3 class="m-0 text-[17px] font-extrabold tracking-[-.4px]">' + esc(o.title) + "</h3>" + '<p class="' + MICRO + ' mt-1">' + esc(o.provider) + " · " + esc(o.location) + "</p>" +
        '<div class="flex gap-[18px] items-center mt-4 font-semibold text-[13.5px]"><span class="text-ink">' + esc(o.cost) + '</span><span class="text-mute">' + esc(o.time) + "</span></div></article>";
    }).join("");

    var done = state.completed.length;
    return '<div class="' + WRAP + '"><section class="py-14 md:py-[56px] md:pt-[56px] pt-9 grid gap-11 items-center lg:grid-cols-[1.05fr_.95fr]">' +
      '<div><span class="inline-flex items-center gap-2 bg-white border border-line rounded-full px-3.5 py-[7px] text-xs font-semibold text-mute"><span class="w-2 h-2 rounded-full bg-teal"></span>Frontend-only hackathon prototype · Tailwind CSS · same journey as the mobile app</span>' +
      "<h1 class='" + HDISP + "'>Your next chapter<br>starts with you.</h1>" +
      '<p class="' + LEAD + '">Big ambitions. Real-life responsibilities. Meet <b class="text-ink">Priya</b>, a retail operations associate in Kochi exploring data analytics — compare <b class="text-ink">three sample routes</b>, preview what-if changes, and take one small step. No account needed.</p>' +
      '<div class="' + CTA + '"><a class="' + BP + '" href="#/advisor">Explore my options ' + icon("arrow", 18) + '</a><a class="' + BS + '" href="#/home">Try the demo</a></div>' +
      '<p class="' + MICRO + ' mt-3">A safe space to explore · Simulated advisor · Illustrative costs &amp; listings</p>' +
      '<div class="flex gap-2.5 flex-wrap my-[18px]">' + pill(money(p.budget) + " budget", { icon: "rupee", white: true }) + pill(p.hours + " hrs / week", { icon: "clock", white: true }) + pill(p.relocate ? "Open to moving" : "Stay near home", { icon: "pin", white: true }) + "</div></div>" +
      '<div><div class="bg-white border border-line rounded-[26px] shadow-pop overflow-hidden"><div class="bg-deep text-[#dcebe2] p-[22px]">' +
      '<div class="flex justify-between items-center mb-3.5">' + pill("Your next chapter", { deep: true, icon: "path" }) + '<span class="opacity-80">' + icon("external", 18) + "</span></div>" +
      '<div class="text-[26px] font-extrabold tracking-[-.8px] text-white leading-tight">' + esc(active.title) + '</div><div class="text-[13px] text-[#BCD0C6] mt-1.5">' + esc(active.subtitle) + "</div>" +
      timeline(false) +
      '<div class="flex gap-4 border-t border-[#3B5E4E] pt-3.5 text-[13px] flex-wrap"><span class="inline-flex items-center gap-1.5">' + icon("clock", 14) + " " + duration(active, p) + ' months</span><span>' + esc(money(active.cost)) + ' est.</span><span class="text-[#CCE8B5] font-bold">' + esc(active.label) + "</span></div>" +
      '</div><div class="p-[22px]"><div class="bg-gradient-to-b from-white to-[#eef4ef] border border-line rounded-[20px] p-2.5">' + journeySVG() + "</div>" +
      '<div class="flex gap-2.5 mt-3.5 flex-col sm:flex-row"><a class="' + BP + BSM + ' flex-1" href="#/home">Open live demo</a><a class="' + BW + BSM + ' flex-1" href="#/paths">Compare 3 routes</a></div>' +
      '<p class="' + MICRO + ' text-center mt-3 mb-0">Sample journey · ' + esc(String(done)) + " of 4 first steps complete</p></div></div></div>" +
      "</section>" +

      '<section class="pt-[54px] pb-2"><div class="' + KICK + '">How the demo works</div><h2 class="' + HSEC + '">One goal. A plan. And a backup plan.</h2>' +
      '<p class="' + LEAD + '">Five minutes, end to end — the same flow as the phone app, laid out for a bigger screen.</p>' +
      '<div class="grid gap-3.5 mt-[22px] sm:grid-cols-2 lg:grid-cols-4">' +
      [["1", "Talk it through", "Answer 5 gentle questions. Family time asks about hours before budget."], ["2", "Compare 3 routes", "Plan A deepens technical skills, B builds on operations, C starts smaller."], ["3", "Preview change", "Lower the budget or hours. Apply or discard — nothing changes silently."], ["4", "Take one step", "Check off a 5-minute task, save an opportunity, edit your profile."]].map(function (s) {
        return '<div class="bg-white border border-line rounded-[18px] p-[18px]"><b class="grid w-8 h-8 rounded-[10px] bg-mint text-teal place-items-center mb-3">' + s[0] + "</b><div class='font-extrabold text-ink'>" + s[1] + "</div><div class='" + MICRO + " mt-1.5'>" + s[2] + "</div></div>";
      }).join("") + "</div></section>" +

      '<section class="pt-[54px] pb-2"><div class="' + KICK + '">Your possible paths</div><h2 class="' + HSEC + '">A future that fits your life.</h2>' +
      '<p class="' + LEAD + '">You don\u2019t have to start from zero.</p><div class="max-w-[46rem] mb-[18px]">' + notice(esc(recommendationReason(p)), pathById(rec).cost > p.budget) + "</div>" +
      '<div class="grid gap-4 md:grid-cols-3">' + cards + "</div>" +
      '<div class="' + CTA + ' mt-[18px]"><a class="' + BS + '" href="#/paths">Open comparison ' + icon("arrow", 17) + '</a><a class="' + BG + '" href="#/what-if">' + icon("sliders", 17) + " What if my situation changes?</a></div></section>" +

      '<section class="pt-[54px] pb-2"><div class="bg-deep text-[#e7f0e9] rounded-[26px] p-7 md:p-[30px] grid gap-6 md:grid-cols-[1.2fr_.8fr] items-center relative overflow-hidden"><div><div class="text-xs font-extrabold tracking-[.14em] uppercase text-[#CCE8B5] mb-2.5">Guided conversation</div><h2 class="text-white m-0 mb-2.5 font-extrabold tracking-[-1.2px] leading-[1.12] text-[clamp(28px,3.4vw,40px)]">Let\u2019s think it through.</h2><p class="text-[#bcd0c6] m-0 mb-[18px]">Your advisor is a tap away — branching questions, typed answers, a sample voice demo and a camera placeholder. Explicitly simulated, never recorded.</p>' +
      '<div class="' + CTA + '"><a class="' + BP + '" href="#/advisor">Start the conversation ' + icon("arrow", 17) + "</a></div></div>" +
      '<div class="' + CARD + ' border-0"><b class="text-ink">What it asks</b><div class="' + MICRO + ' my-1.5 mb-3">Goal → priority → budget → time → support → review</div>' +
      ["Data analyst · Business analyst · Reporting specialist", "\u20B960,000 · \u20B920,000 · \u20B98,000 start", "8 · 4 · 12 hours a week"].map(function (t) { return '<div class="flex gap-2 items-center py-2 border-t border-line text-[13.5px] text-ink"><span class="text-teal">' + icon("check", 15) + "</span><span>" + t + "</span></div>"; }).join("") + "</div></div></section>" +

      '<section class="pt-[54px] pb-2"><div class="' + KICK + '">Explore</div><h2 class="' + HSEC + '">Your experience opens doors.</h2><p class="' + LEAD + '">Illustrative courses, a job example and a fellowship — search, filter, save.</p><div class="grid gap-4 md:grid-cols-3">' + opps + '</div><div class="' + CTA + ' mt-[18px]"><a class="' + BS + '" href="#/explore">Browse all examples ' + icon("arrow", 17) + "</a></div></section>" +

      '<section class="pt-[54px] pb-2"><div class="grid gap-4 md:grid-cols-2"><div class="' + CARD + ' bg-mint border-mint"><div class="' + KICK + '">Your next small step</div><h3 class="text-[24px] m-0 font-extrabold text-ink">Small steps. A different tomorrow.</h3><p class="text-sm text-ink mt-2">' + esc(String(done)) + " of 4 complete · " + (done === 4 ? "A strong start. Take a moment to recognise it." : "A little progress is still progress.") + '</p><div class="flex gap-1.5 my-3.5">' + TASKS.map(function (t) { return '<i class="flex-1 h-[7px] rounded-full ' + (state.completed.indexOf(t.id) >= 0 ? "bg-teal" : "bg-[#BCD5C6]") + '"></i>'; }).join("") + '</div><a class="' + BP + BSM + '" href="#/next-steps">Continue steps ' + icon("arrow", 15) + "</a></div>" +
      '<div class="' + CARD + ' bg-deep border-deep"><div class="text-xs font-extrabold tracking-[.14em] uppercase text-[#CCE8B5] mb-2.5">The person behind the plan</div><h3 class="text-white text-[24px] m-0 font-extrabold">' + esc(p.name) + " · " + esc(p.role) + '</h3><p class="text-[#bcd0c6] text-sm">' + esc(p.location) + " · Goal: " + esc(p.goal) + "</p>" +
      '<div class="flex gap-2 flex-wrap my-3">' + p.strengths.map(function (s) { return pill(esc(s), { white: true }); }).join("") + '</div><a class="' + BS + BSM + '" href="#/profile">View profile</a></div>' +
      "</div></section>" +

      '<section class="pt-[54px] pb-2"><div class="' + CARD + '">' + notice("Illustrative costs and timelines. Outcomes are not guaranteed. Organisations, fees and openings are sample content, not verified listings.") + '<p class="' + MICRO + ' mt-3 mb-0">Prototype boundaries: no live AI, recording, emotion analysis, application submission or enrollment. Changes persist in this browser until you use Reset demo.</p></div></section></div>';
  }

  function vAdvisor() {
    if (!_adv) _adv = freshAdvisor();
    var a = _adv;
    var isReview = a.stage === "review";
    var q = QUESTIONS[a.stage];
    var stepNum = a.order.indexOf(a.stage) + 1;

    var convo = "";
    if (a.reply) convo += '<div class="flex justify-end"><div class="bg-mint text-teal px-4 py-[11px] rounded-2xl rounded-br-[4px] text-[13px] font-semibold max-w-[90%] mb-[18px]">' + esc(a.reply) + "</div></div>";

    if (isReview) {
      var d = a.draft;
      var rows = [
        ["flag", "Your next chapter", d.goal],
        ["rupee", "Learning budget", money(d.budget)],
        ["clock", "Your own pace", d.hours + " hours a week"],
        ["heart", "Support that fits", d.support.join(", ") || "Not shared"]
      ].map(function (r) {
        return '<div class="flex gap-3 items-start"><span class="text-teal">' + icon(r[0], 20) + '</span><span class="flex-1"><span class="' + MICRO + '">' + r[1] + '</span><br><b class="text-ink">' + esc(r[2]) + "</b></span></div>";
      }).join('<div class="h-px bg-line"></div>');
      convo += '<div class="fade"><h1 class="text-[30px] tracking-[-1px] leading-[1.15] m-0 mb-2 font-extrabold">There\u2019s a way forward.<br>Let\u2019s find yours.</h1>' +
        '<p class="text-sm text-mute">Here\u2019s what we\u2019ll build around. You can change any of this later.</p>' +
        '<div class="' + CARD + ' grid gap-4 mt-4">' + rows + "</div>" +
        '<div class="flex gap-2.5 mt-3.5 flex-wrap"><button class="' + BG + '" onclick="PW.advRevisit()">Revisit my answers</button></div>' +
        '<div class="mt-3.5">' + notice("We\u2019ll compare three sample routes. There\u2019s no single \u201Cright\u201D path, and you\u2019re in control of the choice.") + "</div></div>";
    } else {
      convo += '<div class="fade"><div class="' + MICRO + '">Step ' + stepNum + " of 5 · " + esc(a.stage) + "</div>" +
        '<h1 class="text-[27px] tracking-[-.8px] leading-[1.25] my-1.5 mb-2 font-extrabold">' + esc(q.title) + "</h1>" +
        '<p class="text-mute m-0 mb-[18px]">' + esc(q.detail) + "</p>";
      if (a.voice) {
        convo += '<div class="bg-deep text-[#DCEBDD] rounded-[17px] p-[18px] mb-4"><div class="flex gap-1 justify-center items-end h-[34px] mb-3" aria-hidden="true">' + [10, 17, 29, 19, 31, 14, 25, 33, 18, 27, 12, 20, 8].map(function (h) { return '<i class="w-1 rounded bg-[#CBE6BB] block" style="height:' + h + 'px"></i>'; }).join("") + '</div><p class="text-center text-[13px] m-0 mb-3">Sample voice: \u201C' + esc(q.options[0]) + '\u201D</p><button class="' + BS + ' w-full" onclick="PW.advPick(0)">Use this sample answer</button></div>';
      }
      convo += '<div class="grid gap-[9px]">' + q.options.map(function (op, i) {
        return '<button class="choice w-full text-left flex gap-2.5 items-center bg-white border border-line rounded-[14px] px-4 py-3.5 min-h-[52px] text-[13.5px] font-semibold text-ink cursor-pointer hover:border-teal" onclick="PW.advPick(' + i + ')"><span class="flex-1">' + esc(op) + "</span>" + icon("chevron", 16) + "</button>";
      }).join("") + "</div>" +
        '<button class="' + BG + ' mt-2" onclick="PW.advSkip()">Skip this question</button>';
      if (a.hint) convo += '<div class="mt-3">' + notice(esc(a.hint)) + "</div>";
      if (a.stage === "goal") convo += '<p class="' + MICRO + ' text-center">A sample conversation for Priya, a career changer.</p>';
      convo += "</div>";
    }

    var foot = isReview
      ? '<button class="' + BP + ' w-full" onclick="PW.advFinish()">See my possible paths ' + icon("arrow", 18) + "</button>"
      : '<div class="flex gap-2"><div class="flex gap-2.5 items-center bg-white border border-line rounded-[15px] px-3.5 flex-1"><input id="adv-input" aria-label="Your answer" placeholder="Or tell me in your words\u2026" value="' + esc(a.text) + '" oninput="PW.advType(this.value)" onkeydown="if(event.key===\'Enter\')PW.advSend()" class="border-0 outline-none flex-1 min-h-[51px] bg-transparent text-[13.5px] text-ink" /><button class="w-10 h-10 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 text-teal hover:bg-faded" aria-label="Send answer" onclick="PW.advSend()">' + icon("send", 18) + "</button></div>" +
        '<button class="w-12 h-12 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 bg-teal text-white border border-teal hover:bg-teal-dark" aria-label="Try sample voice" onclick="PW.advVoice()">' + icon(a.voice ? "close" : "mic", 20) + "</button></div>" +
        '<p class="' + MICRO + ' text-center mt-2.5 mb-0">Simulated advisor · no recording or AI connection</p>';

    return '<div class="mb-4"><a class="' + BW + BSM + '" href="#/">' + icon("back", 16) + " Home</a></div>" +
      '<div class="flex gap-3.5 items-start justify-between mb-[18px]"><div><h1 class="' + PH1 + '">A little space for you</h1><p class="text-mute mt-2">Branching sample conversation · adaptive order · optional support</p></div>' +
      '<button class="' + IB + '" aria-label="Preview camera interaction" onclick="PW.camera(true)">' + icon("camera", 20) + "</button></div>" +
      '<div class="grid gap-5 items-start xl:grid-cols-[1fr_360px]"><div class="' + CARD + '">' +
      '<div class="flex gap-2.5 items-center mb-4"><span class="w-[52px] h-[52px] rounded-full bg-teal grid place-items-center text-[#EAF2DE] shrink-0">' + icon("sparkle", 26) + '</span><span><b class="text-ink">Your Pathwise advisor</b><br><span class="' + MICRO + '">Demo · simulated</span></span></div>' +
      convo + '<div class="sticky bottom-0 bg-white pt-3.5 border-t border-line mt-[18px]">' + foot + "</div></div>" +
      '<aside class="' + CARD + '"><b class="text-ink">What this demo shows</b><div class="' + MICRO + ' my-1.5 mb-3">Same logic as the phone app</div>' +
      ["Choosing family time asks about study hours before budget.", "Typed answers map to the closest choice; anything else guides you back.", "Voice plays a sample transcript — nothing is recorded.", "Camera opens a placeholder — no device access used.", "Support questions are optional and skippable."].map(function (t) { return '<div class="flex gap-2 p-2 px-0 border-t border-line text-[13px] text-mute"><span class="text-teal">' + icon("check", 15) + "</span><span>" + t + "</span></div>"; }).join("") +
      '<a class="' + BS + BSM + ' w-full mt-3" href="#/home">Skip to demo home</a></aside></div>' +
      cameraModal();
  }
  function cameraModal() {
    if (!_camera) return "";
    return '<div class="fixed inset-0 bg-[rgba(12,34,27,.45)] grid place-items-center p-[22px] z-[100]" onclick="if(event.target===this)PW.camera(false)"><div class="bg-white rounded-3xl p-[26px] max-w-[420px] w-full shadow-pop" role="dialog" aria-modal="true" aria-label="Camera preview placeholder"><h3 class="mt-0 text-ink font-extrabold text-[19px]">A more personal conversation</h3>' +
      '<div class="h-[150px] rounded-[18px] bg-mint grid place-items-center my-3.5 text-teal text-center"><div>' + icon("camera", 40) + '<div class="' + MICRO + ' mt-2">Camera preview placeholder</div></div></div>' +
      '<p class="text-mute text-sm">In a full app, you could choose to add a camera view. This prototype does not use your camera or interpret expressions.</p>' +
      '<button class="' + BP + ' w-full" onclick="PW.camera(false)">Continue without camera</button></div></div>';
  }

  function vHome() {
    var p = state.profile;
    var path = pathById(state.activePath);
    var next = null;
    for (var i = 0; i < TASKS.length; i++) if (state.completed.indexOf(TASKS[i].id) < 0) { next = TASKS[i]; break; }
    var stepBox = next
      ? '<div class="' + CARD + '"><div class="flex gap-3 items-start"><span class="bg-sand p-[11px] rounded-[13px] text-honey">' + icon("note", 21) + '</span><span class="flex-1"><b class="text-ink">' + esc(next.title) + '</b><br><span class="' + MICRO + '">' + esc(next.time) + " · At your own pace</span></span></div>" +
        '<a class="' + BS + BSM + ' w-full mt-3.5" href="#/next-steps">Take this step ' + icon("arrow", 15) + "</a></div>"
      : '<div class="' + CARD + ' bg-mint border-mint"><b class="text-ink">Look at the progress you\u2019ve made.</b><p class="text-sm mt-1">Your first four steps are complete. Explore opportunities when you\u2019re ready.</p><a class="' + BP + BSM + '" href="#/explore">Explore opportunities</a></div>';
    return '<div class="flex gap-3.5 items-start justify-between mb-[18px]"><div><div class="' + MICRO + '">A little progress, every day.</div><h1 class="' + PH1 + '">Hello, ' + esc(p.name) + "</h1></div>" +
      '<a class="' + IB + '" href="#/what-if" aria-label="Explore what-if changes">' + icon("sliders", 20) + "</a></div>" +
      '<h2 class="' + HSEC + '">A future that fits your life.</h2><p class="' + LEAD + '">You don\u2019t have to start from zero.</p>' +
      '<a href="#/pathway/' + path.id + '" class="no-underline text-inherit block"><div class="bg-deep text-[#e7f0e9] rounded-[26px] p-7 md:p-[30px] grid gap-6 md:grid-cols-[1.2fr_.8fr] items-center relative overflow-hidden cursor-pointer"><div>' +
      '<div class="flex justify-between items-center mb-3.5">' + pill("Your next chapter", { deep: true, icon: "path" }) + '<span class="opacity-70">' + icon("external", 18) + "</span></div>" +
      '<h2 class="text-white m-0 mb-2.5 font-extrabold tracking-[-.8px] leading-[1.12] text-[30px]">' + esc(path.title) + '</h2><p class="text-[#bcd0c6] m-0">' + esc(path.subtitle) + "</p>" +
      timeline(false) +
      '<div class="flex gap-4 border-t border-[#3B5E4E] pt-3.5 text-[13px] flex-wrap"><span class="inline-flex items-center gap-1.5">' + icon("clock", 14) + " " + duration(path, p) + ' months</span><span>' + esc(money(path.cost)) + ' est.</span><span class="text-[#CCE8B5] font-bold">' + esc(path.label) + "</span></div>" +
      '</div><div><div class="bg-gradient-to-b from-white to-[#eef4ef] border border-line rounded-[20px] p-2.5">' + journeySVG() + "</div></div></div></a>" +
      '<a href="#/paths" class="flex justify-between items-center px-1 py-[18px] no-underline font-bold text-teal"><span class="inline-flex items-center gap-2">' + icon("path", 18) + " One goal. Three possible routes.</span>" + icon("arrow", 18) + "</a>" +
      '<div class="grid gap-4 md:grid-cols-2"><div><div class="flex justify-between items-center my-1.5 mb-3"><h3 class="m-0 text-ink font-extrabold text-[19px]">Your next small step</h3><a href="#/next-steps" class="text-[13px] font-bold text-teal">View all</a></div>' + stepBox + "</div>" +
      '<div><div class="flex justify-between items-center my-1.5 mb-3"><h3 class="m-0 text-ink font-extrabold text-[19px]">Let\u2019s think it through.</h3></div><div class="' + CARD + ' bg-[#E8EDE4]"><div class="flex gap-3 items-center"><span class="w-11 h-11 rounded-full bg-[#D2E0C8] grid place-items-center text-teal shrink-0">' + icon("sparkle", 24) + '</span><span class="flex-1"><b class="text-ink">Your advisor is a tap away.</b><br><span class="' + MICRO + '">Branching demo conversation</span></span><a class="' + IB + '" href="#/advisor" aria-label="Talk to your advisor">' + icon("arrow", 18) + "</a></div></div>" +
      (state.revision > 0 ? '<p class="text-teal text-[13px]">Your pathway reflects your latest changes.</p>' : "") +
      '<p class="' + MICRO + ' text-center">Your story, your pace. Sample journey for this prototype.</p></div></div>';
  }

  function vPaths() {
    var p = state.profile;
    var rec = recommend(p);
    var head = '<div class="flex gap-3.5 items-start justify-between mb-[18px]"><div><h1 class="' + PH1 + '">Your possible paths</h1><p class="text-mute mt-2">A good plan leaves room for life.</p></div><span class="w-12 h-12 rounded-2xl inline-grid place-items-center shrink-0 bg-mint border border-mint text-teal">' + icon("path", 22) + "</span></div>" +
      '<div class="flex gap-2.5 flex-wrap my-[18px]">' + pill(money(p.budget) + " budget", { icon: "rupee", white: true }) + pill(p.hours + " hrs / week", { icon: "clock", white: true }) + pill(p.relocate ? "Open to moving" : "Stay near home", { icon: "pin", white: true }) + "</div>" +
      '<div class="max-w-[46rem]">' + notice(esc(recommendationReason(p)), pathById(rec).cost > p.budget) + "</div>" +
      '<div class="flex bg-[#E5ECE6] rounded-[13px] p-1 my-5" role="tablist"><button class="flex-1 border-0 bg-transparent p-3 rounded-[10px] font-bold text-mute cursor-pointer min-h-[48px] text-[13.5px]' + (!_compare ? " bg-white text-teal shadow-sm" : "") + '" onclick="PW.compare(false)" role="tab">Your routes</button><button class="flex-1 border-0 bg-transparent p-3 rounded-[10px] font-bold text-mute cursor-pointer min-h-[48px] text-[13.5px]' + (_compare ? " bg-white text-teal shadow-sm" : "") + '" onclick="PW.compare(true)" role="tab">Compare</button></div>';
    var body;
    if (_compare) {
      var rows = [
        ["Estimate", PATHWAYS.map(function (x) { return money(x.cost); })],
        ["Timeline", PATHWAYS.map(function (x) { return duration(x, p) + " mo"; })],
        ["Learning", ["Technical", "Adjacent skills", "Practical"]],
        ["Tradeoff", ["Study load", "Role availability", "Variable income"]],
        ["Budget fit", PATHWAYS.map(function (x) { return x.cost <= p.budget ? "Within" : "Above"; })]
      ].map(function (r) {
        return '<tr class="odd:bg-white even:bg-[#F8FAF8]"><td class="p-4 text-left text-mute"><b>' + r[0] + "</b></td>" + r[1].map(function (v) { return '<td class="p-4 text-center text-ink">' + esc(v) + "</td>"; }).join("") + "</tr>";
      }).join("");
      body = '<div class="overflow-x-auto rounded-[20px] border border-line"><table class="w-full border-collapse bg-white text-[12.5px]"><tr><th class="bg-mint p-3.5 text-left text-mute">At a glance</th><th class="bg-mint p-3.5 text-center text-ink">Plan A</th><th class="bg-mint p-3.5 text-center text-ink">Plan B</th><th class="bg-mint p-3.5 text-center text-ink">Plan C</th></tr>' + rows + "</table></div>" +
        '<div class="grid gap-2 mt-3.5">' + PATHWAYS.map(function (x) { return '<a class="' + BS + BSM + '" href="#/pathway/' + x.id + '">Explore ' + x.label + " " + icon("arrow", 15) + "</a>"; }).join("") + "</div>";
    } else {
      body = '<div class="grid gap-4 md:grid-cols-3">' + PATHWAYS.map(function (pw, i) {
        var bg = ["#DDEFE8", "#DCE8ED", "#F4ECD9"][i];
        var fit = fitMessage(pw, p);
        return '<a href="#/pathway/' + pw.id + '" class="no-underline text-inherit block"><article class="' + CARD + (rec === pw.id ? " border-teal border-[1.5px]" : "") + '">' +
          '<div class="flex justify-between items-center mb-3"><span class="flex gap-[9px] items-center"><span class="w-8 h-8 rounded-[11px] grid place-items-center font-extrabold text-[13px] text-ink" style="background:' + bg + '">' + pw.id.toUpperCase() + '</span><span class="' + MICRO + '">' + esc(pw.tag) + "</span></span>" +
          (state.activePath === pw.id ? '<span class="text-teal">' + icon("check", 20) + "</span>" : "") + "</div>" +
          '<h3 class="m-0 text-ink font-extrabold text-[19px]">' + esc(pw.title) + '</h3><p class="' + MICRO + ' mt-1">' + esc(pw.subtitle) + "</p>" +
          '<div class="flex gap-[18px] items-center mt-4 font-semibold text-[13.5px] flex-wrap"><span class="inline-flex gap-1.5 items-center text-mute">' + icon("rupee", 15) + esc(money(pw.cost)) + '</span><span class="inline-flex gap-1.5 items-center text-mute">' + icon("clock", 15) + duration(pw, p) + " months</span></div>" +
          '<div class="text-xs font-bold mt-3 ' + (pw.cost > p.budget ? "text-honey" : "text-teal") + '">' + esc(fit) + "</div>" +
          (rec === pw.id ? '<div class="mt-3 border-t border-line pt-3 text-[12.5px] font-bold text-teal"><span class="inline-flex items-center gap-1.5">' + icon("sparkle", 14) + "<span>" + (pw.cost > p.budget ? "Lowest-cost sample · funding gap remains" : "Suggested for your current situation") + "</span></span></div>" : "") +
          "</article></a>";
      }).join("") + "</div>";
    }
    return head + body + '<div class="' + CTA + ' mt-[22px]"><a class="' + BS + '" href="#/what-if">' + icon("sliders", 17) + " What if my situation changes?</a></div>" +
      '<p class="' + MICRO + ' text-center mt-3">Illustrative costs and timelines. Outcomes are not guaranteed.</p>';
  }

  function vPathway(id) {
    var p = state.profile;
    var path = pathById(id);
    var isActive = state.activePath === path.id;
    var miles = path.milestones.map(function (m, i) {
      var when = p.hours === 8 ? m.duration : "Stage " + (i + 1) + " of 4";
      return '<div class="grid grid-cols-[34px_1fr] gap-3.5"><div><div class="w-[30px] h-[30px] rounded-full grid place-items-center text-[13px] font-extrabold ' + (i === 0 ? "bg-teal text-white" : "bg-mint text-teal") + '">' + (i + 1) + "</div>" + (i < 3 ? '<div class="w-px bg-[#B8CFC1] mx-auto my-1.5 min-h-[26px]"></div>' : "") + '</div><div class="pb-[26px]"><div class="' + MICRO + ' text-teal font-bold">' + esc(when) + '</div><b class="text-ink">' + esc(m.title) + '</b><div class="' + MICRO + ' text-[13.5px] mt-1.5">' + esc(m.detail) + "</div></div></div>";
    }).join("");
    return '<div class="mb-4"><a class="' + BW + BSM + '" href="#/paths">' + icon("back", 16) + " All paths</a></div>" +
      '<div class="flex gap-3.5 items-start justify-between mb-[18px]"><div><div class="' + MICRO + '">Your pathway</div><h1 class="' + PH1 + '">' + esc(path.title) + '</h1><p class="text-mute mt-2">' + esc(path.description) + "</p></div>" + pill(esc(path.label), {}) + "</div>" +
      '<div class="flex gap-2.5 flex-wrap my-[18px]">' + pill(duration(path, p) + " months", { icon: "clock" }) + pill(money(path.cost) + " estimate", { icon: "rupee" }) + "</div>" +
      (path.cost > p.budget ? '<div class="max-w-[46rem] mb-4">' + notice("This route is " + money(path.cost - p.budget) + " above your current budget. Review the alternatives before committing.", true) + "</div>" : "") +
      '<div class="grid gap-4 md:grid-cols-2"><div><h3 class="text-ink font-extrabold text-[19px] m-0">Why this could work for you</h3><p class="text-mute">' + esc(path.why) + '</p><div class="flex gap-2 flex-wrap mt-3">' + path.skills.map(function (s) { return pill(esc(s), { white: true }); }).join("") + "</div>" +
      '<h3 class="text-ink font-extrabold text-[19px] mt-[26px] mb-3.5">From here to your next chapter</h3><div class="mt-3.5">' + miles + "</div>" +
      (p.hours !== 8 ? notice("The overall estimate is " + duration(path, p) + " months at " + p.hours + " hours a week. Individual stage dates would need a more detailed plan.") : "") + "</div>" +
      '<div><div class="' + CARD + ' bg-sand border-sand"><b class="text-honey inline-flex items-center gap-2">' + icon("info", 18) + ' The tradeoff</b><p class="text-honey text-[13.5px] mt-2 mb-0">' + esc(path.tradeoff) + '</p></div><div class="' + CARD + ' mt-3.5"><b class="text-ink">What you\u2019ll need</b><p class="text-mute text-sm">' + esc(path.eligibility) + '</p><a class="' + BS + BSM + ' w-full mt-2.5" href="#/explore">Find learning opportunities ' + icon("compass", 15) + "</a></div>" +
      '<div class="' + CARD + ' mt-3.5"><b class="text-ink">' + (isActive ? "This is your active path" : "Make it yours") + '</b><p class="' + MICRO + ' mt-1">' + (isActive ? "Continue with the next small steps for this route." : "Switch your demo focus to this sample route.") + '</p><button class="' + BP + ' w-full mt-2" onclick="PW.makeActive(\'' + path.id + "')\">" + (isActive ? "See my next steps " + icon("arrow", 16) : "Make this my active path " + icon("arrow", 16)) + "</button></div>" +
      '<p class="' + MICRO + ' mt-3">Sample pathway. Costs and timelines are planning examples, not verified quotes.</p></div></div>';
  }

  function vWhatIf() {
    if (!_whatif) _whatif = freshWhatIf();
    var w = _whatif;
    var d = w.draft;
    var orig = pathById(state.activePath);
    var sugg = pathById(recommend(d));
    var changed = JSON.stringify(d) !== JSON.stringify(state.profile);
    if (!w.preview) {
      return '<div class="mb-4"><a class="' + BW + BSM + '" href="#/home">' + icon("back", 16) + " Back</a></div>" +
        '<div class="flex gap-3.5 items-start justify-between mb-[18px]"><div><h1 class="' + PH1 + '">Life changes.<br>Your plan can, too.</h1><p class="text-mute mt-2">Try a different situation. Nothing changes until you choose to apply it.</p></div><span class="w-12 h-12 rounded-2xl inline-grid place-items-center shrink-0 bg-mint border border-mint text-teal">' + icon("sliders", 22) + "</span></div>" +
        '<div class="grid gap-4 md:grid-cols-2"><div><h3 class="text-ink font-extrabold text-[19px] m-0">What\u2019s on your mind?</h3><div class="grid gap-[9px] mt-3">' +
        choiceBtn("My learning budget decreased", "rupee", d.budget === 20000, "PW.whatifSet({budget:20000})") +
        choiceBtn("I have less time to study", "clock", d.hours === 4, "PW.whatifSet({hours:4})") +
        choiceBtn("I need to start earning sooner", "briefcase", !!d.earnSoon, "PW.whatifToggleEarn()") +
        choiceBtn("I need to stay close to home", "pin", !d.relocate, "PW.whatifSet({relocate:false})") +
        '</div><h3 class="text-ink font-extrabold text-[19px] mt-6 mb-0">Location flexibility</h3><div class="grid gap-[9px] mt-3">' +
        choiceBtn("Stay near home", null, !d.relocate, "PW.whatifSet({relocate:false})") +
        choiceBtn("I\u2019m open to relocating", null, !!d.relocate, "PW.whatifSet({relocate:true})") +
        '</div><div class="mt-3.5">' + notice("These sample routes already support remote learning. Location changes update your preferences without inventing new opportunities.") + "</div></div>" +
        '<div><div class="' + CARD + '"><div class="' + MICRO + '">Total learning budget</div><div class="flex justify-between items-center my-2 mb-4"><button class="w-12 h-12 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 bg-faded border border-transparent text-ink hover:bg-mint" aria-label="Decrease budget by 5,000 rupees" onclick="PW.whatifBudget(-5000)">' + icon("minus", 18) + '</button><b class="text-[22px] text-ink">' + esc(money(d.budget)) + '</b><button class="w-12 h-12 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 bg-faded border border-transparent text-ink hover:bg-mint" aria-label="Increase budget by 5,000 rupees" onclick="PW.whatifBudget(5000)">' + icon("plus", 18) + "</button></div>" +
        '<div class="h-px bg-line"></div><div class="' + MICRO + ' mt-4">Time for learning each week</div><div class="flex justify-between items-center mt-2"><button class="w-12 h-12 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 bg-faded border border-transparent text-ink hover:bg-mint" aria-label="Decrease weekly study hours" onclick="PW.whatifHours(-1)">' + icon("minus", 18) + '</button><b class="text-[22px] text-ink">' + esc(String(d.hours)) + ' hours</b><button class="w-12 h-12 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 bg-faded border border-transparent text-ink hover:bg-mint" aria-label="Increase weekly study hours" onclick="PW.whatifHours(1)">' + icon("plus", 18) + "</button></div></div>" +
        '<div class="grid gap-2.5 mt-4"><button class="' + BP + '" ' + (changed ? "" : "disabled") + ' onclick="PW.whatifPreview()">' + icon("sparkle", 17) + " Preview my new plan</button>" +
        '<button class="' + BG + '" onclick="PW.discard()">Discard changes</button></div>' +
        (!changed ? '<p class="' + MICRO + ' text-center">Change a value above to enable the preview.</p>' : "") + "</div></div>";
    }
    var diffs = [
      ["Learning budget", money(state.profile.budget), money(d.budget)],
      ["Weekly study time", state.profile.hours + " hours", d.hours + " hours"],
      ["Location", state.profile.relocate ? "Open to moving" : "Near home", d.relocate ? "Open to moving" : "Near home"],
      ["Income priority", state.profile.earnSoon ? "Earlier earning" : "Gradual transition", d.earnSoon ? "Earlier earning" : "Gradual transition"]
    ].filter(function (r) { return r[1] !== r[2]; }).map(function (r) {
      return '<div class="py-3 border-b border-line"><div class="' + MICRO + '">' + r[0] + '</div><div class="flex gap-2.5 items-center mt-1 text-ink"><span>' + esc(r[1]) + "</span>" + icon("arrow", 15) + '<b class="text-teal text-[13px]">' + esc(r[2]) + "</b></div></div>";
    }).join("") || '<p class="' + MICRO + '">No differences — your situation matches the current plan.</p>';
    return '<div class="mb-4"><button class="' + BW + BSM + '" onclick="PW.whatifBack()">' + icon("back", 16) + " Adjust scenario</button></div>" +
      '<h1 class="text-[32px] tracking-[-1px] m-0 font-extrabold">A little adjustment. A way forward.</h1>' +
      '<div class="max-w-[46rem] my-3.5">' + notice(esc(recommendationReason(d)), sugg.cost > d.budget) + "</div>" +
      '<div class="grid gap-4 md:grid-cols-2"><div class="' + CARD + '"><div class="' + MICRO + '">Your current route</div><b class="text-ink">' + esc(orig.label) + " · " + esc(orig.title) + '</b><div class="' + MICRO + ' mt-1.5">' + esc(money(orig.cost)) + " · " + duration(orig, state.profile) + " months</div>" +
      '<div class="text-center my-3.5 text-teal">' + icon("down", 20) + "</div>" +
      pill(orig.id === sugg.id ? "Same route, updated situation" : "Your revised route", { icon: "sparkle" }) +
      '<h3 class="text-[22px] my-2.5 mb-1 text-ink font-extrabold">' + esc(sugg.title) + '</h3><div class="flex gap-3.5"><b class="text-teal">' + esc(money(sugg.cost)) + "</b><span class='text-ink'>" + duration(sugg, d) + " months</span></div></div>" +
      '<div><h3 class="text-ink font-extrabold text-[19px] m-0">What changes for you</h3>' + diffs +
      '<div class="grid gap-2.5 mt-[18px]"><button class="' + BP + '" onclick="PW.whatifApply()">' + icon("check", 17) + ' Apply these changes</button><button class="' + BG + '" onclick="PW.discard()">Keep my current plan</button><button class="' + BW + BSM + '" onclick="PW.whatifBack()">Adjust this scenario</button></div>' +
      '<p class="' + MICRO + ' mt-3">This is a simulated recalculation using sample routes, not a prediction of career outcomes.</p></div></div>';
  }
  function choiceBtn(title, icn, sel, fn) {
    return '<button class="choice w-full text-left flex gap-2.5 items-center border rounded-[14px] px-4 py-3.5 min-h-[52px] text-[13.5px] font-semibold cursor-pointer ' + (sel ? "bg-mint border-teal text-teal" : "bg-white border-line text-ink hover:border-teal") + '" onclick="' + fn + '">' + (icn ? icon(icn, 19) : "") + '<span class="flex-1">' + esc(title) + "</span>" + (sel ? icon("check", 17) : "") + "</button>";
  }

  function filteredOpps() {
    var q = (_exp.q || "").toLowerCase().trim();
    return OPPORTUNITIES.filter(function (o) {
      if (_exp.filter !== "All" && o.kind !== _exp.filter) return false;
      if (_exp.savedOnly && state.saved.indexOf(o.id) < 0) return false;
      if (!q) return true;
      return (o.title + " " + o.provider + " " + o.skills.join(" ")).toLowerCase().indexOf(q) >= 0;
    });
  }
  function oppCard(o) {
    var bg = o.kind === "Course" ? "#DCE8ED" : o.kind === "Job" ? "#F4ECD9" : "#EAE6F1";
    var col = o.kind === "Course" ? "#456777" : o.kind === "Job" ? "#8B601B" : "#6C5A87";
    var icn = o.kind === "Course" ? "book" : o.kind === "Job" ? "briefcase" : "graduation";
    var sv = state.saved.indexOf(o.id) >= 0;
    return '<article class="' + CARD + '"><div class="flex gap-2.5 items-center mb-2.5"><span class="w-[46px] h-[46px] rounded-[14px] grid place-items-center shrink-0" style="background:' + bg + ";color:" + col + '">' + icon(icn, 23) + "</span>" + pill(esc(o.kind), { white: true }) + '<span class="flex-1"></span><button class="w-12 h-12 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 border ' + (sv ? "bg-mint border-mint text-teal" : "bg-white border-line text-teal hover:bg-faded") + '" aria-label="' + (sv ? "Unsave " : "Save ") + esc(o.title) + '" onclick="PW.toggleSave(\'' + o.id + "')\">" + icon(sv ? "bookmarkFill" : "bookmark", 20) + "</button></div>" +
      '<a href="#/opportunity/' + o.id + '" class="no-underline text-inherit block"><h3 class="text-[18px] m-0 text-ink font-extrabold">' + esc(o.title) + '</h3><p class="' + MICRO + ' mt-1">' + esc(o.provider) + "</p>" +
      '<div class="' + MICRO + ' mt-2 inline-flex items-center gap-1">' + icon("pin", 13) + " " + esc(o.location) + "</div>" +
      '<div class="flex justify-between items-center border-t border-line mt-3.5 pt-3 text-[13px]"><b class="text-teal">' + esc(o.cost) + "</b><span class='" + MICRO + "'>" + esc(o.time) + "</span>" + '<span class="text-teal">' + icon("external", 16) + "</span></div></a></article>";
  }
  function vExplore() {
    var list = filteredOpps();
    var body = !list.length
      ? '<div class="' + CARD + ' text-center px-5 py-11"><div class="text-teal flex justify-center">' + icon("compass", 40) + "</div><h3 class='text-ink font-extrabold text-[19px]'>" + (_exp.savedOnly ? "A little space for possibilities" : "No examples found") + "</h3><p class='" + MICRO + "'>" + (_exp.savedOnly ? "Save an opportunity using its bookmark to find it here." : "Try \u201CExcel\u201D, \u201CSQL\u201D, or a different category.") + "</p></div>"
      : '<div class="grid gap-3.5 md:grid-cols-2">' + list.map(oppCard).join("") + "</div>";
    return '<div class="flex gap-3.5 items-start justify-between mb-[18px]"><div><h1 class="' + PH1 + '">Open a new door</h1><p class="text-mute mt-2">Small opportunities. Real possibilities.</p></div>' +
      '<button class="w-12 h-12 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 border ' + (_exp.savedOnly ? "bg-mint border-mint text-teal" : "bg-white border-line text-teal hover:bg-faded") + '" aria-label="Show saved opportunities" onclick="PW.toggleSavedOnly()">' + icon(_exp.savedOnly ? "bookmarkFill" : "bookmark", 20) + "</button></div>" +
      '<div class="' + CARD + ' bg-[#E2EADF] border-[#E2EADF]"><div class="flex gap-3.5 items-center"><span class="flex-1"><b class="text-[21px] text-ink font-extrabold">Your experience<br>opens doors.</b><br><span class="' + MICRO + '">Find a starting point that meets you where you are.</span></span><span class="text-teal">' + icon("compass", 52) + "</span></div></div>" +
      '<div class="h-4"></div><div class="flex gap-2.5 items-center bg-white border border-line rounded-[15px] px-3.5"><span class="text-mute">' + icon("compass", 19) + '</span><input aria-label="Search opportunities" placeholder="Skills, courses, new possibilities\u2026" value="' + esc(_exp.q) + '" oninput="PW.setQuery(this.value)" class="border-0 outline-none flex-1 min-h-[51px] bg-transparent text-[13.5px] text-ink" /><button class="w-9 h-9 rounded-2xl inline-grid place-items-center cursor-pointer shrink-0 text-ink hover:bg-faded" aria-label="Clear search" onclick="PW.clearQuery()">' + icon("close", 16) + "</button></div>" +
      '<div class="flex gap-2 flex-wrap my-4" role="group" aria-label="Filter by kind">' + ["All", "Course", "Job", "Programme"].map(function (f) {
        var label = f === "All" ? "For you" : f === "Course" ? "Courses" : f === "Job" ? "Jobs" : "Programmes";
        return '<button class="border rounded-full px-[18px] min-h-[48px] font-bold text-[13px] cursor-pointer ' + (_exp.filter === f ? "bg-teal border-teal text-white" : "bg-white border-line text-mute hover:border-teal") + '" onclick="PW.setFilter(\'' + f + "')\">" + label + "</button>";
      }).join("") + "</div>" +
      '<div class="flex justify-between mb-3"><b class="text-ink">' + (_exp.savedOnly ? "Saved for later" : "A place to begin") + '</b><span class="' + MICRO + '">' + list.length + " " + (list.length === 1 ? "example" : "examples") + "</span></div>" +
      '<div id="opp-list">' + body + "</div>" +
      '<div class="mt-[18px]">' + notice("Illustrative opportunities only. Organisations, fees, and openings are sample content, not verified listings.") + "</div>";
  }

  function vOpportunity(id) {
    var o = oppById(id);
    if (!o) return '<div class="mb-4"><a class="' + BW + BSM + '" href="#/explore">' + icon("back", 16) + " Explore</a></div><div class='" + CARD + " text-center px-6 py-12'><h2 class='text-ink font-extrabold'>This example isn\u2019t available</h2><p class='" + MICRO + "'>Explore the other sample opportunities.</p><a class='" + BP + "' href='#/explore'>Explore opportunities</a></div>";
    var sv = state.saved.indexOf(o.id) >= 0;
    var why = o.kind === "Course" ? "Build a practical skill before committing to a bigger career change. Self-paced study can fit around your current job." : o.kind === "Job" ? "Your retail operations experience is relevant to this kind of work. Use this example to understand skills to develop and questions to ask." : "Support and mentoring could make a transition more manageable. Explore programmes that fit your learning preferences and schedule.";
    var bg = o.kind === "Course" ? "#DCE8ED" : o.kind === "Job" ? "#F4ECD9" : "#EAE6F1";
    var icn = o.kind === "Course" ? "book" : o.kind === "Job" ? "briefcase" : "graduation";
    return '<div class="mb-4"><a class="' + BW + BSM + '" href="#/explore">' + icon("back", 16) + " Explore</a></div>" +
      '<div class="flex gap-3.5 items-start justify-between mb-[18px]"><div><div class="' + MICRO + '">A possible next step</div><h1 class="' + PH1 + '">' + esc(o.title) + '</h1><p class="text-mute mt-2">' + esc(o.provider) + " · " + esc(o.location) + "</p></div>" + pill(esc(o.kind) + " example", { white: true }) + "</div>" +
      '<div class="grid gap-4 md:grid-cols-2"><div><div class="flex gap-2.5 mb-3.5"><span class="w-[60px] h-[60px] rounded-[19px] grid place-items-center text-teal" style="background:' + bg + '">' + icon(icn, 30) + "</span></div>" +
      '<div class="flex gap-2.5 flex-wrap my-[18px]">' + pill(esc(o.cost), { icon: "rupee" }) + pill(esc(o.time), { icon: "clock" }) + "</div>" +
      notice("This is an illustrative listing. There\u2019s no live opening, application, or enrollment connected to this prototype.") +
      '<h3 class="text-ink font-extrabold text-[19px] mt-[22px] mb-2">A closer look</h3><p class="text-mute">' + esc(o.description) + "</p>" +
      '<h3 class="text-ink font-extrabold text-[19px] mt-[22px] mb-2">Why explore this?</h3><p class="text-mute">' + esc(why) + '</p><div class="flex gap-2 flex-wrap mt-2.5">' + o.skills.map(function (s) { return pill(esc(s), { white: true }); }).join("") + "</div></div>" +
      '<div><div class="' + CARD + '"><b class="text-ink">Readiness &amp; support</b><p class="text-mute text-sm">' + esc(o.requirements) + "</p></div>" +
      '<div class="' + CARD + ' mt-3.5"><b class="text-ink">Before you take the next step</b>' + ["Confirm details with the official provider.", "Check eligibility, costs, and any deadlines.", "Ask about the support and flexibility you need."].map(function (t) { return '<div class="flex gap-2.5 p-2 px-0 text-[13.5px] text-mute"><span class="text-teal">' + icon("check", 16) + "</span><span>" + t + "</span></div>"; }).join("") + '<p class="' + MICRO + ' mt-2.5">Source status: not verified · sample data</p></div>' +
      '<button class="' + (sv ? BS : BP) + ' w-full mt-3.5" onclick="PW.toggleSave(\'' + o.id + "')\">" + icon("bookmark", 17) + " " + (sv ? "Saved · remove from saved" : "Save for later") + "</button></div></div>";
  }

  function vNextSteps() {
    if (!_expanded) { for (var i = 0; i < TASKS.length; i++) if (state.completed.indexOf(TASKS[i].id) < 0) { _expanded = TASKS[i].id; break; } }
    var path = pathById(state.activePath);
    var cards = TASKS.map(function (t, i) {
      var done = state.completed.indexOf(t.id) >= 0;
      var open = _expanded === t.id;
      var extra = i === 2 ? TASK_EXTRA[i] + " Your current plan allows " + state.profile.hours + " study hours each week." : TASK_EXTRA[i];
      return '<div class="border bg-white rounded-[20px] p-[18px] mb-3 ' + (open ? "border-teal" : "border-line") + '"><div class="flex gap-2.5 items-start">' +
        '<button class="w-[26px] h-[26px] rounded-[9px] border-[1.5px] grid place-items-center cursor-pointer shrink-0 ' + (done ? "bg-teal border-teal text-white" : "bg-transparent border-[#A9BEB0]") + '" role="checkbox" aria-checked="' + done + '" aria-label="Mark ' + esc(t.title) + " " + (done ? "incomplete" : "complete") + '" onclick="PW.toggleTask(\'' + t.id + "')\">" + (done ? icon("check", 15) : "") + "</button>" +
        '<button class="choice flex-1 text-left bg-transparent border-0 p-0 cursor-pointer" onclick="PW.expandTask(\'' + t.id + '\')"><span class="flex-1 text-left"><b class="' + (done ? "text-mute line-through" : "text-ink") + '">' + esc(t.title) + '</b><br><span class="' + MICRO + ' inline-flex items-center gap-1">' + icon("clock", 11) + " " + esc(t.time) + "</span></span></button>" +
        '<span class="text-mute">' + icon(open ? "down" : "chevron", 17) + "</span></div>" +
        (open ? '<div class="border-t border-line mt-3 pt-3.5 grid gap-3"><p class="text-mute text-[13.5px] m-0">' + esc(t.detail) + '</p><p class="' + MICRO + ' text-[13px]">' + esc(extra) + "</p>" +
        (i === 1 ? '<a class="' + BS + BSM + '" href="#/explore">Explore sample courses ' + icon("book", 15) + "</a>" : "") +
        '<button class="' + (done ? BS : BP) + '" onclick="PW.toggleTask(\'' + t.id + "')\">" + (done ? "Mark as incomplete" : "Mark this step complete") + "</button></div>" : "") + "</div>";
    }).join("");
    return '<div class="mb-4"><a class="' + BW + BSM + '" href="#/home">' + icon("back", 16) + " Home</a></div>" +
      '<div class="' + MICRO + '">One step at a time</div><h1 class="text-[34px] tracking-[-1px] my-1 mb-2 font-extrabold">Small steps.<br>A different tomorrow.</h1>' +
      '<p class="text-mute">You don\u2019t need the whole journey figured out. Start with what\u2019s in front of you.</p>' +
      '<div class="' + CARD + ' bg-mint border-mint my-[18px]"><div class="flex justify-between items-center"><b class="text-teal">Your first four steps</b>' + pill(state.completed.length + " of 4", { white: true }) + '</div><div class="flex gap-1.5 my-3.5">' + TASKS.map(function (t) { return '<i class="flex-1 h-[7px] rounded-full ' + (state.completed.indexOf(t.id) >= 0 ? "bg-teal" : "bg-[#BCD5C6]") + '"></i>'; }).join("") + "</div>" +
      '<p class="text-teal text-[13.5px] m-0">' + (state.completed.length === 4 ? "A strong start. Take a moment to recognise it." : "A little progress is still progress.") + "</p></div>" +
      pill(path.label + " · " + path.title, { icon: "path", white: true }) +
      '<h3 class="text-ink font-extrabold text-[19px] my-5 mb-3">Make a little room this week</h3>' + cards +
      (state.completed.length === 4 ? '<div class="mt-4">' + notice("Your foundation is taking shape. Explore the sample opportunities or revisit your pathway when you\u2019re ready.") + '<a class="' + BP + ' w-full mt-3" href="#/explore">Explore what\u2019s next ' + icon("arrow", 16) + "</a></div>" : "");
  }

  function vProfile() {
    var p = state.profile;
    var rows = [
      ["rupee", "Learning budget", money(p.budget) + " total"],
      ["clock", "Time to learn", p.hours + " hours a week"],
      ["pin", "Location", p.relocate ? "Open to relocating" : "Stay near home"],
      ["briefcase", "Income", p.earnSoon ? "Explore earlier earning" : "Keep earning while learning"]
    ].map(function (r) {
      return '<div class="flex gap-3 items-center"><span class="bg-white p-[11px] rounded-[13px] text-teal">' + icon(r[0], 19) + '</span><span class="flex-1"><span class="' + MICRO + '">' + r[1] + '</span><br><b class="text-[13.5px] text-ink">' + esc(r[2]) + "</b></span></div>";
    }).join('<div class="h-3.5"></div>');
    return '<div class="flex gap-3.5 items-start justify-between mb-[18px]"><div><h1 class="' + PH1 + '">The person behind the plan</h1><p class="text-mute mt-2">Your story matters. Every part of it.</p></div></div>' +
      '<div class="grid gap-4 md:grid-cols-2"><div><div class="' + CARD + '"><div class="flex gap-4 items-center"><span class="w-[68px] h-[68px] rounded-[23px] bg-[#E9DFCE] grid place-items-center font-extrabold text-[26px] text-[#756044] shrink-0">P</span><span><b class="text-[22px] text-ink">' + esc(p.name) + '</b><br><span class="' + MICRO + '">' + esc(p.role) + "<br>" + '<span class="inline-flex items-center gap-1">' + icon("pin", 12) + " " + esc(p.location) + "</span></span></span></div>" +
      '<div class="mt-3.5">' + pill("A new chapter, on your terms", { icon: "sparkle" }) + "</div></div>" +
      '<h3 class="text-ink font-extrabold text-[19px] my-[22px] mb-2.5">Where you want to go</h3><div class="' + CARD + ' bg-deep border-deep"><div class="text-xs text-[#C1D3C9]">Your career goal</div><div class="text-white text-[22px] font-extrabold">' + esc(p.goal) + '</div><div class="text-xs text-[#C1D3C9]">Build on your experience. Keep moving forward.</div></div>' +
      '<h3 class="text-ink font-extrabold text-[19px] my-[22px] mb-2.5">What you bring</h3><div class="flex gap-2 flex-wrap">' + (p.strengths.length ? p.strengths.map(function (s) { return pill(esc(s), { white: true }); }).join("") : "<span class='" + MICRO + "'>Add strengths whenever you\u2019re ready.</span>") + "</div></div>" +
      '<div><h3 class="text-ink font-extrabold text-[19px] m-0">Your real-life priorities</h3><div class="' + CARD + ' mt-3">' + rows + "</div>" +
      '<h3 class="text-ink font-extrabold text-[19px] my-[22px] mb-1.5">How you learn best</h3><p class="' + MICRO + '">Support that helps you thrive. Always your choice to share.</p><div class="flex gap-2 flex-wrap mt-2.5">' + (p.support.length ? p.support.map(function (s) { return pill(esc(s), { icon: "heart" }); }).join("") : "<span class='" + MICRO + "'>No support preferences shared.</span>") + "</div>" +
      '<div class="grid gap-2.5 mt-[22px]"><a class="' + BS + '" href="#/edit-profile">' + icon("note", 17) + " Edit my profile</a></div>" +
      '<div class="mt-3.5">' + notice("This is Priya\u2019s sample profile. Changes stay in this browser demo until you reset.") + '</div><button class="' + BG + ' mt-2" onclick="PW.askReset()">' + icon("reset", 17) + " Reset demo</button></div></div>" +
      resetModal();
  }
  function resetModal() {
    if (!_confirmReset) return "";
    return '<div class="fixed inset-0 bg-[rgba(12,34,27,.45)] grid place-items-center p-[22px] z-[100]" onclick="if(event.target===this)PW.askReset(false)"><div class="bg-white rounded-3xl p-[26px] max-w-[420px] w-full shadow-pop" role="dialog" aria-modal="true" aria-label="Reset demo"><h3 class="mt-0 text-ink font-extrabold text-[19px]">Start a fresh chapter?</h3><p class="text-mute">This resets your demo profile, selected pathway, saved opportunities, and completed steps.</p><div class="grid gap-2.5"><button class="' + BP + '" onclick="PW.doReset()">Reset and start over</button><button class="' + BG + '" onclick="PW.askReset(false)">Keep exploring</button></div></div></div>';
  }

  function vEditProfile() {
    if (!_edit) _edit = { draft: JSON.parse(JSON.stringify(state.profile)), budget: String(state.profile.budget), hours: String(state.profile.hours), error: "" };
    var e = _edit, d = e.draft;
    function goalBtn(g) { return choiceBtn(g, null, d.goal === g, "PW.editGoal('" + g + "')"); }
    function multi(list, sel, fn) {
      return list.map(function (v) { return choiceBtn(v, null, sel.indexOf(v) >= 0, fn + "('" + v.replace(/'/g, "\\'") + "')"); }).join("");
    }
    return '<div class="mb-4"><a class="' + BW + BSM + '" href="#/profile">' + icon("back", 16) + " Profile</a></div>" +
      '<div class="' + MICRO + '">Make it yours</div><h1 class="text-[32px] tracking-[-1px] my-1 mb-2 font-extrabold">You know yourself best.</h1><p class="text-mute">Adjust this sample profile. Your pathways will reflect the priorities you choose.</p>' +
      '<div class="' + CARD + ' mt-4"><span class="' + FLD + ' !mt-0">Your next career goal</span><div class="grid gap-2">' + goalBtn("Data analyst") + goalBtn("Business analyst") + goalBtn("Reporting specialist") + "</div>" +
      '<label class="' + FLD + '" for="f-budget">Total learning budget (\u20B9)</label><input id="f-budget" class="' + INP + '" inputmode="numeric" maxlength="6" value="' + esc(e.budget) + '" oninput="PW.editField(\'budget\',this.value)" />' +
      '<label class="' + FLD + '" for="f-hours">Study hours per week</label><input id="f-hours" class="' + INP + '" inputmode="numeric" maxlength="2" value="' + esc(e.hours) + '" oninput="PW.editField(\'hours\',this.value)" />' +
      '<span class="' + FLD + '">Location flexibility</span><div class="grid gap-2">' + choiceBtn("Stay near home", null, !d.relocate, "PW.editRelocate(false)") + choiceBtn("Open to relocating", null, !!d.relocate, "PW.editRelocate(true)") + "</div>" +
      '<span class="' + FLD + '">Income priority</span><div class="grid gap-2">' + choiceBtn("Keep earning while I learn", null, !d.earnSoon, "PW.editEarn(false)") + choiceBtn("Explore earlier earning", null, !!d.earnSoon, "PW.editEarn(true)") + "</div>" +
      '<span class="' + FLD + '">Strengths to build on</span><div class="grid gap-2">' + multi(STRENGTH_OPTIONS, d.strengths, "PW.editStrength") + "</div>" +
      '<span class="' + FLD + '">Support that helps you (optional)</span><p class="' + MICRO + ' mb-3">Choose what makes learning work for you. You don\u2019t need to share a diagnosis.</p><div class="grid gap-2">' + multi(SUPPORT_OPTIONS, d.support, "PW.editSupport") + "</div>" +
      '<button class="' + BG + '" onclick="PW.editNoSupport()">Prefer not to share support needs</button>' +
      (e.error ? '<div class="mt-3">' + notice(esc(e.error), true) + "</div>" : "") +
      '<button class="' + BP + ' w-full mt-4" onclick="PW.editSave()">' + icon("check", 17) + " Save my profile</button></div>";
  }

  function vNotFound() {
    return '<div class="' + CARD + ' text-center px-6 py-12"><h1 class="text-ink font-extrabold">That page isn\u2019t in the demo</h1><p class="' + MICRO + '">Explore the sample pathways instead.</p><div class="' + CTA + ' justify-center"><a class="' + BP + '" href="#/paths">View pathways</a><a class="' + BS + '" href="#/">Landing</a></div></div>';
  }

  /* ---------------- router ---------------- */
  function route() {
    var h = location.hash || "#/";
    var path = h.replace(/^#/, "") || "/";
    if (path[0] !== "/") path = "/" + path;
    var root = document.getElementById("root");
    var html = "", active = "";
    if (path === "/") { html = landingShell(vLanding()); }
    else if (path === "/advisor") { active = "advisor"; html = appShell(active, vAdvisor()); }
    else if (path === "/home") { active = "home"; if (!state.started) { doStart(); } html = appShell(active, vHome()); }
    else if (path === "/paths") { active = "paths"; html = appShell(active, vPaths()); }
    else if (path.indexOf("/pathway/") === 0) { active = "paths"; html = appShell(active, vPathway(path.split("/")[2])); }
    else if (path === "/what-if") { active = "whatif"; html = appShell(active, vWhatIf()); }
    else if (path === "/explore") { active = "explore"; html = appShell(active, vExplore()); }
    else if (path.indexOf("/opportunity/") === 0) { active = "explore"; html = appShell(active, vOpportunity(path.split("/")[2])); }
    else if (path === "/next-steps") { active = "steps"; html = appShell(active, vNextSteps()); }
    else if (path === "/profile") { active = "profile"; html = appShell(active, vProfile()); }
    else if (path === "/edit-profile") { active = "profile"; html = appShell(active, vEditProfile()); }
    else { html = appShell("", vNotFound()); }
    root.innerHTML = html;
    window.scrollTo(0, 0);
    var adv = document.getElementById("adv-input");
    if (adv) { var v = adv.value; adv.focus(); try { adv.setSelectionRange(v.length, v.length); } catch (e) {} }
  }

  /* ---------------- public handlers ---------------- */
  function advAnswer(answer, skip) {
    var a = _adv;
    var updated = JSON.parse(JSON.stringify(a.draft));
    var seq = a.order.slice();
    if (!skip) {
      if (a.stage === "goal") updated.goal = answer;
      if (a.stage === "priority") {
        updated.earnSoon = false;
        if (answer === "Make time for family") { seq = ["goal", "priority", "time", "budget", "support", "review"]; a.order = seq; updated.relocate = false; }
      }
      if (a.stage === "budget") updated.budget = answer.indexOf("60,000") >= 0 ? 60000 : answer.indexOf("20,000") >= 0 ? 20000 : 8000;
      if (a.stage === "time") updated.hours = parseInt(answer, 10) || updated.hours;
      if (a.stage === "support") updated.support = answer.indexOf("Flexible") >= 0 ? ["Flexible learning"] : answer.indexOf("Captions") >= 0 ? ["Captions & transcripts", "Written instructions"] : ["Step-by-step guidance"];
    } else if (a.stage === "support") updated.support = [];
    a.draft = updated;
    a.reply = skip ? "I\u2019d like to skip this for now." : answer;
    a.hint = ""; a.text = ""; a.voice = false;
    a.stage = seq[seq.indexOf(a.stage) + 1] || "review";
    route();
  }
  function advSend() {
    var a = _adv;
    var input = (a.text || "").trim().toLowerCase();
    if (!input || a.stage === "review") return;
    var answer;
    if (a.stage === "goal") answer = input.indexOf("business") >= 0 ? "Business analyst" : input.indexOf("report") >= 0 ? "Reporting specialist" : input.indexOf("data") >= 0 ? "Data analyst" : undefined;
    if (a.stage === "priority") answer = /famil|time|care/.test(input) ? "Make time for family" : /cost|budget|afford/.test(input) ? "Keep learning affordable" : /income|earn|job/.test(input) ? "Keep my current income" : undefined;
    if (a.stage === "budget") answer = /\b(?:60,?000|60k)\b/.test(input) ? "\u20B960,000 over time" : /\b(?:20,?000|20k)\b/.test(input) ? "Up to \u20B920,000" : /\b(?:8,?000|8k|small)\b/.test(input) ? "Start small · \u20B98,000" : undefined;
    if (a.stage === "time") answer = /\b12\b/.test(input) ? "12 hours a week" : /\b8\b/.test(input) ? "8 hours a week" : /\b4\b/.test(input) ? "4 hours a week" : undefined;
    if (a.stage === "support") answer = /flex|hour/.test(input) ? "Flexible learning hours" : /caption|note|written/.test(input) ? "Captions and written notes" : /step|guid/.test(input) ? "Step-by-step guidance" : undefined;
    if (answer) advAnswer(answer, false);
    else { a.hint = "This demo can explore the choices below. Pick the closest one, or skip this question."; route(); }
  }

  window.PW = {
    go: function (p) { location.hash = "#" + p; },
    menu: function (open) { _menu = !!open; route(); },
    compare: function (on) { _compare = !!on; route(); },
    discard: function () { _whatif = null; if (history.length > 1) history.back(); else location.hash = "#/home"; },
    makeActive: function (id) { doPath(id); toast("Active path updated"); location.hash = "#/next-steps"; route(); },
    toggleSave: function (id) { doSave(id); toast(state.saved.indexOf(id) >= 0 ? "Saved for later" : "Removed from saved"); route(); },
    toggleTask: function (id) { doTask(id); toast(state.completed.indexOf(id) >= 0 ? "Step complete — nice." : "Marked incomplete"); route(); },
    expandTask: function (id) { _expanded = _expanded === id ? null : id; route(); },
    setFilter: function (f) { _exp.filter = f; route(); },
    toggleSavedOnly: function () { _exp.savedOnly = !_exp.savedOnly; route(); },
    setQuery: function (v) { _exp.q = v; var list = filteredOpps(); var el = document.getElementById("opp-list"); if (el) { el.innerHTML = !list.length ? "<div class='" + CARD + " text-center px-5 py-11'><h3 class='text-ink font-extrabold text-[19px]'>No examples found</h3><p class='" + MICRO + "'>Try \u201CExcel\u201D, \u201CSQL\u201D, or a different category.</p></div>" : '<div class="grid gap-3.5 md:grid-cols-2">' + list.map(oppCard).join("") + "</div>"; } },
    clearQuery: function () { _exp.q = ""; route(); },
    /* advisor */
    advPick: function (i) { var q = QUESTIONS[_adv.stage]; if (q) advAnswer(q.options[i], false); },
    advSkip: function () { advAnswer("", true); },
    advType: function (v) { _adv.text = v; },
    advSend: advSend,
    advVoice: function () { _adv.voice = !_adv.voice; route(); },
    advRevisit: function () { _adv.stage = "goal"; _adv.reply = ""; route(); },
    advFinish: function () { doProfile(_adv.draft); doStart(); _adv = null; toast("Pathways updated for your answers"); location.hash = "#/paths"; route(); },
    camera: function (open) { _camera = !!open; route(); },
    /* what-if */
    whatifSet: function (patch) { for (var k in patch) _whatif.draft[k] = patch[k]; route(); },
    whatifToggleEarn: function () { _whatif.draft.earnSoon = !_whatif.draft.earnSoon; route(); },
    whatifBudget: function (d) { _whatif.draft.budget = Math.min(500000, Math.max(0, _whatif.draft.budget + d)); route(); },
    whatifHours: function (d) { _whatif.draft.hours = Math.min(30, Math.max(1, _whatif.draft.hours + d)); route(); },
    whatifPreview: function () { _whatif.preview = true; route(); },
    whatifBack: function () { _whatif.preview = false; route(); },
    whatifApply: function () { doScenario(_whatif.draft); _whatif = null; toast("New plan applied"); location.hash = "#/paths"; route(); },
    /* profile */
    askReset: function (open) { _confirmReset = open === undefined ? true : !!open; if (open === false) _confirmReset = false; route(); },
    doReset: function () { resetStore(); _confirmReset = false; toast("Demo reset — welcome back"); location.hash = "#/"; route(); },
    editGoal: function (g) { _edit.draft.goal = g; route(); },
    editRelocate: function (v) { _edit.draft.relocate = !!v; route(); },
    editEarn: function (v) { _edit.draft.earnSoon = !!v; route(); },
    editField: function (k, v) { _edit[k] = v; },
    editStrength: function (v) { var a = _edit.draft.strengths, i = a.indexOf(v); if (i >= 0) a.splice(i, 1); else a.push(v); route(); },
    editSupport: function (v) { var a = _edit.draft.support, i = a.indexOf(v); if (i >= 0) a.splice(i, 1); else a.push(v); route(); },
    editNoSupport: function () { _edit.draft.support = []; route(); },
    editSave: function () {
      var b = (_edit.budget || "").trim(), h = (_edit.hours || "").trim();
      if (!/^\d+$/.test(b) || Number(b) > 500000) { _edit.error = "Enter a learning budget from \u20B90 to \u20B95,00,000."; route(); return; }
      if (!/^\d+$/.test(h) || Number(h) < 1 || Number(h) > 30) { _edit.error = "Enter between 1 and 30 study hours per week."; route(); return; }
      var p = JSON.parse(JSON.stringify(_edit.draft)); p.budget = Number(b); p.hours = Number(h);
      doProfile(p); _edit = null; toast("Profile saved"); location.hash = "#/profile"; route();
    }
  };

  window.addEventListener("hashchange", route);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && (_menu || _camera || _confirmReset)) { _menu = false; _camera = false; _confirmReset = false; route(); } });
  if (!location.hash) location.hash = "#/";
  route();
})();
