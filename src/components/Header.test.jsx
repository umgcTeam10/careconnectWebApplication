import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("./Header.module.css", () => ({
  default: {
    header: "header",
    menuButton: "menuButton",
    title: "title",
    headerRight: "headerRight",
    dateTime: "dateTime",
    userName: "userName",
  },
}));

vi.mock("./Icon", () => ({
  default: ({ name, size }) => (
    <span data-testid={`icon-${name}`} data-size={size}>
      {name}
    </span>
  ),
}));

vi.mock("./Badge", () => ({
  default: ({ children, variant }) => (
    <span data-testid="badge" data-variant={variant}>
      {children}
    </span>
  ),
}));

vi.mock("../data/mockData", () => ({
  currentUser: {
    careRecipient: "Jane Doe",
  },
}));

import Header from "./Header";

describe("Header", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 25, 3, 45, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the default title", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: "CareConnect" }),
    ).toBeInTheDocument();
  });

  it("renders a custom title", () => {
    render(<Header title="Dashboard" />);
    expect(
      screen.getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
  });

  it("renders the menu button with the correct aria-label", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /open navigation menu/i }),
    ).toBeInTheDocument();
  });

  it("calls onMenuToggle when the menu button is clicked", () => {
    const handleMenuToggle = vi.fn();

    render(<Header onMenuToggle={handleMenuToggle} />);

    fireEvent.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    expect(handleMenuToggle).toHaveBeenCalledTimes(1);
  });

  it("renders the menu icon", () => {
    render(<Header />);
    const icon = screen.getByTestId("icon-menu");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "24");
  });

  it("renders the formatted date and time", () => {
    render(<Header />);
    expect(
      screen.getByText("Wednesday, March 25, 2026 | 3:45 AM"),
    ).toBeInTheDocument();
  });

  it("renders the first name of the care recipient", () => {
    render(<Header />);
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("renders the patient badge with the primary variant", () => {
    render(<Header />);
    const badge = screen.getByTestId("badge");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("PATIENT");
    expect(badge).toHaveAttribute("data-variant", "primary");
  });
});
