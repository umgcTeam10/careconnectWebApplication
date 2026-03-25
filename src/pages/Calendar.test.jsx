import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./Calendar.module.css", () => ({
  default: {
    calendar: "calendar",
    pageTitle: "pageTitle",
    subtitle: "subtitle",
    calendarCard: "calendarCard",
    calendarNav: "calendarNav",
    navBtn: "navBtn",
    monthYear: "monthYear",
    dayHeaders: "dayHeaders",
    dayHeader: "dayHeader",
    daysGrid: "daysGrid",
    dayCell: "dayCell",
    otherMonth: "otherMonth",
    selectedDay: "selectedDay",
    section: "section",
    scheduleTitle: "scheduleTitle",
    eventList: "eventList",
    eventCard: "eventCard",
    eventIcon: "eventIcon",
    eventContent: "eventContent",
    eventTitle: "eventTitle",
    eventDesc: "eventDesc",
    eventTime: "eventTime",
    eventProvider: "eventProvider",
    addEventBtn: "addEventBtn",
  },
}));

vi.mock("../components/Card", () => ({
  default: ({ children, className = "" }) => (
    <div data-testid="card" className={className}>
      {children}
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

vi.mock("../components/Icon", () => ({
  default: ({ name, size }) => (
    <span data-testid={`icon-${name}`} data-size={size} aria-hidden="true">
      {name}
    </span>
  ),
}));

vi.mock("../data/mockData", () => ({
  calendarEvents: [
    {
      id: 1,
      title: "Doctor Appointment",
      description: "Routine checkup",
      time: "9:00 AM",
      provider: "Dr. Smith",
      status: "SCHEDULED",
    },
    {
      id: 2,
      title: "Physical Therapy",
      description: "Recovery session",
      time: "2:00 PM",
      status: "COMPLETED",
    },
  ],
}));

import Calendar from "./Calendar";

describe("Calendar", () => {
  it("renders the page title, subtitle, and initial month/year", () => {
    render(<Calendar />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Calendar Overview" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("View your schedule and upcoming appointments"),
    ).toBeInTheDocument();

    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });

  it("renders all seven day headers", () => {
    render(<Calendar />);

    expect(screen.getByText("Sun")).toBeInTheDocument();
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
    expect(screen.getByText("Thu")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
    expect(screen.getByText("Sat")).toBeInTheDocument();
  });

  it("renders 42 day buttons in the calendar grid", () => {
    render(<Calendar />);

    const grid = screen.getByRole("grid", { name: /calendar days/i });
    const dayButtons = within(grid).getAllByRole("button");

    expect(dayButtons).toHaveLength(42);
  });

  it("marks the initial selected day as the current date", () => {
    render(<Calendar />);

    const selectedDay = screen.getByRole("button", { name: "January 26" });
    expect(selectedDay).toHaveAttribute("aria-current", "date");
  });

  it("goes to the previous month when Previous month is clicked", () => {
    render(<Calendar />);

    fireEvent.click(screen.getByRole("button", { name: /previous month/i }));

    expect(screen.getByText("December 2025")).toBeInTheDocument();
  });

  it("goes to the next month when Next month is clicked", () => {
    render(<Calendar />);

    fireEvent.click(screen.getByRole("button", { name: /next month/i }));

    expect(screen.getByText("February 2026")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "February 1" })).toHaveAttribute(
      "aria-current",
      "date",
    );
  });

  it("updates the selected day and schedule heading when a current month day is clicked", () => {
    render(<Calendar />);

    fireEvent.click(screen.getByRole("button", { name: "January 15" }));

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /schedule for .*january 15/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "January 15" })).toHaveAttribute(
      "aria-current",
      "date",
    );
  });

  it("navigates to the previous month when clicking an other-month day greater than 15", () => {
    const { container } = render(<Calendar />);

    const otherMonthButtons = Array.from(
      container.querySelectorAll(".otherMonth"),
    );
    const prevMonthDay = otherMonthButtons.find(
      (button) => button.textContent === "31",
    );

    fireEvent.click(prevMonthDay);

    expect(screen.getByText("December 2025")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /schedule for .*december 31/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the event list with event details", () => {
    render(<Calendar />);

    expect(screen.getByText("Doctor Appointment")).toBeInTheDocument();
    expect(screen.getByText("Routine checkup")).toBeInTheDocument();
    expect(screen.getByText("9:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();

    expect(screen.getByText("Physical Therapy")).toBeInTheDocument();
    expect(screen.getByText("Recovery session")).toBeInTheDocument();
    expect(screen.getByText("2:00 PM")).toBeInTheDocument();
  });

  it("renders badge variants based on event status", () => {
    render(<Calendar />);

    const badges = screen.getAllByTestId("badge");

    expect(badges[0]).toHaveTextContent("SCHEDULED");
    expect(badges[0]).toHaveAttribute("data-variant", "primary");

    expect(badges[1]).toHaveTextContent("COMPLETED");
    expect(badges[1]).toHaveAttribute("data-variant", "success");
  });

  it("renders the add new event button", () => {
    render(<Calendar />);

    expect(
      screen.getByRole("button", { name: /add new event/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
  });
});
