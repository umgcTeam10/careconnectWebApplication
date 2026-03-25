import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Outlet } from "react-router-dom";

vi.mock("./pages/Dashboard", () => ({
  default: () => <div>Dashboard Page</div>,
}));

vi.mock("./pages/Tasks", () => ({
  default: () => <div>Tasks Page</div>,
}));

vi.mock("./pages/Messages", () => ({
  default: () => <div>Messages Page</div>,
}));

vi.mock("./pages/Calendar", () => ({
  default: () => <div>Calendar Page</div>,
}));

vi.mock("./pages/HealthLogs", () => ({
  default: () => <div>Health Logs Page</div>,
}));

vi.mock("./pages/Profile", () => ({
  default: () => <div>Profile Page</div>,
}));

vi.mock("./pages/SignIn", () => ({
  default: () => <div>Sign In Page</div>,
}));

vi.mock("./pages/Onboarding", () => ({
  default: () => <div>Onboarding Page</div>,
}));

vi.mock("./layouts/AppLayout", () => ({
  default: () => (
    <div data-testid="app-layout">
      <span>App Layout</span>
      <Outlet />
    </div>
  ),
}));

import App from "./App";

function renderAtRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App", () => {
  it("renders the onboarding page at the root route", () => {
    renderAtRoute("/");

    expect(screen.getByText("Onboarding Page")).toBeInTheDocument();
    expect(screen.queryByTestId("app-layout")).not.toBeInTheDocument();
  });

  it("renders the sign in page at /signin", () => {
    renderAtRoute("/signin");

    expect(screen.getByText("Sign In Page")).toBeInTheDocument();
    expect(screen.queryByTestId("app-layout")).not.toBeInTheDocument();
  });

  it.each([
    ["/dashboard", "Dashboard Page"],
    ["/tasks", "Tasks Page"],
    ["/messages", "Messages Page"],
    ["/calendar", "Calendar Page"],
    ["/health-logs", "Health Logs Page"],
    ["/profile", "Profile Page"],
  ])("renders %s inside the shared app layout", (route, pageText) => {
    renderAtRoute(route);

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByText("App Layout")).toBeInTheDocument();
    expect(screen.getByText(pageText)).toBeInTheDocument();
  });

  it("redirects unknown routes to /dashboard", () => {
    renderAtRoute("/unknown-route");

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });
});
