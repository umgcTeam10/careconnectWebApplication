import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("./Dashboard.module.css", () => ({
  default: {
    dashboard: "dashboard",
    mainContent: "mainContent",
    pageTitle: "pageTitle",
    subtitle: "subtitle",
    statsGrid: "statsGrid",
    section: "section",
    wellnessCard: "wellnessCard",
    wellnessContent: "wellnessContent",
    wellnessIcon: "wellnessIcon",
    wellnessTitle: "wellnessTitle",
    wellnessText: "wellnessText",
    wellnessLink: "wellnessLink",
    taskList: "taskList",
    taskCard: "taskCard",
    taskHeader: "taskHeader",
    taskTitle: "taskTitle",
    taskTime: "taskTime",
    summarySubtitle: "summarySubtitle",
    vitalRow: "vitalRow",
    vitalInfo: "vitalInfo",
    vitalIcon: "vitalIcon",
    vitalLabel: "vitalLabel",
    vitalValue: "vitalValue",
    viewHistoryLink: "viewHistoryLink",
    rightSidebar: "rightSidebar",
    appointmentCard: "appointmentCard",
    appointmentHeader: "appointmentHeader",
    appointmentTitle: "appointmentTitle",
    appointmentType: "appointmentType",
    appointmentName: "appointmentName",
    appointmentMeta: "appointmentMeta",
    appointmentProvider: "appointmentProvider",
    careTeamCard: "careTeamCard",
    careTeamIcon: "careTeamIcon",
    careTeamTitle: "careTeamTitle",
    careTeamText: "careTeamText",
    wellnessCheckItem: "wellnessCheckItem",
    wellnessCheckIcon: "wellnessCheckIcon",
    wellnessCheckTitle: "wellnessCheckTitle",
    wellnessCheckDetail: "wellnessCheckDetail",
    wellnessCheckDate: "wellnessCheckDate",
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
  default: ({ title, actionLabel }) => (
    <div data-testid="section-header">
      <h2>{title}</h2>
      {actionLabel ? <button type="button">{actionLabel}</button> : null}
    </div>
  ),
}));

vi.mock("../components/StatCard", () => ({
  default: ({ icon, iconColor, value, label }) => (
    <div data-testid="stat-card" data-icon={icon} data-icon-color={iconColor}>
      <span>{value}</span>
      <span>{label}</span>
    </div>
  ),
}));

vi.mock("../components/Badge", () => ({
  default: ({ children, variant }) => (
    <span data-testid="badge" data-variant={variant}>
      {children}
    </span>
  ),
}));

vi.mock("../components/Button", () => ({
  default: ({ children, variant, size, fullWidth }) => (
    <button
      type="button"
      data-variant={variant}
      data-size={size}
      data-fullwidth={String(!!fullWidth)}
    >
      {children}
    </button>
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
  healthSummary: {
    completed: 4,
    pending: 2,
    appointments: 3,
  },
  todaysTasks: [
    {
      id: 1,
      title: "Take morning medication",
      priority: "High",
      time: "8:00 AM",
    },
    {
      id: 2,
      title: "Physical therapy exercises",
      priority: "Medium",
      time: "2:00 PM",
    },
  ],
}));

import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("renders the main page heading and subtitle", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Your Health Today" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Here’s your care summary for today"),
    ).toBeInTheDocument();
  });

  it("renders the health summary stat cards", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    const statCards = screen.getAllByTestId("stat-card");
    expect(statCards).toHaveLength(3);

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Appointments")).toBeInTheDocument();

    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders the wellness card and health logs link", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "How are you feeling today?",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Take a moment to log your mood and any symptoms"),
    ).toBeInTheDocument();

    const logWellnessLink = screen.getByRole("link", {
      name: /log wellness check/i,
    });
    expect(logWellnessLink).toHaveAttribute("href", "/health-logs");

    const logWellnessButton = screen.getByRole("button", {
      name: /log wellness check/i,
    });
    expect(logWellnessButton).toHaveAttribute("data-variant", "primary");
    expect(logWellnessButton).toHaveAttribute("data-size", "sm");
  });

  it("renders today's tasks with warning badges", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    const tasksHeading = screen.getByRole("heading", {
      level: 2,
      name: "Today's Tasks",
    });

    expect(tasksHeading).toBeInTheDocument();

    const tasksSectionHeader = tasksHeading.closest(
      '[data-testid="section-header"]',
    );
    expect(tasksSectionHeader).toBeInTheDocument();

    expect(
      within(tasksSectionHeader).getByRole("button", { name: "View All →" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Take morning medication")).toBeInTheDocument();
    expect(screen.getByText("8:00 AM")).toBeInTheDocument();

    expect(screen.getByText("Physical therapy exercises")).toBeInTheDocument();
    expect(screen.getByText("2:00 PM")).toBeInTheDocument();

    const highBadge = screen.getByText("High");
    const mediumBadge = screen.getByText("Medium");

    expect(highBadge).toHaveAttribute("data-variant", "warning");
    expect(mediumBadge).toHaveAttribute("data-variant", "warning");
  });

  it("renders the health summary section and history link", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Health Summary" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Recent vitals and measurements"),
    ).toBeInTheDocument();

    expect(screen.getByText("Blood Pressure")).toBeInTheDocument();
    expect(screen.getByText("120/80")).toBeInTheDocument();

    expect(screen.getByText("Heart Rate")).toBeInTheDocument();
    expect(screen.getByText("72 bpm")).toBeInTheDocument();

    const historyLink = screen.getByRole("link", {
      name: /view full history/i,
    });
    expect(historyLink).toHaveAttribute("href", "/health-logs");
  });

  it("renders the next appointment card and reminder button props", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Next Appointment" }),
    ).toBeInTheDocument();
    expect(screen.getByText("THERAPY")).toBeInTheDocument();
    expect(screen.getByText("Check-up")).toBeInTheDocument();
    expect(screen.getByText("Knee rehabilitation session")).toBeInTheDocument();
    expect(screen.getByText("2026-01-26 at 10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Dr. Lisa Chen, PT")).toBeInTheDocument();

    const reminderButton = screen.getByRole("button", {
      name: /set reminder/i,
    });
    expect(reminderButton).toHaveAttribute("data-variant", "outline");
    expect(reminderButton).toHaveAttribute("data-size", "sm");
    expect(reminderButton).toHaveAttribute("data-fullwidth", "true");
  });

  it("renders the care team card and messages link", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Your care team is here for you",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Need help or have questions? Reach out anytime."),
    ).toBeInTheDocument();

    const sendMessageLink = screen.getByRole("link", { name: /send message/i });
    expect(sendMessageLink).toHaveAttribute("href", "/messages");

    const sendMessageButton = screen.getByRole("button", {
      name: /send message/i,
    });
    expect(sendMessageButton).toHaveAttribute("data-variant", "primary");
    expect(sendMessageButton).toHaveAttribute("data-size", "sm");
  });

  it("renders the recent wellness check section", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Recent Wellness Check" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Mood Check")).toBeInTheDocument();
    expect(screen.getByText("Feeling good today")).toBeInTheDocument();
    expect(screen.getByText("Jan 25, 1:14 PM")).toBeInTheDocument();
  });
});
