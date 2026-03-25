import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./HealthLogs.module.css", () => ({
  default: {
    healthLogs: "healthLogs",
    leftColumn: "leftColumn",
    rightColumn: "rightColumn",
    section: "section",
    summaryHeader: "summaryHeader",
    sectionTitle: "sectionTitle",
    viewReport: "viewReport",
    summaryGrid: "summaryGrid",
    summaryItem: "summaryItem",
    summaryIcon: "summaryIcon",
    summaryIconGreen: "summaryIconGreen",
    summaryIconOrange: "summaryIconOrange",
    summaryLabel: "summaryLabel",
    summaryValue: "summaryValue",
    summaryUnit: "summaryUnit",
    filtersLabel: "filtersLabel",
    filters: "filters",
    filterBtn: "filterBtn",
    activeFilter: "activeFilter",
    activityHeader: "activityHeader",
    activityTitle: "activityTitle",
    activityMeta: "activityMeta",
    activityChart: "activityChart",
    activityDay: "activityDay",
    activityBar: "activityBar",
    activityLabel: "activityLabel",
    recentHeader: "recentHeader",
    recentActions: "recentActions",
    search: "search",
    searchIcon: "searchIcon",
    searchInput: "searchInput",
    entriesHeader: "entriesHeader",
    entriesLabel: "entriesLabel",
    logList: "logList",
    logCard: "logCard",
    logDot: "logDot",
    logContent: "logContent",
    logHeader: "logHeader",
    logTitle: "logTitle",
    logDate: "logDate",
    logMeta: "logMeta",
    logReading: "logReading",
    logNotes: "logNotes",
  },
}));

