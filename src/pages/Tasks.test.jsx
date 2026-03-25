import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./Tasks.module.css", () => ({
  default: {
    tasks: "tasks",
    mainContent: "mainContent",
    pageTitle: "pageTitle",
    subtitle: "subtitle",
    statsGrid: "statsGrid",
    section: "section",
    actions: "actions",
    searchWrap: "searchWrap",
    searchIcon: "searchIcon",
    searchInput: "searchInput",
    overdueAlert: "overdueAlert",
    viewOverdue: "viewOverdue",
    tabs: "tabs",
    tab: "tab",
    activeTab: "activeTab",
    taskList: "taskList",
    taskCard: "taskCard",
    taskHeader: "taskHeader",
    taskTitle: "taskTitle",
    taskDesc: "taskDesc",
    taskMeta: "taskMeta",
    taskTag: "taskTag",
    taskActions: "taskActions",
    rightSidebar: "rightSidebar",
    appointmentSidebar: "appointmentSidebar",
    appointmentBadges: "appointmentBadges",
    appointmentTitle: "appointmentTitle",
    appointmentMeta: "appointmentMeta",
    appointmentActions: "appointmentActions",
  },
}));

vi.mock("../components/Card", () => ({
  default: ({ children, className = "" }) => (
    <div data-testid="card" className={className}>
      {children}
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

vi.mock("../components/Button", () => ({
  default: ({ children, variant, size, type = "button" }) => (
    <button type={type} data-variant={variant} data-size={size}>
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
  taskOverview: {
    today: 4,
    overdue: 1,
    done: 9,
  },
  todaysTasks: [
    {
      id: 1,
      title: "Take blood pressure reading",
      priority: "HIGH",
      description: "Check and record your morning blood pressure.",
      time: "8:00 AM",
      date: "Jan 26",
      tag: "Vitals",
    },
    {
      id: 2,
      title: "Take afternoon medication",
      priority: "MEDIUM",
      description: "Take prescribed medication after lunch.",
      time: "1:00 PM",
      date: "Jan 26",
    },
  ],
  overdueTasks: [
    {
      id: 3,
      title: "Complete physical therapy exercises",
      priority: "HIGH",
      description: "Finish the full mobility routine from yesterday.",
      time: "6:00 PM",
      date: "Jan 25",
      tag: "Rehab",
    },
  ],
}));

import Tasks from "./Tasks";

describe("Tasks", () => {
  it("renders the task overview heading, subtitle, and stat cards", () => {
    render(<Tasks />);

    const overviewHeading = screen.getByRole("heading", {
      level: 2,
      name: "Task Overview",
    });

    expect(overviewHeading).toBeInTheDocument();
    expect(
      screen.getByText("Manage your daily health tasks and activities"),
    ).toBeInTheDocument();

    const overviewSection = overviewHeading.closest("section");
    expect(overviewSection).toBeInTheDocument();

    const statCards = within(overviewSection).getAllByTestId("stat-card");
    expect(statCards).toHaveLength(3);

    expect(within(overviewSection).getByText("Today")).toBeInTheDocument();
    expect(within(overviewSection).getByText("Overdue")).toBeInTheDocument();
    expect(within(overviewSection).getByText("Done")).toBeInTheDocument();

    expect(within(overviewSection).getByText("4")).toBeInTheDocument();
    expect(within(overviewSection).getByText("1")).toBeInTheDocument();
    expect(within(overviewSection).getByText("9")).toBeInTheDocument();
  });

  it("renders action buttons and the search input", () => {
    render(<Tasks />);

    const addTaskButton = screen.getByRole("button", { name: /add task/i });
    const filterButton = screen.getByRole("button", { name: /filter/i });
    const searchInput = screen.getByRole("searchbox", {
      name: /search tasks/i,
    });

    expect(addTaskButton).toBeInTheDocument();
    expect(addTaskButton).toHaveAttribute("data-variant", "primary");
    expect(addTaskButton).toHaveAttribute("data-size", "sm");

    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveAttribute("data-variant", "secondary");
    expect(filterButton).toHaveAttribute("data-size", "sm");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Search tasks...");

    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
    expect(screen.getByTestId("icon-filter")).toBeInTheDocument();
    expect(screen.getByTestId("icon-search")).toBeInTheDocument();
  });

  it("renders the overdue alert when overdue tasks exist", () => {
    render(<Tasks />);

    expect(screen.getByText("You have 1 overdue tasks")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "View →" })).toBeInTheDocument();
  });

  it("renders the task tabs with Today selected by default", () => {
    render(<Tasks />);

    expect(screen.getByRole("tab", { name: "Upcoming" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("tab", { name: "Today" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Overdue" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("tab", { name: "Done" })).toHaveAttribute(
      "aria-selected",
      "false",
    );

    expect(
      screen.getByRole("list", { name: "Today tasks" }),
    ).toBeInTheDocument();
  });

  it("renders today tasks by default", () => {
    render(<Tasks />);

    const taskList = screen.getByRole("list", { name: "Today tasks" });

    expect(
      within(taskList).getByText("Take blood pressure reading"),
    ).toBeInTheDocument();
    expect(
      within(taskList).getByText(
        "Check and record your morning blood pressure.",
      ),
    ).toBeInTheDocument();
    expect(within(taskList).getByText("8:00 AM | Jan 26")).toBeInTheDocument();
    expect(within(taskList).getByText("Vitals")).toBeInTheDocument();

    expect(
      within(taskList).getByText("Take afternoon medication"),
    ).toBeInTheDocument();
    expect(
      within(taskList).getByText("Take prescribed medication after lunch."),
    ).toBeInTheDocument();
    expect(within(taskList).getByText("1:00 PM | Jan 26")).toBeInTheDocument();
  });

  it("renders task priority badges with correct variants", () => {
    render(<Tasks />);

    const highBadge = screen.getByText("HIGH");
    const mediumBadge = screen.getByText("MEDIUM");

    expect(highBadge).toHaveAttribute("data-variant", "danger");
    expect(mediumBadge).toHaveAttribute("data-variant", "warning");
  });

  it("renders task action buttons for displayed tasks", () => {
    render(<Tasks />);

    const taskList = screen.getByRole("list", { name: "Today tasks" });
    const doneButtons = within(taskList).getAllByRole("button", {
      name: "Done",
    });
    const rescheduleButtons = within(taskList).getAllByRole("button", {
      name: "Reschedule",
    });

    expect(doneButtons).toHaveLength(2);
    expect(rescheduleButtons).toHaveLength(2);

    doneButtons.forEach((button) => {
      expect(button).toHaveAttribute("data-variant", "primary");
      expect(button).toHaveAttribute("data-size", "sm");
    });

    rescheduleButtons.forEach((button) => {
      expect(button).toHaveAttribute("data-variant", "ghost");
      expect(button).toHaveAttribute("data-size", "sm");
    });
  });

  it("switches to overdue tab and displays overdue tasks", () => {
    render(<Tasks />);

    fireEvent.click(screen.getByRole("tab", { name: "Overdue" }));

    expect(screen.getByRole("tab", { name: "Overdue" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Today" })).toHaveAttribute(
      "aria-selected",
      "false",
    );

    const overdueList = screen.getByRole("list", { name: "Overdue tasks" });
    expect(overdueList).toBeInTheDocument();

    expect(
      within(overdueList).getByText("Complete physical therapy exercises"),
    ).toBeInTheDocument();
    expect(
      within(overdueList).getByText(
        "Finish the full mobility routine from yesterday.",
      ),
    ).toBeInTheDocument();
    expect(
      within(overdueList).getByText("6:00 PM | Jan 25"),
    ).toBeInTheDocument();
    expect(within(overdueList).getByText("Rehab")).toBeInTheDocument();

    expect(
      screen.queryByText("Take blood pressure reading"),
    ).not.toBeInTheDocument();

    const overdueHighBadge = within(overdueList).getByText("HIGH");
    expect(overdueHighBadge).toHaveAttribute("data-variant", "danger");
  });

  it("switches to Upcoming and Done tabs while keeping the tab state updated", () => {
    render(<Tasks />);

    fireEvent.click(screen.getByRole("tab", { name: "Upcoming" }));
    expect(screen.getByRole("tab", { name: "Upcoming" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("list", { name: "Upcoming tasks" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Done" }));
    expect(screen.getByRole("tab", { name: "Done" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("list", { name: "Done tasks" }),
    ).toBeInTheDocument();
  });

  it("renders the appointment sidebar content and action buttons", () => {
    render(<Tasks />);

    expect(screen.getByText("NOW")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();

    const nowBadge = screen.getByText("NOW");
    const ptBadge = screen.getByText("PT");

    expect(nowBadge).toHaveAttribute("data-variant", "danger");
    expect(ptBadge).toHaveAttribute("data-variant", "info");

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Physical Therapy Appointment",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Due now · 02:00 PM · A1 clinic"),
    ).toBeInTheDocument();

    const startButton = screen.getByRole("button", { name: "Start" });
    const snoozeButton = screen.getByRole("button", { name: "Snooze 10 min" });

    expect(startButton).toHaveAttribute("data-variant", "primary");
    expect(startButton).toHaveAttribute("data-size", "sm");

    expect(snoozeButton).toHaveAttribute("data-variant", "outline");
    expect(snoozeButton).toHaveAttribute("data-size", "sm");
  });
});
