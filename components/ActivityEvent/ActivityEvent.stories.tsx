import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActivityEvent } from "./ActivityEvent";
import { CodeChip } from "../CodeChip";
import { Pill } from "../Pill";

const meta: Meta<typeof ActivityEvent> = {
  title: "Data/ActivityEvent",
  component: ActivityEvent,
  tags: ["autodocs"],
  argTypes: {
    kind: { control: "select", options: ["phase", "session", "message", "pr", "decision", "return", "note", "error", "reminder", "files", "check", "push", "ask"] },
    tone: { control: "select", options: [undefined, "ink", "accent", "warn", "danger", "dim"] },
  },
  decorators: [(Story) => <ol style={{ listStyle: "none", margin: 0, padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></ol>],
};

export default meta;
type Story = StoryObj<typeof ActivityEvent>;

export const Phase: Story = { args: { kind: "phase", time: "2026-10-23T09:14:00+03:00", children: "QA → Code", detail: "Возврат 2 из 2" } };
export const DecisionApproved: Story = {
  args: {
    kind: "decision", tone: "accent", time: "2026-10-22T12:05:00+03:00", actor: "Антон Саботович",
    children: <>утвердил <CodeChip href="#">D-34</CodeChip> «Объём согласован»</>,
    pill: <Pill tone="accent">Утверждено</Pill>, detail: "Кнопка в треде Linear · редакция 1 · ждало 45 мин",
  },
};
export const Message: Story = {
  args: {
    kind: "message", time: "2026-10-23T08:40:00+03:00", actor: "QA",
    quote: "Проверил 9 сценариев из спецификации, 8 прошли. У viewer в меню участника осталась кнопка «Удалить участника».",
    files: ["docs/qa/PIL-15-report.md"],
  },
};
export const CheckFailed: Story = {
  args: { kind: "check", time: "2026-10-24T09:28:00+03:00", actor: "Developer", children: "запустил typecheck", pill: <Pill tone="danger">3 ошибки</Pill>, detail: "MemberMenu.tsx: свойство canRemove не существует в типе Member" },
};
