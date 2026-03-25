import { describe, it, expect, vi, beforeEach } from "vitest";
import { StrictMode } from "react";

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({
  render: renderMock,
}));

const BrowserRouterMock = vi.fn(({ children }) => children);
const AppMock = vi.fn(() => null);

vi.mock("react-dom/client", () => ({
  createRoot: createRootMock,
}));

vi.mock("react-router-dom", () => ({
  BrowserRouter: BrowserRouterMock,
}));

vi.mock("./App", () => ({
  default: AppMock,
}));

describe("main.jsx", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    renderMock.mockClear();
    createRootMock.mockClear();
    BrowserRouterMock.mockClear();
    AppMock.mockClear();
    vi.resetModules();
  });

  it("creates a React root using the #root element and renders the app", async () => {
    await import("./main.jsx");

    const rootElement = document.getElementById("root");

    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(rootElement);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });

  it("renders App inside BrowserRouter and StrictMode", async () => {
    await import("./main.jsx");

    const renderedTree = renderMock.mock.calls[0][0];

    expect(renderedTree.type).toBe(StrictMode);
    expect(renderedTree.props.children.type).toBe(BrowserRouterMock);
    expect(renderedTree.props.children.props.children.type).toBe(AppMock);
  });
});
