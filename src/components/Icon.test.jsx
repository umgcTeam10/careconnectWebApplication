import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Icon from "./Icon";

describe("Icon", () => {
  it("renders an svg for a valid icon name", () => {
    const { container } = render(<Icon name="home" />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
  });

  it("uses the default size when no size is provided", () => {
    const { container } = render(<Icon name="home" />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
  });

  it("applies a custom size", () => {
    const { container } = render(<Icon name="menu" size={32} />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("applies a custom className", () => {
    const { container } = render(
      <Icon name="search" className="custom-class" />,
    );
    const svg = container.querySelector("svg");

    expect(svg).toHaveClass("custom-class");
  });

  it("renders as an accessible image when ariaLabel is provided", () => {
    render(<Icon name="mail" ariaLabel="Mail icon" />);

    const icon = screen.getByRole("img", { name: "Mail icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "Mail icon");
    expect(icon).toHaveAttribute("aria-hidden", "false");
  });

  it("renders as presentation when ariaLabel is not provided", () => {
    const { container } = render(<Icon name="lock" />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("role", "presentation");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("returns null for an invalid icon name", () => {
    const { container } = render(<Icon name="notARealIcon" />);

    expect(container.firstChild).toBeNull();
  });
});
