import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AgentStatus, type AgentQueueItem } from "./AgentStatus";

const agent = { role: "PM", runner: "Claude Code", model: "Sonnet 5.5" };
const queue: AgentQueueItem[] = [
  { key: "PIL-15", title: "Роли участников проекта", current: true, priority: "high" },
  { key: "PIL-22", title: "Экспорт отчёта QA в PDF", waited: "2 ч", priority: "urgent" },
];

const meta: Meta<typeof AgentStatus> = {
  title: "Data/AgentStatus",
  component: AgentStatus,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 360, minHeight: 320, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof AgentStatus>;

export const Working: Story = {
  args: { agent, agentHref: "#", queue, state: { kind: "working", task: { key: "PIL-15", title: "Роли участников проекта", href: "#", phase: "Code", plan: { done: 3, total: 7 } } } },
};
export const Free: Story = { args: { agent, agentHref: "#", state: { kind: "free" } } };
export const Failed: Story = {
  args: { agent, agentHref: "#", queue, state: { kind: "error", title: "Лимит Claude Code исчерпан", until: "18:00", fix: { text: "Или переключите модель:", cmd: "hm agent model PM opus" } } },
};
export const Paused: Story = { args: { agent, agentHref: "#", state: { kind: "paused", since: "14:20", by: "Антон Саботович" } } };
export const Off: Story = { args: { agent, agentHref: "#", state: { kind: "off", fix: { text: "Подключите раннер:", cmd: "hm runner connect PM" } } } };
export const QueueOpen: Story = { args: { ...Working.args, queueOpen: true } };
