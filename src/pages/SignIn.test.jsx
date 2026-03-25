import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("./SignIn.module.css", () => ({
  default: {
    page: "page",
    brandPanel: "brandPanel",
    brandTop: "brandTop",
    brandLogo: "brandLogo",
    logoIcon: "logoIcon",
    brandName: "brandName",
    brandSub: "brandSub",
    brandTitle: "brandTitle",
    brandDesc: "brandDesc",
    features: "features",
    featureItem: "featureItem",
    supportInfo: "supportInfo",
    supportTitle: "supportTitle",
    container: "container",
    skipNav: "skipNav",
    title: "title",
    subtitle: "subtitle",
    form: "form",
    field: "field",
    label: "label",
    inputWrap: "inputWrap",
    inputIcon: "inputIcon",
    input: "input",
    hint: "hint",
    labelRow: "labelRow",
    forgotLink: "forgotLink",
    togglePassword: "togglePassword",
    rememberLabel: "rememberLabel",
    checkbox: "checkbox",
    dividerRow: "dividerRow",
    altText: "altText",
  },
}));

vi.mock("../components/Button", () => ({
  default: ({ children, variant, fullWidth, size, type = "button" }) => (
    <button
      type={type}
      data-variant={variant}
      data-fullwidth={String(!!fullWidth)}
      data-size={size}
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

import SignIn from "./SignIn";

describe("SignIn", () => {
  it("renders the brand panel content", () => {
    render(
      <MemoryRouter>
        <SignIn />
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
  });

  it("renders the security and access feature items", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId("icon-lock").length).toBeGreaterThan(0);
    expect(screen.getByTestId("icon-clock")).toBeInTheDocument();

    expect(screen.getByText("Secure & Private")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your health information is protected with bank-level encryption and HIPAA compliance/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("24/7 Access")).toBeInTheDocument();
    expect(
      screen.getByText(
        /View your health records, upcoming appointments, and messages anytime you need/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders support information", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    expect(screen.getByText("Need help signing in?")).toBeInTheDocument();
    expect(screen.getByText(/Call Support/i)).toBeInTheDocument();
    expect(screen.getByText(/1-800-CARE-HELP/i)).toBeInTheDocument();
    expect(screen.getByText(/Help Center/i)).toBeInTheDocument();
  });

  it("renders the main sign-in heading, subtitle, and keyboard helper text", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Sign in to your account",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Enter your credentials to access your healthcare portal",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Use Tab to navigate, Enter to activate"),
    ).toBeInTheDocument();
  });

  it("renders email and password fields with labels, placeholders, and required attributes", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("placeholder", "your.email@example.com");
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute("autocomplete", "email");

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("placeholder", "Enter your password");
    expect(passwordInput).toBeRequired();
    expect(passwordInput).toHaveAttribute("autocomplete", "current-password");
  });

  it("renders form helper content and forgot password control", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(
        /Use the email address associated with your CareConnect account/i,
      ),
    ).toBeInTheDocument();

    const forgotPasswordLink = screen.getByRole("link", {
      name: "Forgot password?",
    });
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute("href", "#");

    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    expect(showPasswordButton).toBeInTheDocument();

    expect(screen.getByTestId("icon-eye")).toBeInTheDocument();
  });

  it("renders the remember me checkbox", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    const rememberCheckbox = screen.getByRole("checkbox", {
      name: /remember me on this device/i,
    });

    expect(rememberCheckbox).toBeInTheDocument();
    expect(rememberCheckbox).not.toBeChecked();
  });

  it("renders the sign in button inside a dashboard link with correct props", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    const signInButton = screen.getByRole("button", { name: "Sign in" });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("data-variant", "primary");
    expect(signInButton).toHaveAttribute("data-fullwidth", "true");
    expect(signInButton).toHaveAttribute("data-size", "lg");
    expect(signInButton).toHaveAttribute("type", "submit");

    const signInLink = signInButton.closest("a");
    expect(signInLink).toHaveAttribute("href", "/dashboard");
  });

  it("renders the email sign-in link button with the correct icon and props", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    const emailLinkButton = screen.getByRole("button", {
      name: /email me a sign-in link/i,
    });

    expect(emailLinkButton).toBeInTheDocument();
    expect(emailLinkButton).toHaveAttribute("data-variant", "outline");
    expect(emailLinkButton).toHaveAttribute("data-fullwidth", "true");

    expect(screen.getAllByTestId("icon-mail").length).toBeGreaterThan(0);
  });

  it("renders the passkey sign-in button with the correct props", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    const passkeyButton = screen.getByRole("button", {
      name: /sign in with windows hello \/ passkey/i,
    });

    expect(passkeyButton).toBeInTheDocument();
    expect(passkeyButton).toHaveAttribute("data-variant", "secondary");
    expect(passkeyButton).toHaveAttribute("data-fullwidth", "true");
  });

  it("renders the alternative sign-in text", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    expect(screen.getByText("Or use a secure alternative")).toBeInTheDocument();
  });
});
