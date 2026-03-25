import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("./BottomNav.module.css", () => ({
  default: {
    bottomNav: "bottomNav",
    navList: "navList",
    navItem: "navItem",
    active: "active",
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

vi.mock("../data/mockData", () => ({
  navItems: [
    { path: "/", label: "Home", icon: "home" },
    { path: "/calendar", label: "Calendar", icon: "calendar" },
    { path: "/profile", label: "Profile", icon: "user" },
  ],
}));

import BottomNav from "./BottomNav";

describe("BottomNav", () => {
  it("renders the navigation landmark", () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("navigation", { name: /main navigation/i }),
    ).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders icons for each navigation item", () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("icon-home")).toBeInTheDocument();
    expect(screen.getByTestId("icon-calendar")).toBeInTheDocument();
    expect(screen.getByTestId("icon-user")).toBeInTheDocument();
  });

  it("renders links with the correct destinations", () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /calendar/i })).toHaveAttribute(
      "href",
      "/calendar",
    );
    expect(screen.getByRole("link", { name: /profile/i })).toHaveAttribute(
      "href",
      "/profile",
    );
  });

  it("applies the active class to the current route", () => {
    render(
      <MemoryRouter initialEntries={["/calendar"]}>
        <BottomNav />
      </MemoryRouter>,
    );

    const activeLink = screen.getByRole("link", { name: /calendar/i });
    const inactiveLink = screen.getByRole("link", { name: /home/i });

    expect(activeLink).toHaveClass("navItem");
    expect(activeLink).toHaveClass("active");
    expect(inactiveLink).toHaveClass("navItem");
    expect(inactiveLink).not.toHaveClass("active");
  });
});
