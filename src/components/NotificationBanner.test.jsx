import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("./NotificationBanner.module.css", () => ({
  default: {
    banner: "banner",
    indicator: "indicator",
    content: "content",
    label: "label",
    meta: "meta",
    viewLink: "viewLink",
  },
}));

vi.mock("./Button", () => ({
  default: ({ children, variant, size }) => (
    <button data-variant={variant} data-size={size}>
      {children}
    </button>
  ),
}));

import NotificationBanner from "./NotificationBanner";

describe("NotificationBanner", () => {
  it("returns null when no appointment is provided", () => {
    const { container } = render(
      <MemoryRouter>
        <NotificationBanner appointment={null} />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders the banner with appointment details when appointment is provided", () => {
    const appointment = {
      isNow: false,
      title: "Doctor Visit",
      time: "2:00 PM",
      location: "Main Clinic",
    };

    render(
      <MemoryRouter>
        <NotificationBanner appointment={appointment} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("complementary", {
        name: /upcoming appointment notification/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Next:")).toBeInTheDocument();
    expect(screen.getByText("Doctor Visit")).toBeInTheDocument();
    expect(screen.getByText("2:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Main Clinic")).toBeInTheDocument();
  });

  it('shows "Now" when appointment.isNow is true', () => {
    const appointment = {
      isNow: true,
      title: "Medication Check",
      time: "10:30 AM",
      location: "Room 12",
    };

    render(
      <MemoryRouter>
        <NotificationBanner appointment={appointment} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Now:")).toBeInTheDocument();
    expect(screen.getByText("Medication Check")).toBeInTheDocument();
  });

  it("renders a link to the calendar page", () => {
    const appointment = {
      isNow: false,
      title: "Therapy Session",
      time: "1:00 PM",
      location: "Wellness Center",
    };

    render(
      <MemoryRouter>
        <NotificationBanner appointment={appointment} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/calendar");
  });

  it("renders the View button with the correct props", () => {
    const appointment = {
      isNow: false,
      title: "Checkup",
      time: "9:00 AM",
      location: "Health Office",
    };

    render(
      <MemoryRouter>
        <NotificationBanner appointment={appointment} />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: /view/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-variant", "primary");
    expect(button).toHaveAttribute("data-size", "sm");
  });
});
