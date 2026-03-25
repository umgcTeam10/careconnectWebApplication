import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./Badge.module.css", () => ({
  default: {
    badge: "badge",
    default: "default",
    success: "success",
    warning: "warning",
    danger: "danger",
  },
}));

import Badge from "./Badge";

describe("Badge", () => {
  it("renders the children", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies the default variant when no variant is provided", () => {
    render(<Badge>Default Badge</Badge>);

    const badge = screen.getByText("Default Badge");
    expect(badge).toHaveClass("badge");
    expect(badge).toHaveClass("default");
  });

  it("applies a custom variant", () => {
    render(<Badge variant="success">Active</Badge>);

    const badge = screen.getByText("Active");
    expect(badge).toHaveClass("badge");
    expect(badge).toHaveClass("success");
  });

  it("applies an additional className", () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);

    const badge = screen.getByText("Custom Badge");
    expect(badge).toHaveClass("badge");
    expect(badge).toHaveClass("default");
    expect(badge).toHaveClass("custom-class");
  });
});
