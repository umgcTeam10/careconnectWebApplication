import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./Card.module.css", () => ({
  default: {
    card: "card",
    "pad-sm": "pad-sm",
    "pad-md": "pad-md",
    "pad-lg": "pad-lg",
  },
}));

import Card from "./Card";

describe("Card", () => {
  it("renders the children", () => {
    render(<Card>Card Content</Card>);

    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies the default padding class when no padding is provided", () => {
    render(<Card>Default Padding</Card>);

    const card = screen.getByText("Default Padding");
    expect(card).toHaveClass("card");
    expect(card).toHaveClass("pad-md");
  });

  it("applies a custom padding class", () => {
    render(<Card padding="lg">Large Padding</Card>);

    const card = screen.getByText("Large Padding");
    expect(card).toHaveClass("card");
    expect(card).toHaveClass("pad-lg");
  });

  it("applies an additional className", () => {
    render(<Card className="custom-class">Styled Card</Card>);

    const card = screen.getByText("Styled Card");
    expect(card).toHaveClass("card");
    expect(card).toHaveClass("pad-md");
    expect(card).toHaveClass("custom-class");
  });

  it("passes through additional props", () => {
    render(
      <Card data-testid="card" aria-label="info card">
        Accessible Card
      </Card>,
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("aria-label", "info card");
  });
});
