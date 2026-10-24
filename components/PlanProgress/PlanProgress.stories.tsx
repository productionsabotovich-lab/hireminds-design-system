import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlanProgress } from "./PlanProgress";

const meta: Meta<typeof PlanProgress> = {
  title: "Feedback/PlanProgress",
  component: PlanProgress,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 360, background: "var(--surface)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PlanProgress>;

export const Live: Story = { args: { done: 3, total: 6, live: true } };
export const Static: Story = { args: { done: 3, total: 6 } };
export const Done: Story = { args: { done: 6, total: 6 } };
export const NoPlan: Story = { args: { done: null } };
