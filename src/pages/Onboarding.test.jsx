import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("./Onboarding.module.css", () => ({
  default: {
    page: "page",
    welcomePage: "welcomePage",
    standaloneWelcome: "standaloneWelcome",
    brandPanel: "brandPanel",
    brandTop: "brandTop",
    brandLogo: "brandLogo",
    logoIcon: "logoIcon",
    brandName: "brandName",
    brandSub: "brandSub",
    welcomePrompt: "welcomePrompt",
    brandTitle: "brandTitle",
    brandDesc: "brandDesc",
    features: "features",
    featureItem: "featureItem",
    supportInfo: "supportInfo",
    supportTitle: "supportTitle",
    container: "container",
    step: "step",
    title: "title",
    subtitle: "subtitle",
    roleGroup: "roleGroup",
    roleCard: "roleCard",
    selected: "selected",
    roleTitle: "roleTitle",
    roleDesc: "roleDesc",
    roleFeatures: "roleFeatures",
    feature: "feature",
    continueLink: "continueLink",
    signInPrompt: "signInPrompt",
  },
}));

vi.mock("../components/Button", () => ({
  default: ({ children, variant, fullWidth, size, disabled }) => (
    <button
      type="button"
      data-variant={variant}
      data-fullwidth={String(!!fullWidth)}
      data-size={size}
      disabled={disabled}
    >
      {children}
    </button>
  ),
}));

vi.mock("../components/Icon", () => ({
  default: ({ name, size }) => (
    <span data-testid={`icon-${name}`} data-size={size} aria-hidden="true">
      {name}
    </span>
  ),
}));

import Onboarding from "./Onboarding";

describe("Onboarding", () => {
  it("renders the standalone welcome screen first", () => {
    render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    expect(screen.getByText("CC")).toBeInTheDocument();
    expect(screen.getByText("CareConnect")).toBeInTheDocument();
    expect(screen.getByText("Patient Portal")).toBeInTheDocument();
    expect(screen.getByText("Welcome back")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Sign in to access your appointments, medications, test results, and care team messages/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/click anywhere to continue/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 1, name: "Choose Your Role" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Secure & Private")).toBeInTheDocument();
    expect(screen.getByText("24/7 Access")).toBeInTheDocument();
    expect(screen.getByText("Need help signing in?")).toBeInTheDocument();
  });

  it("shows the role-selection step after clicking the welcome screen", () => {
    render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Choose Your Role" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Need help signing in?")).not.toBeInTheDocument();
  });

  it("renders the onboarding step, title, and subtitle", () => {
    render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Choose Your Role" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /This helps us show you the most relevant information and features for your needs/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders both role options and their feature lists", () => {
    render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    expect(screen.getByText("I'm a Caregiver")).toBeInTheDocument();
    expect(
      screen.getByText(
        /You help someone manage their healthcare, appointments, or daily care needs/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Manage appointments and medications for your care recipient/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Communicate with their care team on their behalf/i),
    ).toBeInTheDocument();

    expect(screen.getByText("I'm a Care Recipient")).toBeInTheDocument();
    expect(
      screen.getByText(
        /You're managing your own healthcare and may receive support from caregivers/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /View your appointments, test results, and medications/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Message your care team and manage your health records/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders two radio inputs and no role is selected by default", () => {
    const { container } = render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    const caregiverRadio = container.querySelector('input[value="caregiver"]');
    const recipientRadio = container.querySelector('input[value="recipient"]');

    expect(caregiverRadio).toBeInTheDocument();
    expect(recipientRadio).toBeInTheDocument();
    expect(caregiverRadio).not.toBeChecked();
    expect(recipientRadio).not.toBeChecked();
  });

  it("disables the Continue button before a role is selected", () => {
    render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).toBeDisabled();
    expect(continueButton).toHaveAttribute("data-variant", "primary");
    expect(continueButton).toHaveAttribute("data-size", "lg");
    expect(continueButton).toHaveAttribute("data-fullwidth", "true");
  });

  it("selects the caregiver role and enables the Continue button", () => {
    const { container } = render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    const caregiverRadio = container.querySelector('input[value="caregiver"]');
    const continueButton = screen.getByRole("button", { name: /continue/i });

    fireEvent.click(caregiverRadio);

    expect(caregiverRadio).toBeChecked();
    expect(continueButton).not.toBeDisabled();
  });

  it("selects the recipient role and updates checked state", () => {
    const { container } = render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    const caregiverRadio = container.querySelector('input[value="caregiver"]');
    const recipientRadio = container.querySelector('input[value="recipient"]');

    fireEvent.click(caregiverRadio);
    expect(caregiverRadio).toBeChecked();
    expect(recipientRadio).not.toBeChecked();

    fireEvent.click(recipientRadio);
    expect(recipientRadio).toBeChecked();
    expect(caregiverRadio).not.toBeChecked();
  });

  it("renders links to the sign-in page", () => {
    render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    const signInTextLink = screen.getByRole("link", {
      name: /sign in to your account/i,
    });
    expect(signInTextLink).toHaveAttribute("href", "/signin");

    const continueButton = screen.getByRole("button", { name: /continue/i });
    const continueLink = continueButton.closest("a");
    expect(continueLink).toHaveAttribute("href", "/signin");
  });

  it("renders the sign-in prompt", () => {
    render(
      <MemoryRouter>
        <Onboarding />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /enter sign-in flow/i }));

    expect(screen.getByText(/Have an account\?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /sign in to your account/i }),
    ).toBeInTheDocument();
  });
});
