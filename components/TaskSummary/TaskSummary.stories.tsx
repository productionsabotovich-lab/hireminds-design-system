import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskSummary, type TaskSummaryTask } from "./TaskSummary";
import { List } from "../List";

const task: TaskSummaryTask = {
  key: "PIL-15",
  title: "Роли участников проекта: owner, admin и viewer",
  href: "#",
  tracker: "Linear",
  state: { label: "В работе", tone: "accent", pulse: true },
  status: "In Progress",
  priority: "high",
  epic: { name: "Доступ и роли", href: "#" },
  assignee: { name: "Developer" },
  phase: "Code",
  labels: ["backend", "web"],
  updated: "12 мин назад",
  description: "Нужны три роли участника проекта: owner, admin и viewer. Права проверяются на сервере, меню участника показывает только доступные действия.",
};

const meta: Meta<typeof TaskSummary> = {
  title: "Data/TaskSummary",
  component: TaskSummary,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 420, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TaskSummary>;

export const Side: Story = { args: { task, preset: "side", reason: "Продолжена после возврата из QA", cardHref: "#" } };
export const Decision: Story = { args: { task, preset: "decision", cardHref: "#" } };
export const Full: Story = { args: { task, preset: "full", reason: "Продолжена после возврата из QA" } };
export const Popover: Story = { args: { task, preset: "popover" } };
export const Description: Story = { args: { task, preset: "description" } };
export const Row: Story = {
  args: { task, preset: "row" },
  decorators: [(Story) => <List title="Задачи"><Story /></List>],
};
