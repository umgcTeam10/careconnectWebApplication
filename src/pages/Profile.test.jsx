import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./Profile.module.css", () => ({
  default: {
    profile: "profile",
    leftColumn: "leftColumn",
    rightColumn: "rightColumn",
    avatarSection: "avatarSection",
    sectionLabel: "sectionLabel",
    avatar: "avatar",
    name: "name",
    role: "role",
    editBtn: "editBtn",
    infoCard: "infoCard",
    cardTitle: "cardTitle",
    contactRow: "contactRow",
    infoList: "infoList",
    infoItem: "infoItem",
    infoLabel: "infoLabel",
    infoValue: "infoValue",
    settingsHeader: "settingsHeader",
    settingsTitle: "settingsTitle",
    settingsSearch: "settingsSearch",
    searchIcon: "searchIcon",
    searchInput: "searchInput",
    cardSubtitle: "cardSubtitle",
    toggleGrid: "toggleGrid",
    toggleItem: "toggleItem",
    toggleLabel: "toggleLabel",
    toggleSwitch: "toggleSwitch",
    slider: "slider",
    toggleDesc: "toggleDesc",
    quietHours: "quietHours",
    prefGrid: "prefGrid",
    prefItem: "prefItem",
    prefLabel: "prefLabel",
    formatToggle: "formatToggle",
    formatBtn: "formatBtn",
    formatActive: "formatActive",
    textSizeRow: "textSizeRow",
    textSizeLabel: "textSizeLabel",
    textSizeSlider: "textSizeSlider",
    textSizeSmall: "textSizeSmall",
    textSizeLarge: "textSizeLarge",
    rangeInput: "rangeInput",
    sizeLabels: "sizeLabels",
    logoutBtn: "logoutBtn",
  },
}));

vi.mock("../components/Card", () => ({
  default: ({ children, className = "" }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("../components/Button", () => ({
  default: ({ children, variant, size, className = "" }) => (
    <button
      type="button"
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {children}
    </button>
  ),
}));

vi.mock("../components/Icon", () => ({
  default: ({ name, size, className = "" }) => (
    <span
      data-testid={`icon-${name}`}
      data-size={size}
      className={className}
      aria-hidden="true"
    >
      {name}
    </span>
  ),
}));

import Profile from "./Profile";

describe("Profile", () => {
  it("renders the user profile card", () => {
    render(<Profile />);

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("Rt")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Sarah Johnson" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Care recipient")).toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: "Edit Profile" });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveAttribute("data-variant", "outline");
    expect(editButton).toHaveAttribute("data-size", "sm");
  });

  it("renders contact information with icons", () => {
    render(<Profile />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Contact Information" }),
    ).toBeInTheDocument();
    expect(screen.getByText("sarah.johnson@email.com")).toBeInTheDocument();
    expect(screen.getByText("(555) 123-4567")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, City, ST")).toBeInTheDocument();

    expect(screen.getByTestId("icon-mail")).toBeInTheDocument();
    expect(screen.getByTestId("icon-phone")).toBeInTheDocument();
    expect(screen.getByTestId("icon-home")).toBeInTheDocument();
  });

  it("renders account statistics", () => {
    render(<Profile />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Account Statistics" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Member since")).toBeInTheDocument();
    expect(screen.getByText("January 2024")).toBeInTheDocument();
    expect(screen.getByText("Active days")).toBeInTheDocument();
    expect(screen.getByText("45 days")).toBeInTheDocument();
    expect(screen.getByText("Tasks completed")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();
  });

  it("renders the settings header and search input", () => {
    render(<Profile />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Settings" }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search settings (Ctrl+I)"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-search")).toBeInTheDocument();
  });

  it("renders notification settings with correct default states", () => {
    render(<Profile />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Notifications" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Manage your notification settings"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: "Push Notifications" }),
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "Email Notifications" }),
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "Task Reminders" }),
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "Quiet Hours" }),
    ).not.toBeChecked();
  });

  it("toggles notification checkboxes when clicked", () => {
    render(<Profile />);

    const pushCheckbox = screen.getByRole("checkbox", {
      name: "Push Notifications",
    });
    const emailCheckbox = screen.getByRole("checkbox", {
      name: "Email Notifications",
    });
    const taskCheckbox = screen.getByRole("checkbox", {
      name: "Task Reminders",
    });

    fireEvent.click(pushCheckbox);
    fireEvent.click(emailCheckbox);
    fireEvent.click(taskCheckbox);

    expect(pushCheckbox).not.toBeChecked();
    expect(emailCheckbox).not.toBeChecked();
    expect(taskCheckbox).not.toBeChecked();
  });

  it("renders preferences section with correct default states", () => {
    render(<Profile />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Preferences" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Customize your CareConnect experience"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: "Dark Mode" }),
    ).not.toBeChecked();
    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Date Format")).toBeInTheDocument();
    expect(screen.getByText("MM/DD/YYYY")).toBeInTheDocument();
  });

  it("toggles dark mode checkbox when clicked", () => {
    render(<Profile />);

    const darkModeCheckbox = screen.getByRole("checkbox", {
      name: "Dark Mode",
    });
    expect(darkModeCheckbox).not.toBeChecked();

    fireEvent.click(darkModeCheckbox);
    expect(darkModeCheckbox).toBeChecked();
  });

  it("switches time format between 12h and 24h", () => {
    render(<Profile />);

    const twelveHourButton = screen.getByRole("button", { name: "12h" });
    const twentyFourHourButton = screen.getByRole("button", { name: "24h" });

    expect(twelveHourButton).toHaveClass("formatBtn");
    expect(twelveHourButton).toHaveClass("formatActive");
    expect(twentyFourHourButton).toHaveClass("formatBtn");
    expect(twentyFourHourButton).not.toHaveClass("formatActive");

    fireEvent.click(twentyFourHourButton);

    expect(twentyFourHourButton).toHaveClass("formatActive");
    expect(twelveHourButton).not.toHaveClass("formatActive");
  });

  it("renders accessibility settings and text size slider", () => {
    render(<Profile />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Accessibility" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Adjust settings for better usability"),
    ).toBeInTheDocument();
    expect(screen.getByText("Text Size")).toBeInTheDocument();
    expect(screen.getByText("A Small")).toBeInTheDocument();
    expect(screen.getByText("A Large")).toBeInTheDocument();
    expect(screen.getByText("Normal")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "1");
    expect(slider).toHaveAttribute("max", "5");
    expect(slider).toHaveValue("3");
  });

  it("renders the logout button with lock icon", () => {
    render(<Profile />);

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByTestId("icon-lock")).toBeInTheDocument();
  });
});
