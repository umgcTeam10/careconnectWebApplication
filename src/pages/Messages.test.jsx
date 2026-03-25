import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./Messages.module.css", () => ({
  default: {
    messages: "messages",
    contactsPanel: "contactsPanel",
    quickContacts: "quickContacts",
    quickContactLabel: "quickContactLabel",
    quickContactAvatars: "quickContactAvatars",
    quickContactBtn: "quickContactBtn",
    quickContactAvatar: "quickContactAvatar",
    quickContactName: "quickContactName",
    quickContactRole: "quickContactRole",
    contactSearch: "contactSearch",
    contactSearchIcon: "contactSearchIcon",
    contactSearchInput: "contactSearchInput",
    contactList: "contactList",
    contactItem: "contactItem",
    contactActive: "contactActive",
    contactAvatar: "contactAvatar",
    contactDetails: "contactDetails",
    contactName: "contactName",
    contactLastMsg: "contactLastMsg",
    contactTime: "contactTime",
    chatContainer: "chatContainer",
    chatHeader: "chatHeader",
    contactInfo: "contactInfo",
    avatar: "avatar",
    chatContactName: "chatContactName",
    onlineStatus: "onlineStatus",
    chatActions: "chatActions",
    messageList: "messageList",
    message: "message",
    sent: "sent",
    received: "received",
    messageText: "messageText",
    typing: "typing",
    quickReplies: "quickReplies",
    quickReply: "quickReply",
    inputBar: "inputBar",
    attachBtn: "attachBtn",
    input: "input",
    detailsPanel: "detailsPanel",
    emergencyBtn: "emergencyBtn",
    detailSection: "detailSection",
    detailMuted: "detailMuted",
    detailTitle: "detailTitle",
    detailBold: "detailBold",
    reminderActions: "reminderActions",
    linkBtn: "linkBtn",
    fileItem: "fileItem",
    fileName: "fileName",
    fileMeta: "fileMeta",
    detailRow: "detailRow",
    linkBtnDanger: "linkBtnDanger",
  },
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

vi.mock("../components/Button", () => ({
  default: ({ children, variant, size, type = "button" }) => (
    <button type={type} data-variant={variant} data-size={size}>
      {children}
    </button>
  ),
}));

vi.mock("../data/mockData", () => ({
  messages: [
    {
      from: "Robert Martinez",
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: "other",
          text: "Good morning! Did you finish your walk?",
        },
        { id: 2, sender: "user", text: "Yes, I just finished it." },
        { id: 3, sender: "other", text: "Great job. Remember to stretch." },
      ],
    },
  ],
  quickReplies: ["On my way", "Thank you", "Will do"],
}));

import Messages from "./Messages";

