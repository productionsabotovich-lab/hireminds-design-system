import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PhaseResult } from "./PhaseResult";

const meta: Meta<typeof PhaseResult> = {
  title: "Data/PhaseResult",
  component: PhaseResult,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PhaseResult>;

export const Done: Story = {
  args: {
    phase: "Code",
    role: "Developer",
    session: { id: "S-118", href: "#" },
    at: "сегодня, 14:20",
    report: [{ type: "text", text: "Роли owner, admin и viewer: права проверяются на сервере." }],
    earlier: [{ label: "v1 · вернул QA", report: [{ type: "findings", items: [{ tone: "error", text: "viewer видел «Удалить участника»" }] }] }],
  },
};
export const Running: Story = { args: { phase: "QA", role: "QA", session: { id: "S-121", href: "#" }, status: "running", note: "гоняет e2e участников" } };
export const Waiting: Story = { args: { phase: "Утверждение", role: "Антон Саботович", human: true, status: "waiting" } };
