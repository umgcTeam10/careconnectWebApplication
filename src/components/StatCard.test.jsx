import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./StatCard.module.css", () => ({
  default: {
    statCard: "statCard",
    iconWrap: "iconWrap",
    value: "value",
    label: "label",
  },
}));

vi.mock("./Icon", () => ({
  default: ({ name, size }) => (
    <span data-testid={`icon-${name}`} data-size={size}>
      {name}
    </span>
  ),
}));

import StatCard from "./StatCard";

describe("StatCard", () => {
  it("renders the value and label", () => {
    render(
      <StatCard
        icon="heart"
        iconColor="#ff0000"
        value="24"
        label="Appointments"
      />,
    );

    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("Appointments")).toBeInTheDocument();
  });

  it("renders the icon with the correct name and size", () => {
    render(
      <StatCard icon="calendar" iconColor="#2563eb" value="8" label="Events" />,
    );

    const icon = screen.getByTestId("icon-calendar");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "20");
  });

  it("applies the icon color style", () => {
    const { container } = render(
      <StatCard
        icon="tasks"
        iconColor="rgb(0, 128, 0)"
        value="5"
        label="Tasks"
      />,
    );

    const iconWrap = container.querySelector(".iconWrap");
    expect(iconWrap).toHaveStyle({ color: "rgb(0, 128, 0)" });
  });

  it("applies the expected CSS classes", () => {
    const { container } = render(
      <StatCard icon="messages" iconColor="#000" value="12" label="Messages" />,
    );

    const card = container.querySelector(".statCard");
    const value = screen.getByText("12");
    const label = screen.getByText("Messages");

    expect(card).toBeInTheDocument();
    expect(value).toHaveClass("value");
    expect(label).toHaveClass("label");
  });
});