describe("Messages", () => {
  it("renders the quick contact section and quick contact buttons", () => {
    render(<Messages />);

    expect(screen.getByText("QUICK CONTACT")).toBeInTheDocument();

    expect(screen.getByTitle("Sarah")).toBeInTheDocument();
    expect(screen.getByTitle("Dr. Martinez")).toBeInTheDocument();
    expect(screen.getByTitle("Nurse Chen")).toBeInTheDocument();

    expect(screen.getByText("Sarah")).toBeInTheDocument();
    expect(screen.getByText("Caregiver")).toBeInTheDocument();

    expect(screen.getByText("Dr. Martinez")).toBeInTheDocument();
    expect(screen.getByText("Physician")).toBeInTheDocument();

    expect(screen.getByText("Nurse Chen")).toBeInTheDocument();
    expect(screen.getByText("Nurse")).toBeInTheDocument();
  });

  it("renders the contacts search input and contact list", () => {
    render(<Messages />);

    const contactsSearch = screen.getByPlaceholderText("Search messages...");
    expect(contactsSearch).toBeInTheDocument();

    const contactsPanel = contactsSearch.closest("aside");
    expect(contactsPanel).toBeInTheDocument();

    expect(
      within(contactsPanel).getByText("Robert Martinez"),
    ).toBeInTheDocument();
    expect(
      within(contactsPanel).getByText("Morning walk completed..."),
    ).toBeInTheDocument();
    expect(within(contactsPanel).getByText("Now")).toBeInTheDocument();

    expect(within(contactsPanel).getByText("Dr. Smith")).toBeInTheDocument();
    expect(
      within(contactsPanel).getByText("Appointment reminder..."),
    ).toBeInTheDocument();
    expect(within(contactsPanel).getByText("2024-09-14")).toBeInTheDocument();

    expect(within(contactsPanel).getByText("CareConnect")).toBeInTheDocument();
    expect(
      within(contactsPanel).getByText("Weekly summary..."),
    ).toBeInTheDocument();
    expect(within(contactsPanel).getByText("Nov 04 AM")).toBeInTheDocument();
  });

  it("applies the active contact class to the active contact", () => {
    render(<Messages />);

    const contactsSearch = screen.getByPlaceholderText("Search messages...");
    const contactsPanel = contactsSearch.closest("aside");
    expect(contactsPanel).toBeInTheDocument();

    const activeContactName =
      within(contactsPanel).getByText("Robert Martinez");
    const activeContactItem = activeContactName.closest("li");

    expect(activeContactItem).toHaveClass("contactItem");
    expect(activeContactItem).toHaveClass("contactActive");
  });

  it("renders the chat header with contact name, avatar, and online status", () => {
    render(<Messages />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Robert Martinez" }),
    ).toBeInTheDocument();

    expect(screen.getByText("R")).toBeInTheDocument();
    expect(screen.getByText("Active now")).toBeInTheDocument();
  });

  it("renders chat action buttons", () => {
    render(<Messages />);

    expect(
      screen.getByRole("button", { name: "Voice call" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Video call" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "More options" }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-phone")).toBeInTheDocument();
    expect(screen.getByTestId("icon-video")).toBeInTheDocument();
    expect(screen.getByTestId("icon-moreVertical")).toBeInTheDocument();
  });

  it("renders the message history and typing indicator", () => {
    render(<Messages />);

    expect(
      screen.getByRole("log", { name: "Message history" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Good morning! Did you finish your walk?"),
    ).toBeInTheDocument();

    expect(screen.getByText("Yes, I just finished it.")).toBeInTheDocument();

    expect(
      screen.getByText("Great job. Remember to stretch."),
    ).toBeInTheDocument();

    expect(screen.getByText("Robert is typing...")).toBeInTheDocument();
  });

  it("renders quick reply buttons", () => {
    render(<Messages />);

    expect(
      screen.getByRole("button", { name: "On my way" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Thank you" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Will do" })).toBeInTheDocument();
  });

  it("updates the message input and clears it on submit", () => {
    render(<Messages />);

    const input = screen.getByRole("textbox", { name: "Type your message" });
    const sendButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(input, { target: { value: "Hello there" } });
    expect(input).toHaveValue("Hello there");

    fireEvent.click(sendButton);
    expect(input).toHaveValue("");
  });

  it("renders attachment and emoji buttons", () => {
    render(<Messages />);

    expect(
      screen.getByRole("button", { name: "Attach file" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Emoji" })).toBeInTheDocument();

    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
    expect(screen.getAllByTestId("icon-smile").length).toBeGreaterThan(0);
  });

  it("renders the right details panel content", () => {
    render(<Messages />);

    expect(
      screen.getByRole("button", { name: "EMERGENCY SOS" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Immediately contact emergency services"),
    ).toBeInTheDocument();

    expect(screen.getByText("Upcoming Reminder")).toBeInTheDocument();
    expect(
      screen.getByText("Physical Therapy Starts in 30 minutes"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Reminder: Physical therapy appointment at 2:00 PM"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Acknowledge" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Snooze" })).toBeInTheDocument();
  });

  it("renders shared files and detail action buttons", () => {
    render(<Messages />);

    expect(screen.getByText("Shared Files")).toBeInTheDocument();

    expect(screen.getByText("Lab_Results_Dec.pdf")).toBeInTheDocument();
    expect(screen.getByText("4.2 MB · Yesterday")).toBeInTheDocument();

    expect(screen.getByText("Prescription_Refill.jpg")).toBeInTheDocument();
    expect(screen.getByText("1.8 MB · Dec 10")).toBeInTheDocument();

    expect(screen.getByText("Exercise_Plan.v2.docx")).toBeInTheDocument();
    expect(screen.getByText("512 KB · Nov 28")).toBeInTheDocument();

    expect(screen.getByText("Scheduled Messages")).toBeInTheDocument();
    expect(screen.getByTestId("icon-clock")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Mute Notifications" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Block Contact" }),
    ).toBeInTheDocument();
  });
});
