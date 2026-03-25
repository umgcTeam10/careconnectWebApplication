import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("./Sidebar.module.css", () => ({
  default: {
    overlay: "overlay",
    sidebar: "sidebar",
    open: "open",
    brand: "brand",
    logo: "logo",
    brandText: "brandText",
    brandName: "brandName",
    brandSub: "brandSub",
    nav: "nav",
    navList: "navList",
    navItem: "navItem",
    active: "active",
    sidebarFooter: "sidebarFooter",
    userProfile: "userProfile",
    userAvatar: "userAvatar",
    userInfo: "userInfo",
    userName: "userName",
    userRole: "userRole",
  },
}));

vi.mock("./Icon", () => ({
  default: ({ name, size }) => (
    <span data-testid={`icon-${name}`} data-size={size} aria-hidden="true">
      {name}
    </span>
  ),
}));

vi.mock("../data/mockData", () => ({
  currentUser: {
    careRecipient: "Jane Doe",
  },
}));

import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("renders the sidebar landmark", () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/primary navigation/i)).toBeInTheDocument();
  });

  it("applies the open class and shows overlay when isOpen is true", () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    const aside = container.querySelector("aside");
    const overlay = container.querySelector("div.overlay");

    expect(aside).toHaveClass("sidebar");
    expect(aside).toHaveClass("open");
    expect(overlay).toBeInTheDocument();
  });

  it("does not render overlay when isOpen is false", () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    const aside = container.querySelector("aside");
    const overlay = container.querySelector("div.overlay");

    expect(aside).toHaveClass("sidebar");
    expect(aside).not.toHaveClass("open");
    expect(overlay).not.toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Health Logs" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Messages" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Calendar" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tasks" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
  });

  it("renders links with the correct destinations", () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: "Health Logs" })).toHaveAttribute(
      "href",
      "/health-logs",
    );
    expect(screen.getByRole("link", { name: "Messages" })).toHaveAttribute(
      "href",
      "/messages",
    );
    expect(screen.getByRole("link", { name: "Calendar" })).toHaveAttribute(
      "href",
      "/calendar",
    );
    expect(screen.getByRole("link", { name: "Tasks" })).toHaveAttribute(
      "href",
      "/tasks",
    );
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/profile",
    );
  });

  it("renders icons for navigation items", () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("icon-home")).toBeInTheDocument();
    expect(screen.getByTestId("icon-heart")).toBeInTheDocument();
    expect(screen.getByTestId("icon-messages")).toBeInTheDocument();
    expect(screen.getByTestId("icon-calendar")).toBeInTheDocument();
    expect(screen.getByTestId("icon-tasks")).toBeInTheDocument();
    expect(screen.getByTestId("icon-profile")).toBeInTheDocument();
  });

  it("calls onClose when the overlay is clicked", () => {
    const handleClose = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={handleClose} />
      </MemoryRouter>,
    );

    const overlay = container.querySelector("div.overlay");
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when a navigation link is clicked", () => {
    const handleClose = vi.fn();

    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={handleClose} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Calendar" }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("applies the active class to the current route", () => {
    render(
      <MemoryRouter initialEntries={["/calendar"]}>
        <Sidebar isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    const activeLink = screen.getByRole("link", { name: "Calendar" });
    const inactiveLink = screen.getByRole("link", { name: "Dashboard" });

    expect(activeLink).toHaveClass("navItem");
    expect(activeLink).toHaveClass("active");
    expect(inactiveLink).toHaveClass("navItem");
    expect(inactiveLink).not.toHaveClass("active");
  });

  it("renders current user information in the footer", () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("J")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Patient")).toBeInTheDocument();
  });

  it("renders the CareConnect brand text", () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("CC")).toBeInTheDocument();
    expect(screen.getByText("CareConnect")).toBeInTheDocument();
    expect(screen.getByText("Patient Portal")).toBeInTheDocument();
  });
});
