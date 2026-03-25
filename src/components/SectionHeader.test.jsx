import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./SectionHeader.module.css", () => ({
  default: {
    sectionHeader: "sectionHeader",
    title: "title",
    action: "action",
  },
}));

import SectionHeader from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders the title", () => {
    render(<SectionHeader title="Appointments" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Appointments" }),
    ).toBeInTheDocument();
  });

  it("renders an action button when actionLabel is provided", () => {
    render(<SectionHeader title="Tasks" actionLabel="View All" />);

    const button = screen.getByRole("button", { name: "View All" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("action");
  });

  it("calls onAction when the action button is clicked", () => {
    const handleAction = vi.fn();

    render(
      <SectionHeader
        title="Messages"
        actionLabel="Open"
        onAction={handleAction}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("renders a custom action element when action is provided and actionLabel is not", () => {
    render(
      <SectionHeader title="Care Team" action={<a href="/team">See Team</a>} />,
    );

    const link = screen.getByRole("link", { name: "See Team" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/team");
  });

  it("does not render the custom action element when actionLabel is provided", () => {
    render(
      <SectionHeader
        title="Schedule"
        actionLabel="Edit"
        action={<a href="/calendar">Calendar Link</a>}
      />,
    );

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Calendar Link" }),
    ).not.toBeInTheDocument();
  });

  it("renders no action control when neither action nor actionLabel is provided", () => {
    render(<SectionHeader title="Overview" />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
