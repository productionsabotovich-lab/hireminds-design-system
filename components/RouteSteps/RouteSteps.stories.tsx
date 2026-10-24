import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RouteSteps } from "./RouteSteps";

const steps = ["Объём", "Code", "CI", "Ревью", "QA", "Приёмка"];

const meta: Meta<typeof RouteSteps> = {
  title: "Navigation/RouteSteps",
  component: RouteSteps,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 560, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof RouteSteps>;

export const InWork: Story = { args: { steps, current: 1 } };
export const AwaitingDecision: Story = { args: { steps, current: 4, live: false } };
export const Created: Story = { args: { steps, current: 0 } };
export const Accepted: Story = { args: { steps, done: true } };
export const LongLabels: Story = {
  args: { steps: ["Сбор требований", "Архитектурное ревью", "Реализация", "Проверка безопасности", "Приёмка владельцем"], current: 1 },
};
export const ManyStepsNarrow: Story = {
  args: { steps: ["Идея", "Анализ", "Дизайн", "Спека", "Код", "CI", "Ревью", "Безопасность", "Стейджинг", "Приёмка"], current: 7 },
  decorators: [(Story) => <div style={{ maxWidth: 343 }}><Story /></div>],
};
