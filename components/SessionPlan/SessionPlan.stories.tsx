import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SessionPlan, type PlanItem } from "./SessionPlan";

const items: PlanItem[] = [
  { text: "Прочитать спецификацию ролей", status: "done" },
  { text: "Права в API участников: can()", status: "done" },
  { text: "Тесты прав для каждой роли", status: "in_progress" },
  { text: "Проверить typecheck и тесты", status: "pending" },
  { text: "Открыть PR", status: "pending", added: "добавлен агентом" },
];

const meta: Meta<typeof SessionPlan> = {
  title: "Data/SessionPlan",
  component: SessionPlan,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 360, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SessionPlan>;

export const Running: Story = { args: { items, live: true } };
export const Empty: Story = { args: { items: [] } };
