export type PathId = "a" | "b" | "c";
export type Goal = "Data analyst" | "Business analyst" | "Reporting specialist";
export type Profile = {
  name: string;
  role: string;
  location: string;
  goal: Goal;
  budget: number;
  hours: number;
  relocate: boolean;
  earnSoon: boolean;
  support: string[];
  strengths: string[];
};
export const initialProfile: Profile = {
  name: "Priya",
  role: "Retail operations associate",
  location: "Kochi, Kerala",
  goal: "Data analyst",
  budget: 60000,
  hours: 8,
  relocate: false,
  earnSoon: false,
  support: ["Flexible learning", "Written instructions"],
  strengths: ["Problem solving", "Working with numbers", "Customer insight"],
};
export type Milestone = { title: string; detail: string; duration: string };
export type Pathway = {
  id: PathId;
  label: string;
  title: string;
  subtitle: string;
  cost: number;
  months: number;
  tag: string;
  description: string;
  why: string;
  tradeoff: string;
  eligibility: string;
  skills: string[];
  milestones: Milestone[];
};
export const pathways: Pathway[] = [
  {
    id: "a",
    label: "Plan A",
    title: "Become a data analyst",
    subtitle: "Build skills alongside your current job",
    cost: 48000,
    months: 9,
    tag: "Build technical depth",
    description:
      "Turn your experience with stock, sales, and customers into a career working with data.",
    why: "Your retail experience already gives you a head start in spotting patterns. Part-time, remote learning lets you keep earning and stay in Kochi.",
    tradeoff:
      "A deeper technical learning curve. Consistent weekly practice matters, and a new job is not guaranteed.",
    eligibility:
      "Start with spreadsheet basics and access to a laptop. Course and employer requirements need to be checked individually.",
    skills: ["Excel", "SQL", "Power BI", "Data storytelling"],
    milestones: [
      {
        title: "Build your foundations",
        detail:
          "Refresh spreadsheets and learn how to ask useful questions of data.",
        duration: "Months 1–2",
      },
      {
        title: "Learn the analyst toolkit",
        detail: "Practice SQL and Power BI with small retail datasets.",
        duration: "Months 3–5",
      },
      {
        title: "Make your experience visible",
        detail:
          "Build two portfolio projects around sales trends and stock planning.",
        duration: "Months 6–7",
      },
      {
        title: "Take the next career step",
        detail:
          "Prepare for interviews and apply to suitable junior analyst roles.",
        duration: "Months 8–9",
      },
    ],
  },
  {
    id: "b",
    label: "Plan B",
    title: "Move into business operations",
    subtitle: "Use the strengths you already have",
    cost: 18000,
    months: 6,
    tag: "A gentler transition",
    description:
      "Move toward an operations analyst role through stronger reporting and process improvement skills.",
    why: "This route builds directly on your current work. A lower learning budget and an internal transition could make the change more manageable.",
    tradeoff:
      "Less technical depth at first. Internal openings and manager support may determine the timing.",
    eligibility:
      "Experience with day-to-day business operations is useful. Internal transfer policies and job requirements vary.",
    skills: [
      "Advanced Excel",
      "Process mapping",
      "Reporting",
      "Stakeholder communication",
    ],
    milestones: [
      {
        title: "Map your transferable skills",
        detail:
          "Collect examples of process improvements from your current role.",
        duration: "Month 1",
      },
      {
        title: "Strengthen business reporting",
        detail:
          "Practice Excel, dashboards, and communicating clear recommendations.",
        duration: "Months 2–3",
      },
      {
        title: "Run a small improvement project",
        detail: "Propose a stock or sales reporting project at work.",
        duration: "Months 4–5",
      },
      {
        title: "Explore an adjacent role",
        detail:
          "Discuss internal openings and apply to business operations roles.",
        duration: "Month 6",
      },
    ],
  },
  {
    id: "c",
    label: "Plan C",
    title: "Start with reporting projects",
    subtitle: "A smaller step into a new field",
    cost: 8000,
    months: 4,
    tag: "Start smaller",
    description:
      "Learn practical spreadsheet reporting and build a small project portfolio before a larger career move.",
    why: "A smaller upfront commitment gives you room to explore. Your retail knowledge can help you design useful reports for small businesses.",
    tradeoff:
      "Project income can be irregular and is not guaranteed. Keep your current income while testing this route.",
    eligibility:
      "Basic computer skills and a laptop. Check each project’s requirements before committing to paid work.",
    skills: [
      "Spreadsheets",
      "Simple dashboards",
      "Client briefs",
      "Portfolio building",
    ],
    milestones: [
      {
        title: "Choose one practical skill",
        detail: "Learn spreadsheet cleanup, formulas, and clear charts.",
        duration: "Month 1",
      },
      {
        title: "Build a useful sample report",
        detail: "Create a weekly sales dashboard using sample data.",
        duration: "Month 2",
      },
      {
        title: "Test a small project",
        detail:
          "Ask a local business about a reporting need; agree on clear boundaries.",
        duration: "Month 3",
      },
      {
        title: "Review your next move",
        detail:
          "Use your experience to decide between more projects and deeper study.",
        duration: "Month 4",
      },
    ],
  },
];
export const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
export function duration(path: Pathway, profile: Profile) {
  return Math.ceil((path.months * 8) / profile.hours);
}
export function recommend(profile: Profile): PathId {
  const preferred: PathId =
    profile.goal === "Business analyst"
      ? "b"
      : profile.goal === "Reporting specialist"
        ? "c"
        : "a";
  if (profile.earnSoon) return "c";
  const preferredPath = pathways.find((p) => p.id === preferred)!;
  if (
    profile.budget >= preferredPath.cost &&
    (profile.hours >= 6 || preferred !== "a")
  )
    return preferred;
  if (profile.budget >= pathways[1].cost) return "b";
  return "c";
}
export function fitMessage(path: Pathway, profile: Profile) {
  if (path.cost > profile.budget)
    return `${money(path.cost - profile.budget)} above your budget`;
  if (profile.earnSoon && path.id !== "c")
    return "A longer route before testing new income";
  if (profile.hours < 6 && path.id === "a")
    return "Needs a longer study timeline";
  return "Within your budget · flexible learning";
}
export function recommendationReason(profile: Profile) {
  const path = pathways.find((p) => p.id === recommend(profile))!;
  if (path.cost > profile.budget)
    return "Even the smallest sample route exceeds this budget. Explore free introductory learning before committing to any paid option.";
  if (profile.earnSoon)
    return "Try a smaller reporting project sooner while protecting your existing income. Paid work is not guaranteed.";
  if (profile.hours < 6)
    return "A gradual route is easier to fit around your week. All timelines have been extended for your available study time.";
  if (profile.budget < 48000)
    return "A lower-cost route leaves more room in your budget while building on your operations experience.";
  if (profile.goal === "Business analyst")
    return "Business operations builds on your current experience and aligns with your business analyst goal.";
  if (profile.goal === "Reporting specialist")
    return "Practical reporting projects give you a focused starting point for your reporting specialist goal.";
  return "Part-time learning gives you a route into data analytics while keeping your current job and staying close to home.";
}
export type Opportunity = {
  id: string;
  kind: "Course" | "Job" | "Programme";
  title: string;
  provider: string;
  location: string;
  cost: string;
  time: string;
  description: string;
  requirements: string;
  skills: string[];
};
export const opportunities: Opportunity[] = [
  {
    id: "excel",
    kind: "Course",
    title: "Excel for real-world decisions",
    provider: "Pathwise Learning Studio",
    location: "Online · self-paced",
    cost: "₹2,400",
    time: "4 weeks",
    description:
      "Practice formulas, pivot tables, and clean charts with everyday business problems. Short lessons fit around a working week.",
    requirements:
      "Basic spreadsheet familiarity and access to a computer. Captions and downloadable notes are included in this example.",
    skills: ["Excel", "Business reporting"],
  },
  {
    id: "analyst",
    kind: "Job",
    title: "Junior operations analyst",
    provider: "Northstar Retail",
    location: "Kochi · hybrid",
    cost: "Salary to confirm",
    time: "Full-time",
    description:
      "Turn retail performance data into weekly reports and help the operations team spot opportunities to improve.",
    requirements:
      "Spreadsheet skills, clear communication, and retail experience. Hybrid attendance and workplace accommodations require confirmation.",
    skills: ["Reporting", "Retail operations"],
  },
  {
    id: "return",
    kind: "Programme",
    title: "Your next chapter fellowship",
    provider: "Career Bridge Collective",
    location: "Online · evenings",
    cost: "Funding to confirm",
    time: "12 weeks",
    description:
      "An example of a supported career-transition programme combining mentoring, flexible study, and portfolio feedback.",
    requirements:
      "Designed for working adults exploring a career change. Funding, selection criteria, and support provision require confirmation.",
    skills: ["Mentoring", "Career transition"],
  },
  {
    id: "sql",
    kind: "Course",
    title: "A practical introduction to SQL",
    provider: "Pathwise Learning Studio",
    location: "Online · self-paced",
    cost: "₹3,600",
    time: "6 weeks",
    description:
      "Learn to find answers in data, from your first query to joining sales and product tables.",
    requirements:
      "A laptop and comfort with basic tables. No programming experience is assumed in this example.",
    skills: ["SQL", "Data analysis"],
  },
];
export const tasks = [
  {
    id: "skills",
    title: "Map the skills you already use",
    detail: "Write down three ways you work with numbers.",
    time: "10 min",
    icon: "note",
  },
  {
    id: "lesson",
    title: "Try your first spreadsheet lesson",
    detail: "Explore a short course before committing.",
    time: "20 min",
    icon: "book",
  },
  {
    id: "schedule",
    title: "Make room for your next chapter",
    detail: "Choose two learning slots for this week.",
    time: "5 min",
    icon: "calendar",
  },
  {
    id: "project",
    title: "Find one problem worth exploring",
    detail: "Think of a question about sales or stock.",
    time: "15 min",
    icon: "bulb",
  },
];