vi.mock("../components/Card", () => ({
  default: ({ children, className = "" }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("../components/SectionHeader", () => ({
  default: ({ title }) => <div data-testid="section-header">{title}</div>,
}));

vi.mock("../components/Button", () => ({
  default: ({ children, variant, size }) => (
    <button type="button" data-variant={variant} data-size={size}>
      {children}
    </button>
  ),
}));

vi.mock("../components/Badge", () => ({
  default: ({ children, variant }) => (
    <span data-testid="badge" data-variant={variant}>
      {children}
    </span>
  ),
}));

vi.mock("../components/Icon", () => ({
  default: ({ name, size, className = "" }) => (
    <span
      data-testid={`icon-${name}`}
      data-size={size}
      className={className}
      aria-hidden="true"
    >
      {name}
    </span>
  ),
}));

vi.mock("../data/mockData", () => ({
  healthLogsSummary: {
    bpToday: "120/80",
    bpUnit: "mmHg",
    walks: "3",
    walksLabel: "completed",
    meals: "2",
    mealsUnit: "logged",
    mood: "Good",
    moodLabel: "today",
  },
  weeklyActivity: [
    { day: "Sun", level: 0 },
    { day: "Mon", level: 1 },
    { day: "Tue", level: 2 },
    { day: "Wed", level: 3 },
    { day: "Thu", level: 1 },
    { day: "Fri", level: 2 },
    { day: "Sat", level: 0 },
  ],
  recentLogs: [
    {
      id: 1,
      type: "vitals",
      title: "Blood Pressure Check",
      date: "Jan 25",
      details: "Morning reading",
      values: {
        systolic: 120,
        diastolic: 80,
        heartRate: 72,
      },
    },
    {
      id: 2,
      type: "lab",
      title: "Lab Results",
      date: "Jan 24",
      details: "Cholesterol panel",
      reading: "Normal range",
    },
    {
      id: 3,
      type: "wellness",
      title: "Mood Check",
      date: "Jan 23",
      details: "Afternoon check",
      notes: "Feeling good today",
    },
    {
      id: 4,
      type: "meal",
      title: "Lunch Log",
      date: "Jan 22",
      details: "Balanced meal",
    },
  ],
}));

import HealthLogs from "./HealthLogs";

describe("HealthLogs", () => {
  it("renders the health summary section and summary values", () => {
    render(<HealthLogs />);

    const summaryHeading = screen.getByRole("heading", {
      level: 2,
      name: "Health Summary",
    });

    expect(summaryHeading).toBeInTheDocument();

    const summarySection = summaryHeading.closest("section");
    expect(summarySection).toBeInTheDocument();

    expect(
      within(summarySection).getByRole("button", { name: "View Report" }),
    ).toBeInTheDocument();

    expect(within(summarySection).getByText("BP Today")).toBeInTheDocument();
    expect(within(summarySection).getByText("120/80")).toBeInTheDocument();
    expect(within(summarySection).getByText("mmHg")).toBeInTheDocument();

    expect(within(summarySection).getByText("Walks")).toBeInTheDocument();
    expect(within(summarySection).getByText("3")).toBeInTheDocument();
    expect(within(summarySection).getByText("completed")).toBeInTheDocument();

    expect(within(summarySection).getByText("Meals")).toBeInTheDocument();
    expect(within(summarySection).getByText("2")).toBeInTheDocument();
    expect(within(summarySection).getByText("logged")).toBeInTheDocument();

    expect(within(summarySection).getByText("Mood")).toBeInTheDocument();
    expect(within(summarySection).getByText("Good")).toBeInTheDocument();
    expect(within(summarySection).getByText("today")).toBeInTheDocument();
  });

  it("renders summary icons with the expected names", () => {
    render(<HealthLogs />);

    expect(screen.getByTestId("icon-activity")).toBeInTheDocument();
    expect(screen.getByTestId("icon-checkCircle")).toBeInTheDocument();
    expect(screen.getAllByTestId("icon-heart")).toHaveLength(1);
    expect(screen.getByTestId("icon-smile")).toBeInTheDocument();
  });

  it("renders filter buttons with All active by default", () => {
    render(<HealthLogs />);

    const allButton = screen.getByRole("button", { name: "All" });
    const vitalsButton = screen.getByRole("button", { name: "Vitals" });
    const mealsButton = screen.getByRole("button", { name: "Meals" });
    const moodButton = screen.getByRole("button", { name: "Mood" });

    expect(allButton).toHaveAttribute("aria-pressed", "true");
    expect(vitalsButton).toHaveAttribute("aria-pressed", "false");
    expect(mealsButton).toHaveAttribute("aria-pressed", "false");
    expect(moodButton).toHaveAttribute("aria-pressed", "false");
  });

  it("updates the active filter when a filter button is clicked", () => {
    render(<HealthLogs />);

    const allButton = screen.getByRole("button", { name: "All" });
    const moodButton = screen.getByRole("button", { name: "Mood" });

    fireEvent.click(moodButton);

    expect(moodButton).toHaveAttribute("aria-pressed", "true");
    expect(allButton).toHaveAttribute("aria-pressed", "false");
  });

  it("renders the weekly activity section and chart labels", () => {
    render(<HealthLogs />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Weekly Activity" }),
    ).toBeInTheDocument();

    expect(screen.getByText("6/7 Days")).toBeInTheDocument();
    expect(screen.getByLabelText("Weekly activity chart")).toBeInTheDocument();

    expect(screen.getByText("Sun")).toBeInTheDocument();
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
    expect(screen.getByText("Thu")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
    expect(screen.getByText("Sat")).toBeInTheDocument();
  });

  it("renders activity bars with accessible labels", () => {
    render(<HealthLogs />);

    expect(screen.getByLabelText("Sun: activity level 0")).toBeInTheDocument();
    expect(screen.getByLabelText("Mon: activity level 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Tue: activity level 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Wed: activity level 3")).toBeInTheDocument();
  });

  it("renders the recent logs header, search input, and new log button", () => {
    render(<HealthLogs />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Recent Logs" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("searchbox", { name: "Search health logs" }),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Search logs... (Ctrl+F)"),
    ).toBeInTheDocument();

    const newLogButton = screen.getByRole("button", { name: /new log/i });
    expect(newLogButton).toBeInTheDocument();
    expect(newLogButton).toHaveAttribute("data-variant", "primary");
    expect(newLogButton).toHaveAttribute("data-size", "sm");

    expect(screen.getByTestId("icon-search")).toBeInTheDocument();
    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
  });

  it("renders the entries count badge using recentLogs length", () => {
    render(<HealthLogs />);

    expect(screen.getByText("Entries")).toBeInTheDocument();

    const badges = screen.getAllByTestId("badge");
    expect(badges[0]).toHaveTextContent("4");
    expect(badges[0]).toHaveAttribute("data-variant", "primary");
  });

  it("renders recent log items with mapped and fallback badge labels", () => {
    render(<HealthLogs />);

    expect(screen.getByText("Blood Pressure Check")).toBeInTheDocument();
    expect(screen.getByText("Lab Results")).toBeInTheDocument();
    expect(screen.getByText("Mood Check")).toBeInTheDocument();
    expect(screen.getByText("Lunch Log")).toBeInTheDocument();

    const vitalsBadge = screen.getByText("VITALS");
    const labBadge = screen.getByText("LAB");
    const wellnessBadge = screen.getByText("WELLNESS");
    const fallbackBadge = screen.getByText("MEAL");

    expect(vitalsBadge).toHaveAttribute("data-variant", "info");
    expect(labBadge).toHaveAttribute("data-variant", "success");
    expect(wellnessBadge).toHaveAttribute("data-variant", "primary");
    expect(fallbackBadge).toHaveAttribute("data-variant", "info");
  });

  it("renders conditional log details like values, reading, and notes", () => {
    render(<HealthLogs />);

    expect(screen.getByText("Jan 25 · Morning reading")).toBeInTheDocument();

    expect(
      screen.getByText("Systolic: 120 · Diastolic: 80 · Heart Rate: 72"),
    ).toBeInTheDocument();

    expect(screen.getByText("Jan 24 · Cholesterol panel")).toBeInTheDocument();
    expect(screen.getByText("Normal range")).toBeInTheDocument();

    expect(screen.getByText("Jan 23 · Afternoon check")).toBeInTheDocument();
    expect(screen.getByText("Feeling good today")).toBeInTheDocument();

    expect(screen.getByText("Jan 22 · Balanced meal")).toBeInTheDocument();
  });
});
