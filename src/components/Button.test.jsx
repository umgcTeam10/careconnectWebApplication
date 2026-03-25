import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./Button.module.css", () => ({
  default: {
    button: "button",
    primary: "primary",
    secondary: "secondary",
    danger: "danger",
    sm: "sm",
    md: "md",
    lg: "lg",
    fullWidth: "fullWidth",
  },
}));

import Button from "./Button";

describe("Button", () => {
  it("renders the button text", () => {
    render(<Button>Click Me</Button>);

    expect(
      screen.getByRole("button", { name: "Click Me" }),
    ).toBeInTheDocument();
  });

  it("applies default variant and size classes", () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole("button", { name: "Default Button" });
    expect(button).toHaveClass("button");
    expect(button).toHaveClass("primary");
    expect(button).toHaveClass("md");
  });

  it("applies a custom variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole("button", { name: "Secondary Button" });
    expect(button).toHaveClass("button");
    expect(button).toHaveClass("secondary");
  });

  it("applies a custom size", () => {
    render(<Button size="lg">Large Button</Button>);

    const button = screen.getByRole("button", { name: "Large Button" });
    expect(button).toHaveClass("button");
    expect(button).toHaveClass("lg");
  });

  it("applies the fullWidth class when fullWidth is true", () => {
    render(<Button fullWidth>Wide Button</Button>);

    const button = screen.getByRole("button", { name: "Wide Button" });
    expect(button).toHaveClass("fullWidth");
  });

  it("applies a custom className", () => {
    render(<Button className="custom-class">Styled Button</Button>);

    const button = screen.getByRole("button", { name: "Styled Button" });
    expect(button).toHaveClass("custom-class");
  });

  it("uses the provided button type", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("is disabled when disabled is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Press</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Press" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("passes through additional props", () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom Aria Label">
        Props Button
      </Button>,
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("aria-label", "Custom Aria Label");
  });
});
